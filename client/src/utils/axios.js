import axios from "axios";

const instance = axios.create({
  // Щоб не прописувати кожен раз http://localhost:5100/api
  baseURL: "http://localhost:5100/api",
});

instance.interceptors.request.use((conf) => {
  // Записувати токен в хедерси при кожному запиті?? хммм..
  conf.headers.Authorization = window.localStorage.getItem("token");

  return conf;
});

export default instance;
