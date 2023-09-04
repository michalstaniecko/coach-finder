import 'bulma/bulma.sass';

import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router';
import {createPinia} from "pinia";

const pinia = createPinia();
const app = createApp(App);
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseBadgeList from "@/components/ui/BaseBadgeList.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";

app.use(router);
app.use(pinia);

app.component('base-box', BaseBox);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-badge-list', BaseBadgeList);
app.component('base-container', BaseContainer);

app.mount('#app')
