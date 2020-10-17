import axios from 'axios';
import configHeaderToken from '../libs/configHeaderToken';

axios.interceptors.response.use(
    function(response) { return response },
    function(error) { return error.response || error }
)

const degrees = {
    state: () => ({
        all: []
    }),
    mutations: {
        setDegrees(state, degrees) {
            state.all = degrees;
        }
    },
    actions: {
        async getAllDegrees({ state, commit }) {
            /* const headers = configHeaderToken(this.state.authToken); */
            const { data } = await axios.get(`${this.state.baseURL}/api/degree`);
            console.log(data);
            commit('setDegrees', data.degrees);
            return data;
        }

    }
}

export default degrees;