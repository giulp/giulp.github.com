import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'

import config from './json/config.json'
import countries from './json/countries/available.json'

import personalInfo from './json/resume/personal-info.json'
import projects from './json/resume/projects.json'
import edu from './json/resume/edu.json'
import skills from './json/resume/skills.json'
import coaching from './json/resume/work_experience/coaching.json'
import practice from './json/resume/work_experience/practice.json'
import extra from './json/resume/extra.json'
import langs from './json/resume/langs.json'

createApp(App)
  .use(
    createStore({
      state () {
        return {
          lang: 'en',
          active: 'dev',
          countries,
          config,
          resume: {
            personalInfo,
            projects,
            skills,
            edu,
            jobs: {
              practice,
              coaching
            },
            extra,
            langs
          }
        }
      },
      mutations: {
        setLang (state, lang) {
          state.lang = lang
        },
        setActive(state, topic) {
          state.active = topic
        }
      },
      getters: {
        getCv: (state) => ({
          config: state.config,
          resume: state.resume,
          lang:state.lang
        })
      }
    })
  )
  .mount('#app')
