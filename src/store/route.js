import {observable,action} from "mobx";

class routesStore {
  @observable routes = [];
  @observable crumb = [];

  @action.bound setRoutes(val){
    this.routes = val;
  }

  @action.bound setCrumbData(val){
    this.crumb = val;
  }
}

export default routesStore;
