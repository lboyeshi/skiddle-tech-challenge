import useSWR from "swr";
import axios from "axios";

const API_ENDPOINT = "https://www.skiddle.com/api/v1";

const useSkiddleAPI = (path: string | null) => {
  const { data, error } = useSWR(path ? API_ENDPOINT + path : null, retriever);
  return {
    data,
    error: error || (data && data.error),
    isLoading: !error && !data,
  };
};

const retriever = (url: string) => axios.get(url).then((res) => res.data);

export default useSkiddleAPI;
