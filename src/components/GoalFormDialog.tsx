import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Goal, createGoal, updateGoal } from "@/services/apiGoals";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Description } from "@radix-ui/react-toast";

// Schema de validaç~ao com o Zod


const goalFormSchema = z.object ({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
    description: z.string().optional(),
    category: z.string().min(2, "A categoria é obrigatória."),
    difficulty: z.enum(["Fácil", "Médio", "Difícil"]),
    points: z.coerce.number().min(1, "Os pontos devem ser maiores que zero.")
});

type GoalFormValues = z.infer<typeof goalFormSchema>;

interface GoalFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    goal?: Goal | null; // passamos a meta para editar ou null para criar
}

export const GoalFormDialog = ({ open, onOpenChange, goal }: GoalFormDialogProps) => {
    const queryClient = useQueryClient();
    const isEditMode = !!goal;

    const form = useForm<GoalFormValues>({
        resolver: zodResolver(goalFormSchema),
        defaultValues: {
            title: goal?.title ?? "",
            description: goal?.description ?? "",
            category: goal?.category ?? "",
            difficulty: goal?.difficulty ?? "Fácil",
            points: goal?.points ?? 0,
        },
    });


    // reseta o formulário quando a meta mudar

    React.useEffect(() => {
        form.reset({
          title: goal?.title ?? "",
            description: goal?.description ?? "",
            category: goal?.category ?? "",
            difficulty: goal?.difficulty ?? "Fácil",
            points: goal?.points ?? 0,  
        });
    }, [goal, form]);

    const { mutate: createMutate, isPending: isCreating } = useMutation ({
        mutationFn: createGoal,
        onSuccess: () => {
            toast.success("Meta criada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ['goals'] });
            onOpenChange(false);
        },
        onError: (err) => toast.error(err.message),
    });
    
    const { mutate: updateMutate, isPending: isUpdating } = useMutation({
        mutationFn: updateGoal,
        onSuccess: () => {
            toast.success("Meta atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            onOpenChange(false);
        },
        onError: (err) => toast.error(err.message),
    });

    const isLoading = isCreating || isUpdating;
    
    const onSubmit = (values: GoalFormValues) => {
        if (isEditMode && goal) {
            updateMutate({ id: goal.id, ...values });
        } else {
            createMutate(values as Goal);
        }
    };

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Meta" : "Criar Nova Meta"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Altere as informações da sua meta." : "Preencha os detalhes da sua nova meta."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Economizar para uma viagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ex: Guardar R$ 200 todo mês" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Poupança" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificuldade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Fácil">Fácil</SelectItem>
                        <SelectItem value="Médio">Médio</SelectItem>
                        <SelectItem value="Difícil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pontos</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar Meta'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    );
};