import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Video,
  Target,
  Newspaper,
  Smartphone,
  TrendingUp,
  PlayCircle,
  ArrowRight,
  Award,
  BookOpen,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Home = () => {
  const { user } = useAuth();
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  const heroSlides = [
    {
      title: 'Aprenda a investir do zero',
      description: 'Comece sua jornada financeira com conteúdo simples e prático',
      icon: BookOpen,
      color: 'from-accent to-accent-light',
    },
    {
      title: 'Conquiste suas metas',
      description: 'Defina objetivos e acompanhe seu progresso financeiro',
      icon: Target,
      color: 'from-primary to-primary-dark',
    },
    {
      title: 'Simule investimentos',
      description: 'Teste estratégias sem riscos e ganhe confiança',
      icon: TrendingUp,
      color: 'from-primary to-accent',
    },
  ];

  const features = [
    {
      title: 'Vídeos Educativos',
      description: 'Conteúdo curto e objetivo sobre finanças pessoais',
      icon: Video,
      link: '/videos',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Metas e Desafios',
      description: 'Estabeleça objetivos e complete desafios financeiros',
      icon: Target,
      link: '/metas',
      color: 'bg-accent/10 text-accent',
    },
    {
      title: 'Notícias',
      description: 'Fique atualizado sobre o mercado financeiro',
      icon: Newspaper,
      link: '/noticias',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Apps Recomendados',
      description: 'Descubra as melhores ferramentas de investimento',
      icon: Smartphone,
      link: '/apps',
      color: 'bg-accent/10 text-accent',
    },
    {
      title: 'Simulador',
      description: 'Pratique investimentos em um ambiente seguro',
      icon: TrendingUp,
      link: '/simulador',
      color: 'bg-primary/10 text-primary',
    },
  ];

  const introVideos = [
    {
      title: 'O que não te contaram sobre Educação Financeira nas escolas!',
      duration: '8:46',
      embedUrl: 'https://www.youtube.com/embed/eCrNY-d0NMI', 
    },
    {
      title: '7 erros que você não deve cometer com seu dinheiro aos 18 anos',
      duration: '15:31',
      embedUrl: 'https://www.youtube.com/embed/FO2giJU9w98',
    },
    {
      title: 'Quanto investir para ganhar R$1.000 de renda passiva todo mês?',
      duration: '19:56',
      embedUrl: 'https://www.youtube.com/embed/ptlZSPNK9t4',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {heroSlides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <CarouselItem key={index} className="flex">
                    <div className="p-1 w-full">
                      <Card className={`h-full border-none shadow-lg bg-gradient-to-br ${slide.color}`}>
                        <CardContent className="h-full flex flex-col items-center justify-center p-12 md:p-16 text-white text-center">
                          <Icon className="h-16 w-16 mb-6" />
                          <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            {slide.title}
                          </h2>
                          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                            {slide.description}
                          </p>
                          {!user && index === 0 && (
                            <Link to="/auth">
                              <Button
                                size="lg"
                                variant="secondary"
                                className="mt-8"
                              >
                                Começar agora
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Welcome Message */}
      {user && (
        <section className="py-8 bg-card border-b">
          <div className="container">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-accent" />
              <div>
                <h2 className="text-2xl font-bold">Olá, {user?.user_metadata?.full_name?.split(' ').slice(0, 2).join(' ')}! 👋</h2>
                <p className="text-muted-foreground">
                  Continue sua jornada de aprendizado financeiro
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para aprender
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossos recursos e comece a transformar sua relação com o dinheiro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="gap-2 group-hover:gap-3 transition-all">
                        Explorar
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Video Carousel Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comece por aqui
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista nossos vídeos de introdução e comece sua jornada.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-2xl mx-auto"
          >
            <CarouselContent>
              {introVideos.map((video, index) => {
                const videoId = video.embedUrl.split('/').pop()?.split('?')[0];
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                
                return (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => setPlayingVideoUrl(video.embedUrl)}
                      >
                        <CardContent className="p-0">
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
                          <div className="p-4">
                            <CardTitle className="text-lg group-hover:text-accent transition-colors">
                              {video.title}
                            </CardTitle>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-primary">
          <div className="container text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Crie sua conta gratuita e tenha acesso a todo o conteúdo educacional
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Criar conta grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      )}

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

export default Home;