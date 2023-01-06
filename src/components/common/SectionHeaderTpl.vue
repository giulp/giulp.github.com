<template>  
  <h1>
    <i :class="`zmdi zmdi-${props.ico}`"></i>
    <span>{{props.txt}}</span>
  </h1>
</template>

<script setup lang="ts">
const props = defineProps<{ico: string; txt: string}>();
</script>