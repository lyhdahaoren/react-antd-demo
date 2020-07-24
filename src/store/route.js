import {observable,action} from "mobx";

class routesStore {
  @observable routes = [];
  @observable crumb = [];
  @observable tags = [];

  @action.bound setRoutes(val){
    this.routes = val;
  }

  @action.bound setCrumbData(val){
    this.crumb = val;
  }

  @action.bound setTags(val){
    this.tags = val;
    console.log('存进去了',val)
  }
}

export default routesStore;
