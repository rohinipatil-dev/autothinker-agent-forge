
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Loader2 } from 'lucide-react';

const Playground = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    setResult('');
    setTimeout(() => {
      setResult('https://your-agent-xyz123.autothinker.dev');
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <section id="playground" className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Playground</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
          Give it a try! Describe an agent and see the magic happen.
        </p>
      </div>
      <Card className="max-w-3xl mx-auto bg-secondary/50 border-0">
        <CardHeader>
          <CardTitle>Create Your AI Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="e.g. 'Create a friendly chatbot that tells jokes about programming...'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] bg-background"
            />
            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Agent
            </Button>
          </form>
          {result && (
            <div className="mt-6 p-4 bg-background rounded-md">
              <h3 className="font-semibold">Your agent is ready!</h3>
              <div className="flex items-center gap-2 mt-2 text-primary">
                <Link className="h-4 w-4" />
                <a href={result} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {result}
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Playground;
