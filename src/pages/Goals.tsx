// src/pages/Goals.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGoals, updateGoal, deleteGoal, Goal } from '@/services/apiGoals';
import { useState } from 'react';
import { toast } from 'sonner';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, TrendingUp, CheckCircle2, MoreVertical, Trash2, Edit, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


import { GoalFormDialog } from '@/components/GoalFormDialog';

const Goals = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const { data: goals = [], isLoading, error } = useQuery<Goal[]>({
    queryKey: ['goals'],
    queryFn: getGoals,
  });

  const { mutate: toggleCompleteMutate } = useMutation({
    mutationFn: ({ id, is_completed }: { id: string, is_completed: boolean }) =>
      updateGoal({ id, is_completed: !is_completed }),
    onSuccess: () => {
      toast.success('Meta atualizada!');
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      toast.success('Meta deletada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => toast.error(err.message),
  });
  
  const handleOpenDeleteDialog = (goalId: string) => {
    setSelectedGoal({ id: goalId } as Goal); // Apenas o ID é necessário para deletar
    setIsDeleteDialogOpen(true);
  };
  
  const handleOpenFormDialog = (goal: Goal | null) => {
    setSelectedGoal(goal);
    setIsFormOpen(true);
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-accent/80 text-accent-foreground';
      case 'Médio': return 'bg-primary/80 text-primary-foreground';
      case 'Difícil': return 'bg-destructive/80 text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };
  
  const completedGoals = goals.filter(g => g.is_completed);
  const totalPoints = completedGoals.reduce((sum, goal) => sum + goal.points, 0);

  if (isLoading) return <div className="container py-12 text-center">Carregando metas...</div>;
  if (error) return <div className="container py-12 text-center text-destructive">Erro ao carregar metas.</div>;

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Metas e Desafios</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Crie e acompanhe seus objetivos financeiros.
              </p>
            </div>
            <Button onClick={() => handleOpenFormDialog(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Meta
            </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Metas Concluídas</CardTitle><CheckCircle2 className="h-4 w-4 text-accent" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{completedGoals.length}</div><p className="text-xs text-muted-foreground">de {goals.length} metas</p></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pontos Totais</CardTitle><Trophy className="h-4 w-4 text-primary" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{totalPoints}</div><p className="text-xs text-muted-foreground">pontos conquistados</p></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Progresso Geral</CardTitle><TrendingUp className="h-4 w-4 text-accent" /></CardHeader>
                <CardContent><div className="text-2xl font-bold">{goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%</div><Progress value={goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0} className="mt-2" /></CardContent>
            </Card>
        </div>

        {/* Goals List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Suas Metas</h2>
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id} className={`transition-all ${goal.is_completed ? 'bg-accent/5 border-accent' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <Button
                        variant={goal.is_completed ? 'outline' : 'default'}
                        onClick={() => toggleCompleteMutate({ id: goal.id!, is_completed: !!goal.is_completed })}
                    >
                        {goal.is_completed ? 'Desmarcar' : 'Concluir'}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2"><CardTitle className={goal.is_completed ? 'line-through text-muted-foreground' : ''}>{goal.title}</CardTitle>{goal.is_completed && <CheckCircle2 className="h-5 w-5 text-accent" />}</div>
                      <CardDescription>{goal.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline">{goal.category}</Badge>
                        <Badge className={getDifficultyColor(goal.difficulty)}>{goal.difficulty}</Badge>
                        <Badge variant="secondary" className="gap-1"><Trophy className="h-3 w-3" />{goal.points} pts</Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleOpenFormDialog(goal)}><Edit className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => handleOpenDeleteDialog(goal.id!)}><Trash2 className="mr-2 h-4 w-4" /> Deletar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
              </Card>
            ))}
            {goals.length === 0 && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent>
                        <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold">Nenhuma meta encontrada</h3>
                        <p className="text-muted-foreground mb-4">Que tal criar sua primeira meta para começar?</p>
                        <Button onClick={() => handleOpenFormDialog(null)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Criar minha primeira meta
                        </Button>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>

      <GoalFormDialog 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        goal={selectedGoal}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>Essa ação não pode ser desfeita. A meta será permanentemente deletada.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedGoal?.id && deleteMutate(selectedGoal.id)}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Goals;