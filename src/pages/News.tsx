// src/pages/News.tsx (Versão Final)
import { useQuery } from '@tanstack/react-query';
import { getNews, Article } from '@/services/apiNews';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, ExternalLink, Newspaper } from 'lucide-react';

const News = () => {
  const { data: articles = [], isLoading, error } = useQuery<Article[]>({
    queryKey: ['news'],
    queryFn: getNews,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Notícias Financeiras</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Mantenha-se atualizado com as últimas notícias do mercado financeiro.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="text-center py-12 bg-destructive/10 border-destructive">
            <CardContent>
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold text-destructive">Erro ao carregar notícias</h3>
              <p className="text-muted-foreground">
                Não foi possível buscar as notícias no momento. Tente novamente mais tarde.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {articles.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Newspaper className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">Nenhuma notícia encontrada</h3>
                  <p className="text-muted-foreground">
                    Ainda não há notícias cadastradas. Volte mais tarde!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                      <CardDescription className="text-xs pt-2">
                        {article.source} - {formatDate(article.published_at)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="ghost" className="w-full gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Ler artigo completo
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;