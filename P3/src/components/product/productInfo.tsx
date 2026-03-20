"use client";

import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import "./productInfo.css";

type Params = {
  producto: Product;
}

export const ProductCajita = ({ producto }: Params) => {
  const router = useRouter();

  return (
    <div className="card">
      <img
        src={producto.thumbnail}
        alt={`Imagen de ${producto.title}`}
        className="thumbnail"
      />
      <span className="badge">{producto.category}</span>
      <h2 className="name">{producto.title}</h2>
      <p className="price">{producto.price.toFixed(2)}€</p>
      <button
        className="button"
        onClick={() => router.push(`/product/${producto.id}`)}
      >
        Ver detalles
      </button>
    </div>
  );
};