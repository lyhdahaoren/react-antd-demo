import { observable, action } from "mobx";

class setting {
  @observable isMobile = false;
  @observable isOpenTags = false;
  @observable theme = localStorage["theme"] ? localStorage["theme"] : "dark";

  @action.bound setC(val) {
    this.isMobile = val;
    console.log(val);
  }
  @action.bound setOpenTags(val) {
    this.isOpenTags = val;
  }
  @action.bound setTheme(val) {
    this.theme = val;
    localStorage.setItem("theme", val);
  }
}

export default setting;
