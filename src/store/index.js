import basicStore from "./basic";
import routesStore from "./route";
import userStore from "./user";
import settings from "./setting";

// 注入store
const store = new basicStore();
const store1 = new routesStore();
const user = new userStore();
const setting = new settings();

export default {
  store,
  store1,
  user,
  setting,
};
