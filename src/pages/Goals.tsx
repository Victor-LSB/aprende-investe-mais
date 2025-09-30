import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

const Goals = () => {
  const [completedGoals, setCompletedGoals] = useState<number[]>([]);

  const goals = [
    {
      id: 1,
      title: 'Criar um orçamento mensal',
      description: 'Liste todas as suas receitas e despesas',
      category: 'Planejamento',
      difficulty: 'Fácil',
      points: 50,
      progress: 0,
    },
    {
      id: 2,
      title: 'Economizar R$ 100',
      description: 'Guarde seu primeiro valor para começar uma reserva',
      category: 'Poupança',
      difficulty: 'Fácil',
      points: 100,
      progress: 0,
    },
    {
      id: 3,
      title: 'Assistir 5 vídeos sobre investimentos',
      description: 'Aprenda o básico sobre onde investir seu dinheiro',
      category: 'Educação',
      difficulty: 'Fácil',
      points: 75,
      progress: 0,
    },
    {
      id: 4,
      title: 'Fazer sua primeira simulação',
      description: 'Use o simulador para entender o poder dos juros compostos',
      category: 'Prática',
      difficulty: 'Médio',
      points: 150,
      progress: 0,
    },
    {
      id: 5,
      title: 'Criar uma reserva de emergência',
      description: 'Junte o equivalente a 3 meses de despesas',
      category: 'Poupança',
      difficulty: 'Difícil',
      points: 500,
      progress: 0,
    },
  ];

  const challenges = [
    {
      title: 'Desafio 30 dias sem gastos supérfluos',
      description: 'Evite compras desnecessárias por um mês',
      icon: Target,
      reward: '200 pontos',
    },
    {
      title: 'Maratona de aprendizado',
      description: 'Assista todos os vídeos da categoria Fundamentos',
      icon: TrendingUp,
      reward: '150 pontos',
    },
    {
      title: 'Desafio das 52 semanas',
      description: 'Economize R$ 1 na primeira semana, R$ 2 na segunda...',
      icon: Trophy,
      reward: '1000 pontos',
    },
  ];

  const toggleGoalComplete = (goalId: number) => {
    if (completedGoals.includes(goalId)) {
      setCompletedGoals(completedGoals.filter(id => id !== goalId));
    } else {
      setCompletedGoals([...completedGoals, goalId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-accent text-accent-foreground';
      case 'Médio':
        return 'bg-primary text-primary-foreground';
      case 'Difícil':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Metas e Desafios</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Estabeleça objetivos financeiros e complete desafios para acelerar seu aprendizado
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Metas Concluídas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedGoals.length}</div>
              <p className="text-xs text-muted-foreground">de {goals.length} metas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pontos Totais</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedGoals.reduce((sum, id) => {
                  const goal = goals.find(g => g.id === id);
                  return sum + (goal?.points || 0);
                }, 0)}
              </div>
              <p className="text-xs text-muted-foreground">pontos conquistados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((completedGoals.length / goals.length) * 100)}%
              </div>
              <Progress 
                value={(completedGoals.length / goals.length) * 100} 
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Suas Metas</h2>
          <div className="space-y-4">
            {goals.map((goal) => {
              const isCompleted = completedGoals.includes(goal.id);
              return (
                <Card 
                  key={goal.id} 
                  className={`transition-all ${isCompleted ? 'bg-accent/5 border-accent' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                            {goal.title}
                          </CardTitle>
                          {isCompleted && <CheckCircle2 className="h-5 w-5 text-accent" />}
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline">{goal.category}</Badge>
                          <Badge className={getDifficultyColor(goal.difficulty)}>
                            {goal.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="gap-1">
                            <Trophy className="h-3 w-3" />
                            {goal.points} pts
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant={isCompleted ? 'outline' : 'default'}
                        onClick={() => toggleGoalComplete(goal.id)}
                      >
                        {isCompleted ? 'Desmarcar' : 'Concluir'}
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Desafios Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" />
                        Em breve
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">
                        Recompensa: {challenge.reward}
                      </span>
                      <Button variant="outline" size="sm" disabled>
                        Em breve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
