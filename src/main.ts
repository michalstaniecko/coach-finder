import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';

import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router';
import {createPinia} from "pinia";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";
import BaseBadgeList from "@/components/ui/BaseBadgeList.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.component('base-box', BaseBox);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-badge-list', BaseBadgeList);
app.component('base-container', BaseContainer);
app.component('base-spinner', BaseSpinner);

app.mount('#app')
