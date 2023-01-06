<script setup lang="ts">
import PersonalHeader from '@/components/PersonalHeader.vue'
import WorkSection from "@/components/WorkSection.vue";
import EducationSection from "@/components/EducationSection.vue";
import ProjectsSection from "@/components/ProjectsSection.vue";
import SkillsSection from "@/components/SkillsSection.vue";
import AppMenu from "@/components/AppMenu.vue";

</script>

<template>
  <div class="container">
    <personal-header />
    <app-menu />
    <work-section />
    <education-section />
    <projects-section />
    <skills-section />
  </div>
</template>
