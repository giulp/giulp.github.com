<template>
  <header id="person" 
    itemscope itemtype="http://schema.org/Person">
    <FlipImage/>
    <!-- <img src="../assets/giulp_avatar.png" alt="GiulP"> -->
    <h1 itemprop="name">{{resume.personalInfo.name}}</h1>
    <h2 v-if="resume.personalInfo.email" itemprop="email">
      <i class="zmdi zmdi-account-box-mail"/>
      <span>{{resume.personalInfo.email}}</span>
    </h2>
    <h2 v-if="resume.personalInfo.phone" itemprop="telephone">
      <i class="zmdi zmdi-phone-sip"/>
      <span>{{resume.personalInfo.phone}}</span>
    </h2>
    <ul class="links" v-if="resume.personalInfo.links.length">
      <li v-for="link in resume.personalInfo.links"
        :key="link" itemprop="url">
        <a :href="link.url" target="_blank">
          <span>{{link.title}}</span>
          <i class="zmdi zmdi-{{link.title}}"/>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import FlipImage from '@/components/_common/FlipImage'
export default {
  components: {
    FlipImage
  },
  computed: {
    ...mapState(['resume'])
  }
}
</script>

<style lang="scss">
  #person {
    padding: 1rem;
    text-align: center;
    width: 100%;
    background: white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQImWO4sWuyFAMSQOHf2DVZCkOAeFXIfACnvRZ3jPNOwQAAAABJRU5ErkJggg==) repeat;
    img {
      border-radius: 0.4em;
      border: 3px solid white;
      margin-top:1em;
      box-shadow: 3px 3px 8px lightgrey !important;
    }
    h1 {
      font-family: 'Exo', sans-serif;
      &, h2 {
        margin-top: 20px;
        margin-bottom: 10px;
      }
    }
    h2 {
      font-size: 14px;
      span {
        margin-left: .5rem;
      }
    }

    ul.links {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 2rem;
      margin-top: 1rem;
      
      li {
        display: inline-block;
        background-color: white;
        background: linear-gradient(145deg, #f3eeea, #fff0);
        color:black;
        font-size:110%;
        box-shadow: 3px 3px 8px lightgrey !important;
        border-radius: 5px;
        padding: 0 1rem;
        border:1px solid #eeeeee;

        &:hover {
          box-shadow: none !important;
          cursor: pointer;
          border-color: transparent;
          background-color: transparent !important;
          background:none !important;
          text-decoration: underline;
        }
        a, a:hover, a:active, a:visited {
          text-decoration: none;
          // background-color: white;
          color:black;
          font-size:100%;
        }
        a:hover {
          background-color: transparent !important;
          border-color: #333333;
          text-decoration: underline;
        }
      }
    }
  }
</style>