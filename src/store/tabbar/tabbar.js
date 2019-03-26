const system = {
    // 初始化 vuex
    state: {
      tabIndex:'1',
    },
    mutations: {
        setTabIndex(state, info){
            state.tabIndex =info;
        },
    },
    actions: {

    },
    getters: {
        tabIndex: state=>state.tabIndex,
    }
  }
  export default system;
