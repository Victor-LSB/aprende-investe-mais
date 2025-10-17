import { useQuery } from '@tanstack/react-query';
import { getApps, RecommendedApp } from '@/services/apiApps';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, AppWindow } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Apps = () => {
  const { data: apps = [], isLoading, error } = useQuery<RecommendedApp[]>({
    queryKey: ['apps'],
    queryFn: getApps,
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Apps Recomendados</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            As melhores ferramentas para te auxiliar na sua jornada financeira.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </CardContent>
                <CardFooter className="gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
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
              <h3 className="text-xl font-semibold text-destructive">Erro ao carregar aplicativos</h3>
              <p className="text-muted-foreground">
                Não foi possível buscar a lista de apps no momento. Tente novamente mais tarde.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {apps.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <AppWindow className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">Nenhum aplicativo encontrado</h3>
                  <p className="text-muted-foreground">
                    Ainda não há aplicativos recomendados. Volte mais tarde!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <Card key={app.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="flex-row items-center gap-4">
                      <img src={app.logo_url} alt={`${app.name} logo`} className="h-16 w-16 rounded-lg object-contain border" />
                      <div className="flex-1">
                        <CardTitle>{app.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{app.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">
                        {app.description}
                      </p>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                      {app.play_store_url && (
                        <a href={app.play_store_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">Play Store</Button>
                        </a>
                      )}
                      {app.app_store_url && (
                        <a href={app.app_store_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">App Store</Button>
                        </a>
                      )}
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

export default Apps;