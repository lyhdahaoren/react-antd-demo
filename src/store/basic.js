import {observable,action} from "mobx";

class basicStore {
    @observable info = {
        abc:123
    };
    @action.bound setInfo(val){
        this.info = val;
    }
}

export default basicStore;