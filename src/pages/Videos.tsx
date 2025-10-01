import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Videos = () => {
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  const videoCategories = [
    {
      title: 'Fundamentos',
      videos: [
        { 
          title: 'O que é educação financeira?', 
          duration: '9:13', 
          embedUrl: 'https://www.youtube.com/embed/CB5zuxQl5ro'
        },
        { 
          title: 'Como fazer um orçamento pessoal', 
          duration: '17:13', 
          embedUrl: 'https://www.youtube.com/embed/in0XbfQEm2A'
        },
        { 
          title: 'Como funciona a economia em menos de 15 minutos', 
          duration: '14:38', 
          embedUrl: 'https://www.youtube.com/embed/EA2aFfOXPA8'
        },
      ],
    },
    {
      title: 'Investimentos Básicos',
      videos: [
        { 
          title: 'Tudo o que você precisa saber antes de começar a investir', 
          duration: '8:09', 
          embedUrl: 'https://www.youtube.com/embed/NMTmXh4855c'
        },
        { 
          title: 'Renda fixa vs Renda variável', 
          duration: '8:24', 
          embedUrl: 'https://www.youtube.com/embed/oP7DWMLupAE'
        },
        { 
          title: 'O que é diversificação?', 
          duration: '22:54', 
          embedUrl: 'https://www.youtube.com/embed/7dHq7H_O9rM'
        },
      ],
    },
    {
      title: 'Planejamento',
      videos: [
        { 
          title: 'Como definir metas financeiras', 
          duration: '13:30', 
          embedUrl: 'https://www.youtube.com/embed/M6uDIuFUqXc'
        },
        { 
          title: 'Criando uma reserva de emergência', 
          duration: '14:23', 
          embedUrl: 'https://www.youtube.com/embed/HTfQxGnp8zs'
        },
        { 
          title: 'Planejamento para aposentadoria', 
          duration: '13:30', 
          embedUrl: 'https://www.youtube.com/embed/Ga65c85x8UI'
        },
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
                {category.videos.map((video, videoIndex) => {
                  const videoId = video.embedUrl.split('/').pop()?.split('?')[0];
                  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                  return (
                    <Card 
                      key={videoIndex} 
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                      onClick={() => setPlayingVideoUrl(video.embedUrl)}
                    >
                      <div className="aspect-video flex items-center justify-center relative overflow-hidden bg-slate-200">
                        <img 
                          src={thumbnailUrl} 
                          alt={video.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <PlayCircle className="h-16 w-16 text-white absolute z-10 group-hover:scale-110 transition-transform" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-accent transition-colors">
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
                  );
                })}
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

      {/* --- MODAL DO VÍDEO --- */}
      <Dialog open={!!playingVideoUrl} onOpenChange={(isOpen) => !isOpen && setPlayingVideoUrl(null)}>
        <DialogContent className="max-w-3xl p-0 border-0 bg-transparent">
          <div className="aspect-video">
            {playingVideoUrl && (
              <iframe
                className="w-full h-full rounded-lg"
                src={`${playingVideoUrl}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;