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

type Product = {
  product_id: number;
  name: string;
  brand: string;
  specification: string;
  country: string;
  short_description: string;
  manufacturer: string;
  registration_number: string;
  description_html: string;
  slug: string;
  image_url: string;
  discount_percentage: number;
  category: {
    category_id: number;
    name: string;
    slug: string;
    image: string | null;
  };
  variants: [
    {
      unit: string;
      price: number;
    },
  ];
};

export type { Category, Product };
