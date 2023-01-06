<script setup lang="ts">
import pdfMake from "pdfmake";
import { openPdf } from '@/modules/print'
import { useConfigStore } from "@/stores/config";
import { useResumeStore } from "@/stores/resume";
import { storeToRefs } from "pinia";

const configStore = useConfigStore();
const resumeStore = useResumeStore();
const { lang, menu, labels, countries, active } = storeToRefs(configStore);
const { personalInfo, jobs, education, projects, skills, extra, langs } = storeToRefs(resumeStore);

const setActive = (k: string) => configStore.setActive(k);
const setLang = (l: string) => configStore.setLang(l);
const getImgSrc = (b64Img: string) => {
  return `data:image/png;base64,${b64Img}`
}
const print = () => openPdf(pdfMake, {
  config: { menu: menu.value, labels: labels.value},
  resume: {
    personalInfo: personalInfo.value,
    jobs: jobs.value,
    education: education.value,
    projects: projects.value,
    skills: skills.value,
    extra: extra.value,
    langs: langs.value
  },
  lang: lang.value
});

</script>

<template>
  <nav id="menu">
    <div id="contents">  <!-- id="secondrow"> -->
      <ul>  <!-- ng-init="tab = 1"> -->
        <li v-for="(tab, k) in menu" :key="k"
            :class="active === k ? 'active' : undefined">
          <a href="javascript:;" @click="setActive(k)">
            <i class="zmdi" :class="`zmdi-${tab.ico}`"></i>
            <span>{{tab.name[lang]}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div id="controls">
      <a href="javascript:;" id="print_cv" @click="print">
        <i class="zmdi zmdi-print"></i>
      </a>
    </div>
    <div id="lang"> <!-- id="firstrow"> -->
      <img v-for="c in countries" :key="c.name"
           class="flag" :class="lang === c.lang ? 'active' : null"
           :src="getImgSrc(c.flag)" :alt="c.desc" :title="c.lang"
           @click="setLang(c.lang)">
    </div>
  </nav>
</template>

<style lang="scss">
nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 1rem 0;
  img {
    float: right;
    margin-right: 2rem;
    box-shadow: none;
    border-radius: .2em;
    border: 1px solid #ffffff60;
    opacity: .4;
    &.active {
      opacity:1;
      box-shadow: 3px 3px 3px #ccc;
    }
  }
  #controls, #lang {
    text-align: center;
    line-height: 0;
    margin: 0;
    img.flag:not(.active):hover {
      opacity: .8;
      cursor: pointer;
    }
    #print_cv,
    #print_cv:active,
    #print_cv:visited,
    #print_cv i {
      color: #2f2a26;
      font-size: 1.45em;
      opacity: 0.95;
      min-width: 2.2em;
      vertical-align: middle;
      // padding-left: 1rem;
    }

    #print_cv:hover {
      color:#0f0a06;
      cursor:pointer;
      opacity: 1;
    }
  }
  #contents {
    margin: 0;
    ul {
      margin: 0;
      margin-left: 1rem;
      padding:0;
      li {
        margin:0;
        list-style-type:none;
        display: inline-block;
        font-size: 1.1rem;
        color: black;
        padding-left: 1em;
        a, a:hover, a:active {
          color: lightgray;
          text-decoration: none;
          min-height: 2em;
          line-height: 2em;
          span {
            margin-left:.5rem;
          }
        }
        &.active {
          a, a:hover, a:active {
            color: black;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>