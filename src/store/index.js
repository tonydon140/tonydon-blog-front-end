import {createStore} from 'vuex'

export default createStore({
    state: {
        loading: false,
        themeObj: {},//主题
        keywords: '',//关键词
        errorImg: 'this.onerror=null;this.src="' + require('/public/img/tou.jpg') + '"',
        baseURL: 'http://localhost:7777/',
        userInfo:{}
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
