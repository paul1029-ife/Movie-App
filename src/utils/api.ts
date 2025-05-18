import axios from "axios";
import { Movie } from "../types/movie";
import API_KEY from "../assets/API_KEY";

export const fetchMovie = async (title: string): Promise<Movie> => {
  const response = await axios.get<Movie>(
    `https://www.omdbapi.com/?apikey=${
      API_KEY as string
    }&t=${encodeURIComponent(title)}`
  );

  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }

  return response.data;
};
