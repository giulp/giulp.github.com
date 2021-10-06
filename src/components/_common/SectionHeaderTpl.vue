<template>  
  <h1>
    <i :class="`zmdi zmdi-${ico}`"></i>
    <span>{{txt}}</span>
  </h1>
</template>

<script>
export default {
  props:['ico', 'txt']
}
</script>

<style>

</style>