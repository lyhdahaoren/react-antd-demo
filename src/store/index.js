import basicStore from './basic';
import routesStore from "./route";

//注入store
const store = new basicStore();
const store1 = new routesStore();

export default {
  store,
  store1
}
