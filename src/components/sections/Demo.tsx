
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const Demo = () => {
  // Replace this URL with your actual video URL or path
  const demoVideoUrl = "/path-to-your-video.mp4"; // Update this with your video

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
              src={demoVideoUrl}
              controls 
              className="w-full aspect-video rounded-lg shadow-lg"
              preload="metadata"
              poster="/path-to-your-video-thumbnail.jpg" // Optional: Add a poster image
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
