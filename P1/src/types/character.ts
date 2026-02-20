type URLString = string;
type ISODateString = string;

export type CharacterT = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: URLString;
  films: URLString[];
  species: URLString[];
  vehicles: URLString[];
  starships: URLString[];
  created: ISODateString;
  edited: ISODateString;
  url: URLString;
};
