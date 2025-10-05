<template>
  <v-app class="app">
    <v-main >
      <Docs />
    </v-main>
  </v-app>
</template>

<script setup>
  import Docs from '@/components/Docs/Introduction.vue'
</script>
<style lang="scss">
  @import "./assets/main.scss";
  @use "./assets/variables.scss" as *;
  
  .app {
    max-width: 95%;
    padding: 20px;
  }
</style>
