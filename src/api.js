import axios from "axios";

const api = axios.create({
  baseURL:
    "https://railway.app/project/5365015c-d103-4bcd-ab15-5cc59cc49abd/service/eeaf78bd-1e93-442a-b97c-292b29f393dc0",
  withCredentials: true,
});

export default api;
