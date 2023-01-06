<script setup lang="ts">
import SectionTpl from '@/components/common/SectionTpl.vue';
import {useConfigStore} from "@/stores/config";
import {useResumeStore} from "@/stores/resume";
import {storeToRefs} from "pinia";
import {computed, ref, onMounted } from "vue";

const configStore = useConfigStore();
const resumeStore = useResumeStore();

const { lang, active, labels } = storeToRefs(configStore);
const { jobs } = storeToRefs(resumeStore);

const filteredJobs = computed(() => jobs.value[active.value === 'dev' ? 'practice' : 'coaching']);
const main_dev = labels.value.main_dev;

const showDetails = ref({})
const _showDetails = computed(() => (filteredJobs.value as { title: { [lang: string]: string }}[])
    .reduce((o, x) => ({...o, [x.title[lang.value]]: false}), {}))

const toggle = (t: string) => {
  showDetails.value = {
    ..._showDetails.value,
    [t]: ! (showDetails.value as { [visible: string]: boolean })[t]
  }
}

onMounted(() => showDetails.value = _showDetails.value);

</script>

<template>
  <section-tpl id="work" :title="{ico: 'group-work', txt: main_dev[lang]}">
    <div class="experience subsection"
         :class="active === 'dev' ? 'dev' : undefined"
         v-for="exp in filteredJobs" :key="exp.title"
         itemscope itemtype="http://schema.org/Organization">
      <h3 itemscope itemtype="http://schema.org/Person" itemprop="member">
        <span itemprop="jobTitle">{{exp.title[lang]}}</span>
      </h3>
      <h4 class="workplace" itemprop="name">
        <span class="workplace">{{exp.workplace}}</span>
        <span class="time">{{exp.time}}</span>
      </h4>
      <ul v-if="active === 'dev' && exp.achievements" class="achievements">
        <li class="subsection" v-for="entry in exp.achievements" :key="entry">
          {{entry[lang]}}
        </li>
      </ul>
      <span v-else-if="exp.description">{{exp.description[lang]}}</span>
      <div v-if="active !== 'dev' && exp.details"
           class="details"
           :class="showDetails[exp.title[lang]] || exp.details.length === 1
        ? 'open' : undefined">
        <a href="#" onclick="return false;"
           class="show_details"
           v-show="exp.details.length > 1"
           @click="toggle(exp.title[lang])">
          <i :class="showDetails[exp.title[lang]] ? 'zmdi zmdi-eye-off' : 'zmdi zmdi-eye'"></i>
          <span>{{labels.section_details[lang]}}</span>
        </a>
        <ul v-if="showDetails[exp.title[lang]] || exp.details.length === 1">
          <li class="subsection" v-for="d in exp.details" :key="d">
            <span class="title">{{d.title}}</span>
            <span class="time">{{d.time}}</span>
          </li>
        </ul>
      </div>
      <!-- <div class="images" v-if="exp.links?.length || exp.pics?.length">
          <img v-for="pic in exp.pics" :key="pic" :src="require('../assets/' + pic)"/>
      </div>
      <div class="links" v-if="exp.links?.length">
        <div class="subheading">{{config.labels.section_links[lang]}}</div>
        <div class="link" v-for="link in exp.links" :key="link.title">
          <a :href="link.url" target="_blank">{{link.title}}</a>
        </div>
      </div> -->
      <div class="technologies" v-if="exp.technologies?.length">
        <!-- <div class="subheading">{{config.labels.section_tech[lang]}}</div> -->
        <div class="tech" v-for="tech in exp.technologies" :key="tech">
          {{tech}}
        </div>
      </div>
    </div>
  </section-tpl>
</template>

<style lang="scss">
.link {
  display: inline-block;
  margin-left: auto .5rem;
  padding: .2rem .5rem;
  border-radius: .3em;
}
.blurb {
  font-style: italic;
}
.tech {
  display: inline-block;
  background-color: #F9F2C7;
  border: 1px solid #CEAC6B;
  margin: .3rem .5rem .3rem 0;
  padding: 0 .5rem;
  border-radius: 0.3em;
}
#work {
  .experience {
    &.dev {
      padding-bottom: 1rem;
    }
    h4 {
      font-size: 1rem;
      line-height: 2rem;
    }
    .achievements {
      padding: 1rem;
      background: linear-gradient(145deg, #f7f3ef, #fff0);
      color:black;
      box-shadow: 3px 3px 8px lightgrey !important;
      border-radius: 5px;
      border:1px solid #eeeeee;
    }
    .technologies {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-flow: row wrap;
      .subheading {
        display:block;
        padding: .5rem 0;
      }
      .tech {
        background-color: transparent;
        border: none;
        padding: 0;
        border-radius: unset;
        // border-bottom: 1px dotted;
        text-align: center;
      }
    }
    .images, .links {
      display:inline-block;
      margin: 1rem auto 1rem .5rem;
      height: 6rem !important;
    }
    .links {
      float: right;
      line-height:6rem;
    }
    .images {
      img {
        margin:1rem;
        height:4rem;
        width: 9rem;
        &:hover{
          margin:0;
          height:6rem;
          width:11rem;
        }
      }
    }
  }
}
//   .workplace, .time, .links div, .technologies div {
//     display: inline-block;
// }
// .workplace, .projects .title, .extracurriculars .title {
//     float: left;
// }
</style>