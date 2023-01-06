import { defineStore } from "pinia";
import {ref} from "vue";
import config from '@/json/config.json'
import countriesData from '@/json/countries/available.json';

export const useConfigStore = defineStore('config', () => {
    const active = ref('dev');
    const lang = ref('en');
    const menu = ref(config.menu);
    const labels = ref(config.labels);
    const countries = ref(countriesData);
    function setActive(value: string) {
        active.value = value;
    }
    function setLang(value: string) {
        lang.value = value;
    }

    return { lang, active, menu, labels, countries, setActive, setLang }
});