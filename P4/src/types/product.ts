export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  brand: string;
  rating: number;
  stock: number;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
};