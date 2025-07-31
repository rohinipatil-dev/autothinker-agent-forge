
import { Button } from '@/components/ui/button';
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
          <div className="max-w-4xl mx-auto">
            <video 
              src="/AutoThinker_AI_Playground_Demo.mp4"
              className="w-full aspect-video rounded-lg shadow-lg"
              controls
              preload="metadata"
              onError={(e) => {
                console.error('Video loading error:', e);
                console.error('Video src:', e.currentTarget.src);
              }}
              onLoadStart={() => console.log('Video load started')}
              onCanPlay={() => console.log('Video can play')}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
