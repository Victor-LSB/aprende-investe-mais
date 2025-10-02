import { supabase } from '@/lib/supabase';

export interface Goal {
    id?: string;
    user_id?: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    points: number;
    is_completed?: boolean;
}

// Busca todas as metas do usuário

export const getGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao buscar metas: ", error);
        throw new Error("Não foi possivel carregar as metas.");
    }

    return data;
}


// cria uma nova meta

export const createGoal = async (newGoal: Goal) => {
    const { data, error } = await supabase
        .from('goals')
        .insert([newGoal])
        .select()
        .single();

    if (error) {
        console.error('Erro ao criar meta:', error);
        throw new Error("Não foi possivel criar a meta.")
    }

    return data
}


// atualiza uma meta que já existe


export const updateGoal = async ({ id, ...updateData}: Partial<Goal> & { id: string }) => {
    const { data, error } = await supabase
        .from("goals")
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Erro ao atualizar a meta:', error);
        throw new Error("Não foi possivel atualizar a meta.");
    }

    return data;
}


// deletar meta


export const deleteGoal = async (id: string) => {
    const { error } = await supabase
    .from("goals")
    .delete()
    .eq('id', id);
    
    if (error) {
        console.error("Erro ao deletar meta:");
        throw new Error("Não foi possível deletar a meta.");
    }
}