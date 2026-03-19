"use client";

import { Country } from "@/types";
import "./countryInfo.css";
import { useRouter } from "next/navigation";

export const CountryCajita = ({ pais }: { pais: Country }) => {
  const router = useRouter();

  return (
    <div className={"card"}>
      <img
        src={pais.flags?.svg || pais.flags?.png}
        alt={`Bandera de ${pais.name.common}`}
        className={"flag"}
      />
      <h2 className={"name"}>{pais.name.common}</h2>
      <p className={"region"}>{pais.region}</p>
      <button
        className={"button"}
        onClick={() =>
          router.push(`/country/${encodeURIComponent(pais.name.common)}`)
        }
      >
        Ver país
      </button>
    </div>
  );
};
