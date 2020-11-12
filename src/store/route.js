import {observable, action, set, observe, computed} from "mobx";

class routesStore {
  @observable routes = [];
  @observable crumb = [];
  @observable tags = [];
  @observable activeKey = 0;

  @action.bound setRoutes(val){
    this.routes = val;
  }

  @action.bound setCrumbData(val){
    this.crumb = val;
  }

  @action.bound setTags(val){
    this.tags = [...new Set([...this.tags,...val])];
  }
  @action.bound clearTags(){
    this.tags = []
  }
  @action.bound setActiveKey(val){
    this.activeKey = val;
  }
}

export default routesStore;
