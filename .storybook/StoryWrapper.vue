<template>
    <v-app :theme="themeName">
      <v-main style="margin: 1% 20px;max-width: 95%">
        <slot name="story"></slot>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    props: {
      themeName: String
    },
  }
</script>