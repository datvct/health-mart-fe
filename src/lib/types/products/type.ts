type Category = {
  category_id: number;
  name: string;
  slug: string;
  image: string | null;
  children?: Category[];
  parent: {
    category_id: number;
    name: string;
    slug: string;
  };
};

export type { Category };
