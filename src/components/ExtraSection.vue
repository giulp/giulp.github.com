<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import { useResumeStore } from "@/stores/resume";
import SectionTpl from '@/components/common/SectionTpl.vue';

const configStore = useConfigStore();
const resumeStore = useResumeStore();

const { lang, labels } = storeToRefs(configStore);
const { extra } = storeToRefs(resumeStore);

const { h1_extra, section_links } = labels.value;
</script>

<template>
  <SectionTpl id="extra" :title="{ico: 'home', txt: h1_extra[lang]}">
    <div class="extracurriculars subsection" v-for="extraItem in extra" :key="extraItem.title[lang]">
      <h3>
        <span class="title">{{extraItem.title[lang]}}</span>
        <span class="time" v-if="extraItem.time">{{extraItem.time[lang]}}</span>
      </h3>
      <ul class="content" v-if="extraItem.description">
        <li v-for="item in extraItem.description" :key="item">{{item[lang]}}</li>
      </ul>
      <div class="content" v-if="extraItem.details">
        {{extraItem.details[lang]}}
      </div>
      <div class="links" v-if="extraItem.links.length">
        <div class="subheading">{{section_links[lang]}}</div>
        <div class="link" v-for="link in extraItem.links" :key="link.title">
          <a :href="link.url" target="_blank">{{link.title[lang]}}</a>
        </div>
      </div>
    </div>
  </SectionTpl>
</template>

<style lang="scss">
#extra {
  .subsection {
    padding-bottom: .5rem;
    .time {
      font-size: 1rem;
    }
  }
}
</style>