"use client";
import { useParams, useRouter } from "next/navigation";
import { Country } from "@/types";
import { useState, useEffect } from "react";
import "./page.css";
import { getCountryByName } from "@/lib/api/country";

const UnPais = () => {
  const router = useRouter();
  const { name } = useParams();
  const [pais, setPais] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [miError, setError] = useState("");

  useEffect(() => {
    const nombreBuscado = decodeURIComponent(String(name));
    getCountryByName(nombreBuscado)
      .then((res) => {
        const data: Country[] = res.data;
        setPais(data[0]);
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const idiomas = pais?.languages ? Object.values(pais.languages) : [];
  const monedas = pais?.currencies
    ? Object.values(pais.currencies).map((c) => c.name)
    : [];

  return (
    <div className="containerDetalle">
      {loading && <h1>Loading...</h1>}
      {miError && <h2>{miError}</h2>}

      {pais && (
        <>
          <h1>{pais.name.common}</h1>
          <img
            src={pais.flags?.svg || pais.flags?.png}
            alt={`Bandera de ${pais.name.common}`}
          />
          <div className="infoCard">
            <p>Nombre oficial: {pais.name.official}</p>
            <p>Capital: {pais.capital?.join(", ") ?? "-"}</p>
            <p>Region: {pais.region}</p>
            <p>Subregion: {pais.subregion ?? "-"}</p>
            <p>Poblacion: {pais.population.toLocaleString("es-ES")} hab.</p>
            <p>
              Superficie:{" "}
              {pais.area ? pais.area.toLocaleString("es-ES") + " km2" : "-"}
            </p>
            {monedas.length > 0 && <p>Moneda: {monedas.join(", ")}</p>}
            {idiomas.length > 0 && <p>Idiomas: {idiomas.join(", ")}</p>}
          </div>
        </>
      )}

      <button className="botonVolver" onClick={() => router.push("/")}>
        Volver
      </button>
    </div>
  );
};

export default UnPais;
