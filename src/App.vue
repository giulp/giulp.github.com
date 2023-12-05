<template>
  <PersonalHeader />
  <AppMenu />
  <WorkSection />
  <EducationSection />
  <ProjectsSection />
  <SkillsSection/> 
  <LangsSection />
</template>

<script>

import PersonalHeader from './components/PersonalHeader'
import AppMenu from './components/AppMenu'
import WorkSection from './components/WorkSection'
import EducationSection from './components/EducationSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import LangsSection from './components/LangsSection.vue'

export default {
  name: 'App',
  components: {
    PersonalHeader,
    AppMenu,
    WorkSection,
    EducationSection,
    ProjectsSection,
    SkillsSection,
    LangsSection
  }
}
</script>

<style lang="scss">
body {
  background-image: url(assets/bg2.jpg);
  background-repeat: repeat;
  background-color: #2F2A26;
  background-blend-mode: luminosity;
  background-attachment: fixed;

  header, section, nav, #search {    
    border: 2px solid darkslategray;
    box-shadow: 3px 3px 8px black !important;
    border-radius: 10px;
    font-family: 'Exo', sans-serif;
    background: white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQImWO4sWuyFAMSQOHf2DVZCkOAeFXIfACnvRZ3jPNOwQAAAABJRU5ErkJggg==) repeat;
  }
  header, section {
    margin: 1rem auto;
    padding: 1rem auto;
    background-color: #FDFEFE;
  }
  h1 {
    font-size: 30px;
  }
  section {
    padding-bottom: 1rem;
    h1 {
      padding: 0.5rem 1.5rem 0 1rem;
      line-height: 3.5rem;
      font-size: 2rem;
      i { 
        color: #25201c;
        vertical-align: middle; 
      }
      span {
        margin-left: 1.5rem;
        font-size: 1.5rem;
      }
    }
    h3 {
      font-size: 1.5rem;
      padding-top: 1rem;
      margin-bottom: 0;
    }
    .time {
      float: right;
    }
    .subsection {
      padding: 1rem 3em;
      &:first-of-type {
        border-top: 2px solid dimgray;
      }
      &:not(:first-of-type) {
        border-top: 1px dashed #3f3a36;
      }
      .subheading {
        margin-right: 1rem;
        &, .link, .tech {
          display: inline-block;
        }
      }
    }

      .links {
        padding: .2rem 0;
        a { 
          background-color: #DFF2FF;
          margin: 0.5em;

          padding: 0.2em 0.5em;
          border-radius: 0.3em;
          border: 1px solid #A0B1C3;
          color: black;
          text-decoration: none;
          &:hover {
            background-color: transparent;
            color: rgb(0, 83, 155);
            border-color: transparent;
            text-decoration: underline;
          }
        }
      }
  }
}
</style>
