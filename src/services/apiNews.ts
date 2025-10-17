// src/services/apiNews.ts
import { supabase } from '@/lib/supabase';

export interface Article {
  id?: string;
  title: string;
  description: string;
  source: string;
  url: string;
  image_url: string;
  published_at: string;
}

/**
 * Busca todas as notícias ordenadas pela data de publicação.
 */
export const getNews = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error("Erro ao buscar notícias: ", error);
    throw new Error("Não foi possível carregar as notícias.");
  }

  return data;
};