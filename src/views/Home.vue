<template>
  <div class="uk-container uk-margin-large-top uk-margin-large-bottom">
    <h1 class="uk-text-large uk-text-bolder uk-text-left">TOUS LES ARTICLES</h1>

    <div class="uk-grid-small uk-child-width-1-3@m uk-flex-center" uk-grid>
      <div v-for="article in articles" :key="article.id">
        <router-link
            :to="`/articles/${article.id}`"
            class="uk-link-reset"
        >
        <div class="uk-card uk-flex uk-flex-row uk-card-default uk-card-hover uk-card-small uk-border-rounded
          uk-border-blue uk-margin-bottom">
          <div class="uk-card-media-top uk-width-1-3">
            <img class="uk-height-1-1" :src="article.imgPath" alt="Article Image">
          </div>
          <div class="uk-card-body uk-flex uk-flex-column uk-flex-around uk-width-2-3">
            <h3 class="uk-text-medium uk-text-primary uk-margin-remove">{{ article.title }}</h3>
            <span class="uk-text-small uk-text-secondary">{{ article.desc }}</span>
            <span class="uk-text-meta">{{ article.author }}</span>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])

async function loadArticles() {
  try {
    const response = await fetch('http://localhost:3000/articles', {
      method: 'GET',
      headers: { 'accept': 'application/json' }
    })

    const result = await response.json()
    articles.value = result.data
  } catch (err) {
    UIkit.notification('Une erreur est survenue. Veuillez réessayer !', 'danger')
  }
}

onMounted(loadArticles)
</script>
