import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTechNews = () => {
  return useQuery(["GET_TECH_NEWS"], async () => {
    const { data } = await axios({
      url: "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json",
    });
    return data;
  });
};
