
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { PlayCircle } from 'lucide-react';

const Demo = () => {
  return (
    <section id="demo" className="container py-12 md:py-24 bg-secondary/20 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Watch AutoThinker in Action</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
          See how easy it is to go from an idea to a live AI agent in minutes.
        </p>
        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Demo Video Coming Soon</p>
                  <p className="text-sm text-muted-foreground">Upload your demo video here</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Demo;
