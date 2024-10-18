import '@babel/polyfill'
import 'mutationobserver-shim'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import './assets/tailwind.css'
import './assets/styles/style.css'
import {createDynamicForms} from '@asigloo/vue-dynamic-forms';
import '@/assets/styles/material.scss';
import store from './store'
import DataTable from "@andresouzaabreu/vue-data-table";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
import VueCryptojs from "vue-cryptojs/src";
import VueSweetalert2 from "vue-sweetalert2";


const VueDynamicForms = createDynamicForms({});


loadFonts()
// Vue;

createApp(App).use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(VueDynamicForms)
    .use(VueCryptojs)
    .component("data-table", DataTable)
    .use(vuetify)
    .mount('#app')
  