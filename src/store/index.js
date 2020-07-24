import basicStore from './basic';
import routesStore from "./route";
import userStore from "./user";

//注入store
const store = new basicStore();
const store1 = new routesStore();
const user = new userStore();

export default {
  store,
  store1,
  user
}
