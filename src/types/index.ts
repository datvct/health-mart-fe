export interface Category {
    id: string;
    name: string;
    icon?: string;
    slug: string;
    subCategories?: SubCategory[];
  }
  
  export interface SubCategory {
    id: string;
    name: string;
    slug: string;
  }