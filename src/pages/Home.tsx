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
  BookOpen
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

const Home = () => {
  const { user } = useAuth();

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

      {/* Quick Start Video Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">
                Vídeo de introdução
              </CardTitle>
              <CardDescription>
                Conheça o Investe+ em 2 minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Button size="lg" className="gap-2">
                  <PlayCircle className="h-6 w-6" />
                  Assistir vídeo
                </Button>
              </div>
            </CardContent>
          </Card>
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
    </div>
  );
};

export default Home;
