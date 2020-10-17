import LoginRegistry from '../views/LoginRegistry';

export default {
    path: "/login",
    name: "Login-Registry",
    component: LoginRegistry,
    children: [{
            path: "/login",
            name: "Login",
            component: () =>
                import ('../views/Login'),
            meta: {
                autenticate: false
            }
        },
        {
            path: "/login/register",
            name: "Registry",
            component: () =>
                import ('../views/Registry'),
            meta: {
                autenticate: false
            }
        },
    ],
    meta: {
        autenticate: false
    }
}