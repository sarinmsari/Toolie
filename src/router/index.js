import { createRouter, createWebHashHistory } from 'vue-router';
import ToolList from '../views/ToolList.vue';
import Categories from '../views/Categories.vue';
import Base64 from '../views/TextTools/Base64.vue';
import CaseConverter from '../views/TextTools/CaseConverter.vue';

const routes = [
    {
        path: '/',
        component: Categories,
        alias: '/index.html'
    },
    {
        path: '/category/:id',
        component: ToolList,
        props: true
    },
    {
        path: '/tool/base64',
        component: Base64
    },
    {
        path: '/tool/case-converter',
        component: CaseConverter
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});