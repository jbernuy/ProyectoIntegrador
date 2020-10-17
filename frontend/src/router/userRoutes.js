import userMiddleware from "../middlewares/userMiddleware";

export default {
    path: "/",
    name: "Home",
    component: () =>
        import ("../views/Home"),
    children: [{
        path: '/cursos',
        name: 'Cursos',
        component: () =>
            import ('../views/Courses'),
        beforeEnter: userMiddleware
    }, ],
    meta: {
        autenticate: true
    },

}