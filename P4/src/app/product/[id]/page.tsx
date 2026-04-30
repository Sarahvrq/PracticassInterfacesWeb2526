"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getProductById } from "@/lib/api/product";
import "./page.css";

const UnProducto = () => {
  const router = useRouter();
  const { id } = useParams();

  const [producto, setProducto] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [miError, setError] = useState("");

  useEffect(() => {
    getProductById(String(id))
      .then((res) => {
        setProducto(res.data);
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (miError) return <h2>{miError}</h2>;
  if (!producto) return null;

  return (
    <div className="detalleContainer">

      <button onClick={() => router.back()} className="botonVolver">
        ← Volver al catálogo
      </button>

      <h1 className="detalleTitle">{producto.title}</h1>
      <p className="detalleMarca">{producto.brand} · {producto.category}</p>

      <div className="galeria">
        {producto.images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="galeriaImg"
          />
        ))}
      </div>

      <p className="detalleDesc">{producto.description}</p>

      <div className="infoBloque">
        <span className="detallePrecio">{producto.price.toFixed(2)}€</span>
        <span className={producto.stock < 10 ? "stockBajo" : "stockOk"}>
          {producto.stock < 10
            ? `⚠ Solo quedan ${producto.stock} unidades`
            : `✓ En stock (${producto.stock} unidades)`}
        </span>
      </div>

      <p className="detalleRating">
        Valoración: {"⭐".repeat(Math.round(producto.rating))} ({producto.rating}/5)
      </p>

      <p className="detalleDims">
        Peso: {producto.weight}kg · Dimensiones: {producto.dimensions.width} ×{" "}
        {producto.dimensions.height} × {producto.dimensions.depth}
      </p>

    </div>
  );
};

export default UnProducto;