import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';
import configHeaderToken from './libs/configHeaderToken';

Vue.config.productionTip = false;

const userConected = async() => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const baseUrl = store.state.baseURL;
        const config = configHeaderToken(token);
        const res = await axios.get(`${baseUrl}/api/auth/profile`, config);
        if (res.status !== 200) return null;
        return res.data.user;
    } catch (error) {
        return null;
    }
}

const render = async() => {
    const usuario = await userConected();
    console.log(usuario);
    if (usuario === null) {
        localStorage.removeItem('token');
        localStorage.removeItem('iat');
        router.push('/login').catch(err => {});
    } else {
        store.commit('setCurrentUser', usuario);
    }
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount("#app");
}

render();


/* new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app"); */