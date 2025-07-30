
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                {videoUrl ? (
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-full rounded-lg"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-4">Upload Your Demo Video</p>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="max-w-md mx-auto"
                    />
                    <p className="text-sm text-muted-foreground mt-2">Select a video file from your computer</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Demo;
