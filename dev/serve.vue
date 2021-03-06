<script lang="ts">
import Vue from 'vue';
import VueActiveTracker from '@/vue-active-tracker.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueActiveTracker
  }
});
</script>

<template>
  <div id="app">
    <vue-active-tracker />
  </div>
</template>
