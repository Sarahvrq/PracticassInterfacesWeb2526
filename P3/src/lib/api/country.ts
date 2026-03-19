import { api } from "./axios";

export const getCountryByName = async (name: string) => {
  const respuesta = await api.get(
    `/name/${name}?fields=name,flag,flags,region,subregion,capital,population,area,languages,currencies`,
  );
  return respuesta;
};

export const getAllCountries = async () => {
  const respuesta = await api.get(
    "/all?fields=name,flag,flags,region,population",
  );
  return respuesta;
};
