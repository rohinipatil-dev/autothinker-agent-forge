import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCollections } from "@/context/CollectionsContext";

const Playground = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const { addItem } = useCollections();

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

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "https://autothinker-backend.onrender.com/build-agent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { url?: string } = await response.json();
      const url = data.url || "";

      setResult(url);

      if (url) {
        // Save into Collections with the prompt as the name/title
        addItem(prompt.trim(), url);
      }

      toast({
        title: "Success",
        description: "Your AI agent has been generated!",
      });
    } catch (error) {
      console.error("Error generating agent:", error);
      toast({
        title: "Error",
        description: "Failed to generate agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Agent"
                )}
              </Button>
            </form>

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
