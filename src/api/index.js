import axios from "axios";
import returnUrl from "@/utils/env";

let _axios = new axios(returnUrl(process.env.REACT_APP_ENV).ruby_axiosUrl);

const ajax1 = (data, callback) => {
  _axios.post("/qamessage/postqa", data, callback);
};

export { ajax1 };
