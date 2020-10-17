import Vue from "vue";
import VueRouter from "vue-router";
import P404 from '../views/P404';
import tokenMiddleware from '../middlewares/tokenMiddleware';
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";

Vue.use(VueRouter);

const routes = [{
        path: "*",
        name: "P404",
        component: P404,
        meta: {
            autenticate: false
        }
    },
    loginRoutes,
    userRoutes,
];

const router = new VueRouter({
    mode: "history",
    linkActiveClass: 'active',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(tokenMiddleware);

export default router;