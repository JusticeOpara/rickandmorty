interface ICharacterAPIResponse {
  info: IPaginationInfo;
  results: ICharacter[];
}

interface IPaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ICharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: ICharacterLocation;
  location: ICharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ICharacterLocation {
  name: string;
  url: string;
}

//Episodes
interface IEpisodeAPIResponse {
  info: IPaginationInfo;
  results: IEpisode[];
}

interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface ILocationAPIResponse {
  info: IPaginationInfo;
  results: ILocation[];
}
interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
type SearchParams = Record<string, string | string[] | undefined>;

interface APIError {
  status: number;
  data?: { error: string };
}

export type {
  ICharacterAPIResponse,
  IPaginationInfo,
  ICharacter,
  ICharacterLocation,
  IEpisodeAPIResponse,
SearchParams,
  ILocation,
  ILocationAPIResponse,
  IEpisode,APIError
};
