<template>
  <div>

  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

let route = useRoute();

function routeChange() {

}

console.log(route.params.id);
</script>

<style scoped>

</style>