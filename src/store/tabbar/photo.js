const photo = {
    // 初始化 vuex
    state: {
      photoList:[],
    },
    mutations: {
        setPhotoList(state, info){
            state.photoList =info;
        },
    },
    actions: {

    },
    getters: {
        photoList: state=>state.photoList,
    }
  }
  export default photo;
