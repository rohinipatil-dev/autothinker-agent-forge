
import { Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Awards = () => {
  return (
    <section id="award" className="container py-12 md:py-24">
       <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Awards & Recognition</h2>
      </div>
      <div className="flex justify-center">
        <Card className="max-w-sm bg-secondary/50 border-0">
          <CardContent className="p-6 flex items-center gap-6">
            <Award className="h-12 w-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">AI Innovator of the Year</h3>
              <p className="text-muted-foreground">TechCrunch Disrupt 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Awards;
