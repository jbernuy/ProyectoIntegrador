import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#06243e',
                secondary: '#fff3bf',
            },
            dark: {
                primary: '#06243e',
                secondary: '#fff3bf',
            }
        },
    },
});