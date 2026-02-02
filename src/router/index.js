import { createRouter, createWebHashHistory } from 'vue-router';
import ToolList from '../views/ToolList.vue';
import Categories from '../views/Categories.vue';
import Base64 from '../views/TextTools/Base64.vue';
import CaseConverter from '../views/TextTools/CaseConverter.vue';
import WordCounter from '../views/TextTools/WordCounter.vue';
import LoremIpsum from '../views/TextTools/LoremIpsum.vue';
import JsonFormatter from '../views/DevTools/JsonFormatter.vue';
import ColorConverter from '../views/DevTools/ColorConverter.vue';
import PercentageCalculator from '../views/Math/PercentageCalculator.vue';
import UnitConverter from '../views/Math/UnitConverter.vue';

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
    },
    {
        path: '/tool/word-counter',
        component: WordCounter
    },
    {
        path: '/tool/lorem-ipsum',
        component: LoremIpsum
    },
    {
        path: '/tool/json-formatter',
        component: JsonFormatter
    },
    {
        path: '/tool/color-converter',
        component: ColorConverter
    },
    {
        path: '/tool/percentage-calculator',
        component: PercentageCalculator
    },
    {
        path: '/tool/unit-converter',
        component: UnitConverter
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});