export type Product = {
    _id: string;
    userId: string; 
    productName: string;
    description: string;
    price: number;
    category: string; 
    categoryName?: string;
    status: boolean;
    categoryWiseStatus: boolean;
    soldOut: boolean;
    images: string[];
    featured: boolean;
    reportsOnProduct: {
      reason?: string;
      reportedBy?: string;
    }[];
    views?: number;
    inputFields: Record<string, string>; 
    checkBoxes: Record<string, string[]>; 
    radioButtons: Record<string, string>; 
  };