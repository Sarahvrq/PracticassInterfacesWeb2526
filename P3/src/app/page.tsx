"use client";

import { useEffect, useState } from "react";
import "./style.css";
import "./page.css";
import { Product } from "@/types/product";
import { ProductCajita } from "@/components/product/productInfo";
import { SectionContainer } from "@/components/SectionContainer/sectionInfo";
import { getAllProducts } from "@/lib/api/product";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const sorted = res.data.products.sort((a: Product, b: Product) =>
          a.title.localeCompare(b.title),
        );
        setProducts(sorted);
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtrados = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mainContainer">
      <h1 className="tituloPrincipal">Catálogo de Productos</h1>
      <h2 className="subtitulo">Practica 3: Sarah Rojas</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <p className="contador">
        Mostrando {filtrados.length} de {products.length} productos
      </p>

        <div className="countriesContainer">
          {filtrados.length > 0
            ? filtrados.map((p) => (
                <ProductCajita key={p.id} producto={p} />
              ))
            : !loading && (
                <p className="noResultados">No se han encontrado productos</p>
              )}
        </div>
    </div>
  );
};

export default Main;