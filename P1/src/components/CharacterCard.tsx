import type { CharacterT } from "../types/character";
import "./style.css";

export const CharacterCard = (params: {
  id?: number;
  character?: CharacterT;
}) => {
  const character = params.character;

  return (
    <>
      {character ? (
        <div className="mainContainer">
          <div className="characterDataContainer">
            <h2>{character?.name}</h2>
            <p>Genero: {character?.gender}</p>
            <p>Año de nacimiento: {character?.birth_year}</p>
            <p>Estatura: {character?.height}cm</p>
            <p>Peso: {character?.mass}kg</p>
            <p>Ojos: {character?.eye_color}</p>
            <p>Genero: {character?.gender}</p>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
