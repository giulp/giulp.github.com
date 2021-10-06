<template> 
  <SectionTpl id="edu" :title="{ico: 'home', txt: config.labels.h1_education[lang]}">
    <div class="education subsection" v-for="(edu, i) in resume.edu" :key="edu">
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
          <span>{{config.labels.section_courses[lang]}}</span>
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

<script>
import {mapState} from 'vuex'
import SectionTpl from '@/components/_common/SectionTpl'
export default {
  components: {
    SectionTpl
  },
  data() {
    return {
      showDetails: {}
    }
  },
  computed: {
    ...mapState([
      'lang',
      'config',
      'resume'
    ]),
    _showDetails() {
      return this.resume.edu.reduce((o, _, i) => ({...o, [`edu${i}`]: false}), {})
    }
  },
  methods:{
    toggle(t){
      this.showDetails = {
        ...this.showDetails,
        [t]: ! this.showDetails[t]
      }
    },
    show(i, length) {
      return this.showDetails[`edu${i}`] || length === 1
    }
  },
  created(){
    this.showDetails = this._showDetails
  }
}
</script>

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