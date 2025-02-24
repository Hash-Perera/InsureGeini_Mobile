//Get the wheather condition
import axios from "axios";
import { OPEN_WHEATHER_API_KEY } from "@/constants/server";

export const getWeather = async (lat: number, lon: number) => {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WHEATHER_API_KEY}`
  );
};
