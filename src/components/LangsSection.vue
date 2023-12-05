<template>
    <SectionTpl id="skills" 
      :title="{ico: 'key', txt: config.labels.section_langs[lang]}">
      <div class="skillset subsection" v-for="spoken in resume.langs" :key="spoken.title[lang]">
        <h3>
          <span>{{spoken.title[lang]}}</span>
          <span v-if="spoken.stars" class="stars">
            <i class="zmdi zmdi-star" v-for="i in parseInt(spoken.stars)" :key="i"></i>
            <i class="zmdi zmdi-star-outline" v-for="i in 10 - parseInt(spoken.stars)" :key="i"></i>
          </span>
        </h3>
      </div>
    </SectionTpl>
  </template>
  
  <script>
  
  import { mapState } from 'vuex'
  import SectionTpl from '@/components/_common/SectionTpl'
  
  export default {
    components: {
      SectionTpl
    },
    computed: {
      ...mapState([
        'config',
        'lang',
        'resume'
      ])
    }
  }
  </script>
  
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