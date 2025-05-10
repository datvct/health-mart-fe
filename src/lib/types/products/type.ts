type Category = {
  category_id: number;
  name: string;
  slug: string;
  image: string | null;
  children?: Category[];
};

export type { Category };
