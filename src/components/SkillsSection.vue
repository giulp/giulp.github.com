<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import { useResumeStore } from "@/stores/resume";
import SectionTpl from '@/components/common/SectionTpl.vue';

const configStore = useConfigStore();
const resumeStore = useResumeStore();

const { lang, labels } = storeToRefs(configStore);
const { skills } = storeToRefs(resumeStore);

const { section_skill } = labels.value;
</script>

<template>
  <SectionTpl id="skills" :title="{ico: 'key', txt: section_skill[lang]}">
    <div class="skillset subsection" v-for="skillSet in skills" :key="skillSet.title">
      <h3>
        <span>{{skillSet.title}}</span>
        <span v-if="skillSet.stars" class="stars">
          <i class="zmdi zmdi-star" v-for="i in parseInt(skillSet.stars)" :key="i"></i>
          <i class="zmdi zmdi-star-outline" v-for="i in 5 - parseInt(skillSet.stars)" :key="i"></i>
        </span>
      </h3>
      <div class="technologies">
        <div
            class="tech h4"
            v-for="topic in skillSet.topics" :key="topic"
            itemprop="itemListElement">{{topic}}
        </div>
      </div>
    </div>
  </SectionTpl>
</template>

<style lang="scss">
#skills {
  .skillset {
    h3 {
      text-align: left;
      margin: 1rem 0;
      span {
        display:inline-block;
        &.stars {
          color: #e4b12f;
          margin-left:1rem;
        }
      }
    }
  }
  .technologies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    gap: 1.5rem;
    padding: 0.3rem 0 1rem 0;
    line-height: 2rem;
    .tech {
      font-size: 1rem;
      padding: 0.3rem 0.7rem;
      text-align: center;
      border: none;
      background: linear-gradient(145deg, #f7f3ef, #fff0);
      box-shadow: 3px 3px 8px lightgrey !important;
      border-radius: 0.3em;
    }
  }
}
</style>