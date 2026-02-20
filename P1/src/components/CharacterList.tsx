import type { CharacterT } from "../types/character";
import { CharacterCard } from "./CharacterCard";
import "./style.css";

export const CharacterList = (params: { characters: CharacterT[] }) => {
  const list = params.characters;

  return (
    <>
      {list && list.length > 0 ? (
        <div className="lista">
          {list.map((character, e) => (
            <CharacterCard key={e} id={e} character={character} />
          ))}
        </div>
      ) : (
        <h2>No hay personajes disponibles</h2>
      )}
    </>
  );
};
