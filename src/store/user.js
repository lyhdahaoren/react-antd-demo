import { observable, action } from "mobx";

class userStore {
  @observable info = sessionStorage["info"]
    ? JSON.parse(sessionStorage["info"])
    : {};

  @action.bound setInfo(val) {
    this.info = val;
    sessionStorage.setItem("info", JSON.stringify(val));
  }
}

export default userStore;
