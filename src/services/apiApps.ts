import { supabase } from '@/lib/supabase';

export interface RecommendedApp {
  id?: string;
  name: string;
  description: string;
  category: string;
  logo_url: string;
  app_store_url?: string;
  play_store_url?: string;
}

/**
 * Busca todos os apps recomendados, ordenados por nome.
 */
export const getApps = async (): Promise<RecommendedApp[]> => {
  const { data, error } = await supabase
    .from('recommended_apps')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error("Erro ao buscar apps recomendados: ", error);
    throw new Error("Não foi possível carregar os aplicativos.");
  }

  return data;
};