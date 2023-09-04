import {createRouter, createWebHistory} from "vue-router";
import Coaches from '@/views/Coaches/Coaches.vue';
import Coach from "@/views/Coaches/Coach.vue";
import Contact from "@/views/Requests/Contact.vue";
import Register from "@/views/Coaches/Register.vue";
import Requests from "@/views/Requests/Requests.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/coaches'
        },
        {
            path: '/coaches', component: Coaches
        },
        {
            path: '/coaches/:id/',
            component: Coach,
            props: true,
            children: [
                {
                    path: 'contact', component: Contact
                }
            ]
        },
        {
            path: '/register', component: Register
        },
        {
            path: '/requests', component: Requests
        },
        {
            path: '/:notFound(.*)', component: NotFound
        }
    ]
});

export default router;
