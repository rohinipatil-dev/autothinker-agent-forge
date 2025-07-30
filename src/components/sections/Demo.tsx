
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayCircle, Upload } from 'lucide-react';
import { useState } from 'react';

const Demo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <section id="demo" className="container py-12 md:py-24 bg-secondary/20 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Watch AutoThinker in Action</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
          See how easy it is to go from an idea to a live AI agent in minutes.
        </p>
        <div className="mt-6">
          {videoUrl ? (
            <div className="max-w-4xl mx-auto">
              <video 
                src={videoUrl} 
                controls 
                className="w-full aspect-video rounded-lg shadow-lg"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <Button 
                variant="outline" 
                onClick={() => {
                  setVideoUrl(null);
                  setVideoFile(null);
                }}
                className="mt-4"
              >
                Upload Different Video
              </Button>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center">
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 bg-background/50">
                <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-4">Upload Your Demo Video</p>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">Select a video file from your computer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;
