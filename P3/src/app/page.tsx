"use client";

import { useEffect, useState } from "react";
import "./style.css";
import "./page.css";
import { Country } from "@/types";
import { CountryCajita } from "@/components/country/countryInfo";
import { getAllCountries } from "@/lib/api/country";

const Main = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllCountries()
      .then((res) => {
        const sorted = res.data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common),
        );
        setCountries(sorted);
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtrados = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mainContainer">
      <h1 className="tituloPrincipal">Explorador de Paises</h1>
      <h2 className="subtitulo">Practica 2: Sarah Rojas</h2>

      <input
        type="text"
        placeholder="Buscar país..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <div className="countriesContainer">
        {filtrados.length > 0
          ? filtrados.map((c) => <CountryCajita key={c.name.common} pais={c} />)
          : !loading && (
              <p className="noResultados">No se han encontrado paises</p>
            )}
      </div>
    </div>
  );
};

export default Main;
