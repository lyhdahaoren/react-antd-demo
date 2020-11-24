import { observable, action } from "mobx";

class setting {
  @observable isMobile = false;
  @observable isOpenTags = localStorage["isOpenTags"]
    ? JSON.parse(localStorage["isOpenTags"])
    : false;
  @observable theme = localStorage["theme"] ? localStorage["theme"] : "light";

  @action.bound setC(val) {
    this.isMobile = val;
    console.log(val);
  }
  @action.bound setOpenTags(val) {
    this.isOpenTags = val;
    localStorage.setItem("isOpenTags", val);
  }
  @action.bound setTheme(val) {
    this.theme = val;
    localStorage.setItem("theme", val);
  }
}

export default setting;
