export interface CategoryI {
    id: number;
    name: string;
    subcategories?: CategoryI[];
  } 