import { useState, useEffect } from "react";
import "./App.css";

import type { CharacterT } from "./types/character";
import { Loader } from "./components/Loading";
import { CharacterList } from "./components/CharacterList";

const INITIAL_URL = "https://swapi.dev/api/people/";

const App = () => {
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(INITIAL_URL);

  const fetchCharacters = async (url: string) => {
    if (!url || loading) return;

    try {
      setLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("No se pudieron obtener los personajes.");
      }

      const data = await response.json();

      setCharacters((prev) => [...prev, ...data.results]);
      setNextPage(data.next);
    } catch (err: any) {
      throw new Error("No se pudieron obtener los personajes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      await fetchCharacters(INITIAL_URL);
    };

    initFetch();
  }, []);

  return (
    <div className="container">
      <h1>Personajes de Star Wars</h1>
      <h4>Practica 1 by Sarah Rojas</h4>

      <CharacterList characters={characters} />

      {loading && <Loader />}

      {nextPage && !loading && (
        <button
          onClick={() => fetchCharacters(nextPage)}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
          }}
        >
          Cargar más
        </button>
      )}
    </div>
  );
};

export default App;
