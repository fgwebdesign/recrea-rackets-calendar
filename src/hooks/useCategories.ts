import { useState, useEffect } from 'react';

interface UseCategories {
  categories: string[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;
  setSelectedCategory: (category: string) => void;
}

export function useCategories(): UseCategories {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const categoryNames = data.map((cat: { name: string }) => cat.name);
        
        setCategories(categoryNames);
        setSelectedCategory(categoryNames[0] || '');
        setError(null);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback a categorías mock en caso de error
        const fallbackCategories = [
          "Categoría Cuarta",
          "Categoría Quinta",
          "Categoría Sexta",
          "Categoría Séptima"
        ];
        setCategories(fallbackCategories);
        setSelectedCategory(fallbackCategories[0]);
        setError('No se pudieron cargar las categorías');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    selectedCategory,
    loading,
    error,
    setSelectedCategory
  };
} 