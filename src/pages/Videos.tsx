import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock } from 'lucide-react';

const Videos = () => {
  const videoCategories = [
    {
      title: 'Fundamentos',
      videos: [
        { title: 'O que é educação financeira?', duration: '3:45', thumbnail: 'bg-primary/20' },
        { title: 'Como fazer um orçamento pessoal', duration: '5:20', thumbnail: 'bg-accent/20' },
        { title: 'A importância de poupar', duration: '4:10', thumbnail: 'bg-primary/20' },
      ],
    },
    {
      title: 'Investimentos Básicos',
      videos: [
        { title: 'Introdução aos investimentos', duration: '6:30', thumbnail: 'bg-accent/20' },
        { title: 'Renda fixa vs Renda variável', duration: '5:45', thumbnail: 'bg-primary/20' },
        { title: 'O que é diversificação?', duration: '4:55', thumbnail: 'bg-accent/20' },
      ],
    },
    {
      title: 'Planejamento',
      videos: [
        { title: 'Como definir metas financeiras', duration: '5:15', thumbnail: 'bg-primary/20' },
        { title: 'Criando uma reserva de emergência', duration: '6:00', thumbnail: 'bg-accent/20' },
        { title: 'Planejamento para aposentadoria', duration: '7:20', thumbnail: 'bg-primary/20' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Vídeos Educativos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Aprenda sobre finanças pessoais com nossos vídeos curtos e objetivos
          </p>
        </div>

        {/* Video Categories */}
        <div className="space-y-12">
          {videoCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video, videoIndex) => (
                  <Card key={videoIndex} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className={`aspect-video ${video.thumbnail} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 group-hover:opacity-80 transition-opacity" />
                      <PlayCircle className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {video.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Assistir agora
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="py-8 text-center">
            <CardTitle className="text-2xl mb-2">Mais conteúdo em breve!</CardTitle>
            <CardDescription className="text-base">
              Estamos constantemente adicionando novos vídeos para você
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Videos;
