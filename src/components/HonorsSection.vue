<template>
  <div class="section" ng-show="honors.length">
    <div class="h1"><span ng-bind="data[lang].general.h1_honor"></span></div>
    <div class="honors subsection" ng-repeat="honor in honors = (data[lang].resume.honors | filter:search | lowercase)">
      <div class="h3" ng-bind="honor.title"></div>
      <div class="content blurb" ng-bind="honor.details"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>