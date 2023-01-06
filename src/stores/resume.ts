import { defineStore } from 'pinia';
import { ref } from "vue";
import personalInfoData from '@/json/resume/personal-info.json';
import coaching from '@/json/resume/work_experience/coaching.json';
import practice from '@/json/resume/work_experience/practice.json';
import educationData from '@/json/resume/education.json';
import projectsData from '@/json/resume/projects.json';
import skillsData from '@/json/resume/skills.json';
import extraData from '@/json/resume/extra.json';
import langsData from '@/json/resume/langs.json';

export const useResumeStore = defineStore('resume', () => {
    const personalInfo = ref(personalInfoData);
    const jobs = ref({ coaching, practice });
    const education = ref(educationData);
    const projects = ref(projectsData);
    const skills = ref(skillsData);
    const extra = ref(extraData);
    const langs = ref(langsData);
    return { personalInfo, jobs, education, projects, skills, extra, langs };
});