<template>
  <SectionTpl id="extra" :title="{ico: 'home', txt: config.labels.h1_extra[lang]}">
    <div class="extracurriculars subsection" v-for="extra in resume.extra" :key="extra.title[lang]">
      <h3>
        <span class="title">{{extra.title[lang]}}</span>
        <span class="time" v-if="extra.time">{{extra.time[lang]}}</span>
      </h3>
      <ul class="content" v-if="extra.description">
        <li v-for="item in extra.description" :key="item">{{item[lang]}}</li>
      </ul>
      <div class="content" v-if="extra.details">
        {{extra.details[lang]}}
      </div>
      <div class="links" v-if="extra.links.length">
        <div class="subheading">{{config.labels.section_links[lang]}}</div>
        <div class="link" v-for="link in extra.links" :key="link.title">
          <a :href="link.url" target="_blank">{{link.title[lang]}}</a>
        </div>
      </div>
    </div>
  </SectionTpl>
</template>

<script>
import {mapState} from 'vuex'
import SectionTpl from '@/components/_common/SectionTpl'
export default {
  components: {
    SectionTpl
  },
  computed: {
    ...mapState([
      'lang',
      'config',
      'resume'
    ])
  }
}
</script>

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