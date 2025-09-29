<template>
  <h1>Page 1</h1>

  <button @click="callApi" class="uk-button">APPEL API</button>

  <div v-for="movie in movies" :key="movie.title">
    {{ movie.title }}
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import log from 'electron-log/renderer';

  /** directory : ~/.config/app_demo/logs **/
  log.info('Renderer prêt');
  log.warn('Attention, message d’avertissement');
  log.error('Une erreur est survenue');

  const movies = ref([])

  async function callApi() {
    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

    const data = await res.json();
    movies.value = data;
  }
</script>