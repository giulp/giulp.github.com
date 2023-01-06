<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "@/stores/config";
import { useResumeStore } from "@/stores/resume";
import SectionTpl from '@/components/common/SectionTpl.vue';

const configStore = useConfigStore();
const resumeStore = useResumeStore();

const { lang, labels } = storeToRefs(configStore);
const { projects } = storeToRefs(resumeStore);

const { h1_projects } = labels.value;
</script>

<template>
  <SectionTpl id="projects"
              :title="{ico: 'collection-plus', txt: h1_projects[lang]}">
    <div class="projects subsection"
         v-for="project in projects" :key="project.title">
      <div class="technologies" v-if="project.technologies.length">
        <!-- <div class="subheading">
          <span>{{config.labels.section_tech[lang]}}</span>
        </div> -->
        <div class="tech" v-for="tech in project.technologies" :key="tech">
          {{tech}}
        </div>
      </div>
      <h3>{{project.title}}</h3>
      <h4 v-if="project.time">{{project.time}}</h4>
      <div class="blurb" v-if="project.blurb.length">{{project.blurb}}</div>
      <div class="description" v-if="project.description.length" >{{project.description}}</div>
      <!-- <div class="links" v-if="project.links.length">
        <span>{{config.labels.section_links[lang]}}</span>
        <div class="link" v-for="link in project.links" :key="link.title">
          <a :href="link.url" target="_blank">{{link.title}}</a>
        </div>
      </div> -->
    </div>
  </SectionTpl>
</template>

<style lang="scss">
#projects {
  h4 {
    font-size: 1rem;
    font-weight: bold;
    float: right;
  }
  .technologies {
    float: right;
    padding-top: 1rem;
    .tech {
      text-align: center;
      border: none;
      background: transparent;
      // box-shadow: 3px 3px 8px lightgrey !important;
      // border-radius: 0.3em;
    }
  }
  .description {
    text-align: center;
    margin: 1.5rem;
    background-color: white;
    background: linear-gradient(145deg, #f7f3ef, #fff0);
    color: black;
    font-size: 110%;
    border-color: lightgray;
    box-shadow: 3px 3px 8px lightgrey !important;
    border-radius: 5px;
    padding: 1rem;
    border: 1px solid #eeeeee;
  }
}
</style>