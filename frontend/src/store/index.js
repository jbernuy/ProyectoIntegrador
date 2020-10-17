import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(Vuex);

axios.interceptors.response.use(
    function(response) { return response },
    function(error) { return error.response || error }
)

// Modules Imports
import usersModule from './users';
import degreesModule from './degrees';

export default new Vuex.Store({
    state: {
        baseURL: 'http://localhost:3200',
        authToken: localStorage.getItem('iToken'),
        user: null,
    },
    mutations: {
        setCurrentUser(state, user) {
            state.user = user;
        },
        setAuthToken(state, token) {
            state.authToken = token;
        }
    },
    actions: {
        async login({ state, commit }, authPayload) {
            const res = await axios.post(`${state.baseURL}/api/auth/signin`, authPayload);
            if (res.status == 200) {
                console.log(res.data);
                commit('setCurrentUser', res.data.user);
                commit('setAuthToken', res.data.authToken);
                localStorage.setItem('token', res.data.authToken);
                localStorage.setItem('iat', res.data.millisExp);
            }
            return res;
        },
        async refreshedToken({ commit, state }) {
            try {
                const config = configHeaderToken(state.auth_token);
                const res = await axios.post(`${state.baseURL}/api/auth/newtoken`, state.user, config);
                if (res.status != 200) return false;
                commit('setAuthToken', res.data.authToken);
                localStorage.setItem('token', res.data.authToken);
                localStorage.setItem('iat', res.data.millisExp);
                return true;
            } catch (error) {
                return false;
            }
        },
        logout({ commit, state }) {
            try {
                commit('setAuthToken', null);
                commit('setCurrentUser', null)
                localStorage.removeItem('token');
                localStorage.removeItem('iat');
                localStorage.removeItem('optc');
                localStorage.removeItem('test');
                return true;
            } catch (error) {
                return false;
            }
        },
    },
    modules: {
        users: usersModule,
        degrees: degreesModule
    }
});