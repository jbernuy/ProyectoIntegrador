import store from '../store/index';

export default (to, from, next) => {
    const TOKEN = localStorage.getItem('token') || store.state.authToken; //CONFIRMA SI TENGO UN TOKEN EN LS
    const routeIsProtected = to.matched.some(record => record.meta.autenticate); //PREGUNTA SI ESTOY INTENTANDO ACCEDER A UNA RUTA QUE REQUIERE ESTAR AUTENTICADO

    if ((!TOKEN && routeIsProtected)) {
        next('/login')
    } else if (TOKEN && !routeIsProtected) {
        next('/')
    } {
        next()
    }

}