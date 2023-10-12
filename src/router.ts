import {createRouter, createWebHistory} from "vue-router";
import Coaches from '@/views/Coaches/Coaches.vue';
import Coach from "@/views/Coaches/Coach.vue";
import Contact from "@/views/Requests/Contact.vue";
import Register from "@/views/Coaches/Register.vue";
import Requests from "@/views/Requests/Requests.vue";
import NotFound from "@/views/NotFound.vue";
import UserAuth from "@/views/Auth/UserAuth.vue";
import {getIsAuth} from "@/js/firebase";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/coaches'
        },
        {
            path: '/coaches', component: Coaches, name: 'coaches'
        },
        {
            path: '/coaches/:id',
            component: Coach,
            name: 'coach',
            props: true,
            children: [
                {
                    path: 'contact', component: Contact, name: 'contact'
                }
            ]
        },
        {
            path: '/register', component: Register
        },
        {
            path: '/requests', component: Requests,
            meta: {
                isAuth: true
            }
        },
        {
            path: '/auth', component: UserAuth,
            meta: {
                isGuest: true
            }
        },
        {
            path: '/:notFound(.*)', component: NotFound
        }
    ]
});


router.beforeEach(async(to, from) => {
    const isAuth = await getIsAuth();

    if (!isAuth && to.meta.isAuth) return '/coaches';

    if (isAuth && to.meta.isGuest) return '/coaches';

    return true;
})

export default router;
