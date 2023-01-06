<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import { useResumeStore } from "@/stores/resume";
import SectionTpl from '@/components/common/SectionTpl.vue';
import {computed, onMounted, ref} from "vue";

const configStore = useConfigStore();
const resumeStore = useResumeStore();

const { lang, labels } = storeToRefs(configStore);
const { education } = storeToRefs(resumeStore);

const { h1_education, section_courses } = labels.value;

const showDetails = ref({})
const _showDetails = computed(() => (education.value as any[])
    .reduce((o, _, i) => ({...o, [`edu${i}`]: false}), {}));

const toggle = (t: string) => {
  showDetails.value = {
    ..._showDetails.value,
    [t]: ! (showDetails.value as { [visible: string]: boolean })[t]
  }
};
const show = (i: any, length: number) => {
  return (showDetails.value as { [visible: string]: boolean })[`edu${i}`] || length === 1
};

onMounted(() => showDetails.value = _showDetails.value);
</script>

<template>
  <SectionTpl id="edu" :title="{ico: 'home', txt: h1_education[lang]}">
    <div class="education subsection" v-for="(edu, i) in education" :key="edu">
      <h4>
        <span class="school">{{ edu.school }}</span>
        <span class="time">{{ edu.year }}</span>
      </h4>
      <h3 v-if="edu.degree">
        {{ edu.degree }}
      </h3>

      <span v-if="edu.description">{{edu.description[lang]}}</span>
      <div v-if="edu.courses.length" 
        class="details" 
        :class="show(i, edu.courses.length)
        ? 'open' : undefined">
        <a href="#" onclick="return false;"
          class="show_details"
          v-show="edu.courses.length > 1"
          @click="toggle(`edu${i}`)">
          <i :class="showDetails[`edu${i}`] ? 'zmdi zmdi-eye-off' : 'zmdi zmdi-eye'"></i>
          <span>{{section_courses[lang]}}</span>
        </a>
        <ul v-if="show(i, edu.courses.length)">
          <li class="subsection" v-for="course in edu.courses" :key="course">
            <span class="title">{{ course }}</span>
          </li>
        </ul>
      </div>
    </div>
  </SectionTpl> 
</template>

<style lang="scss">
  .education {
    padding: 2.5rem 2rem !important;
    h3 {
      padding-left: .5rem;
      font-size: 1.35rem;
    }
    .details {
      margin-top: 2rem;
      .subsection {
        padding-left: 0;
      }
    }
  }
</style>
