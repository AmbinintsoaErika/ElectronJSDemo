<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const router = useRouter()
const isLoggedIn = ref(!!localStorage.getItem('token'))
console.log(isLoggedIn.value)
function logout() {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<template>
  <div>
    <nav class="uk-navbar-container uk-navbar-transparent uk-box-shadow-small" uk-navbar>
      <div class="uk-navbar-left uk-margin-left">
        <router-link
            class="uk-navbar-item uk-logo uk-text-bold uk-text-primary"
            to="/"
        >
          <span uk-icon="icon: database; ratio: 1.2"></span>
          <span class="uk-margin-small-left">Gestionnaire d'articles</span>
        </router-link>
      </div>

      <div class="uk-navbar-right uk-margin-right">
        <ul class="uk-navbar-nav">
          <li v-if="!isLoggedIn.value && $route.path !== '/login'">
            <router-link to="/login" active-class="uk-active">Connexion</router-link>
          </li>
          <li v-else-if="isLoggedIn.value">
            <a @click.prevent="logout">Déconnexion</a>
          </li>
        </ul>
      </div>
    </nav>

    <main class="uk-container uk-margin-large-top">
      <router-view />
    </main>
  </div>
</template>


