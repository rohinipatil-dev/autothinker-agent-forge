import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { useCollections } from "@/context/CollectionsContext";
import { formatMMSS, useLongTaskProgress } from "@/hooks/useLongTaskProgress";

/** Spawn falling petals near a container (purely visual) */
function burstPetals(container: HTMLElement) {
  const count = 10;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = "50%";
    p.style.top = "0%";
    p.style.setProperty("--dx", `${(Math.random() * 120 - 60).toFixed(0)}px`);
    p.style.setProperty("--rot", `${(Math.random() * 220 - 110).toFixed(0)}deg`);
    p.style.color = Math.random() > 0.5 ? "rgba(236,72,153,0.9)" : "rgba(99,102,241,0.95)";
    p.style.transform = "translate(-50%, -10px)";
    container.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

const Playground = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const { addItem } = useCollections();

  // 6-minute animated timeline
  const {
    start,
    finish,
    cancel,
    reset,
    isRunning,
    progress,
    remainingMs,
    state,
  } = useLongTaskProgress(6 * 60 * 1000);

  // AbortController for real request cancellation
  const controllerRef = useRef<AbortController | null>(null);
  const btnWrapRef = useRef<HTMLDivElement | null>(null);

  // Optional: toast when we hit the full 6 minutes
  useEffect(() => {
    if (state === "timeout") {
      toast({
        title: "Still working…",
        description: "This is taking longer than usual. Please keep the tab open.",
      });
    }
  }, [state]);

  // Cleanup: abort any in-flight request on unmount
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an agent.",
        variant: "destructive",
      });
      return;
    }

    // Start animations
    reset();
    start();
    setIsLoading(true);
    setResult("");
    if (btnWrapRef.current) burstPetals(btnWrapRef.current);

    // Create fresh AbortController for this request
    controllerRef.current?.abort(); // cancel any previous request
    controllerRef.current = new AbortController();

    try {
      const response = await fetch(
        "https://autothinker-backend.onrender.com/build-agent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt.trim() }),
          signal: controllerRef.current.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { url?: string } = await response.json();
      const url = typeof data.url === "string" ? data.url.trim() : "";

      setResult(url);

      if (url) {
        addItem(prompt.trim(), url);
        toast({
          title: "Success",
          description: "Your AI agent has been generated!",
        });
        // celebratory petals on success
        if (btnWrapRef.current) burstPetals(btnWrapRef.current);
      } else {
        toast({
          title: "Error",
          description: "The service did not return a URL.",
          variant: "destructive",
        });
      }

      // Stop animation on success
      finish();
    } catch (error: any) {
      if (error?.name === "AbortError") {
        toast({
          title: "Canceled",
          description: "Agent generation was canceled.",
        });
      } else {
        console.error("Error generating agent:", error);
        toast({
          title: "Service unavailable",
          description:
            "Failed to generate agent (e.g., 502 Bad Gateway). Please try again later.",
          variant: "destructive",
        });
      }
      cancel();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    controllerRef.current?.abort();
    cancel();
    setIsLoading(false);
  };

  // Check if we're currently generating
  const isGenerating = isRunning || isLoading;

  return (
    <section id="playground" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-3">Playground</h2>
        <p className="text-center text-muted-foreground mb-10">
          Give it a try! Describe an agent and see the magic happen.
        </p>

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>Create Your AI Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., create a chatbot to tell jokes about programming"
                className="min-h-[120px] bg-background"
              />

              {/* Show Generate button only when NOT generating */}
              {!isGenerating && (
                <div
                  ref={btnWrapRef}
                  className="flower-bloom"
                >
                  <Button type="submit" className="w-full relative">
                    Generate Agent
                  </Button>
                </div>
              )}
            </form>

            {/* Show progress UI only when generating */}
            {isGenerating && (
              <div className="mt-4">
                {/* Status message */}
                <div className="text-center mb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Generating <span className="dotting" />
                  </span>
                </div>

                {/* Flowery patterned progress bar */}
                <div className="h-2 w-full bg-muted progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${Math.max(5, progress)}%` }}
                  >
                    <div className="progress-bloom"></div>
                    <div className="progress-flowers"></div>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="floral-line">Still blooming</span>
                  <span className="floral-line">ETA ~ {formatMMSS(remainingMs)}</span>
                </div>

                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-xs px-4 py-2 rounded border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-6 rounded-lg border bg-muted/40 p-4">
                <p className="font-medium mb-2">Your agent is ready!</p>
                <a
                  href={result}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline break-all"
                >
                  <LinkIcon className="h-4 w-4" />
                  {result}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Playground;

