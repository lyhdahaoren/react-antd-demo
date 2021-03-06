import { observable, action } from "mobx";

class routesStore {
  @observable routes = [];
  @observable crumb = [];
  @observable tags = [
    {
      path: "/index",
      name: "首页",
    },
  ];
  @observable activeKey = 0;

  @action.bound setRoutes(val) {
    this.routes = val;
  }

  @action.bound setCrumbData(val) {
    this.crumb = [...val];
  }

  @action.bound setTags(val) {
    this.tags = [...new Set([...this.tags, ...val])];
    console.log("存进去了", val);
  }
  @action.bound clearTags() {
    this.tags = [
      {
        path: "/index",
        name: "首页",
      },
    ];
  }
  @action.bound setActiveKey(val) {
    this.activeKey = val;
    console.log("我是当前触发", val);
  }
}

export default routesStore;
