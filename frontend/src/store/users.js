import axios from 'axios';

axios.interceptors.response.use(
    function(response) { return response },
    function(error) { return error.response || error }
)

const users = {
    state: () => ({

    }),
    mutations: {

    },
    actions: {
        registerUser({ state, commit }, user) {
            const res = axios.post(`${this.state.baseURL}/api/user`, user);
            return res;
        }

    }
}

export default users;