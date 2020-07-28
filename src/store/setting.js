import {observable,action} from "mobx";

class setting {
  @observable isMobile = false

  @action.bound setC(val){
    this.isMobile = val
  }
}

export default setting;
