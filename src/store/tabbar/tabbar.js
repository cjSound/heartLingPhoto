const system = {
    // 初始化 vuex
    state: {
      tabIndex:'',
    },
    mutations: {
        setTabIndex(state, info){
            state.fullState =info;
        },
    },
    actions: {

    },
    getters: {
        tabIndex: state=>state.tabIndex,
    }
  }
  export default system;
