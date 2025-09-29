<template>
  <div class="uk-flex uk-flex-middle uk-flex-center uk-height-viewport ">
    <div class="uk-card uk-card-default uk-card-body uk-width-3-4 uk-border-rounded uk-box-shadow-large">
      <div class="uk-text-center uk-margin uk-flex uk-flex-row uk-flex-center uk-flex-middle">
        <h2 class="uk-card-title uk-text-bolder uk-margin-small-top">CONNEXION</h2>
      </div>

      <form @submit.prevent="handleLogin" class="uk-form-stacked">
        <!-- Error message -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>

        <!-- Champ e-mail -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row uk-flex-middle">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: mail"></span>
            <label class="uk-form-label uk-margin-small-left uk-text-bold uk-text-primary">E-mail</label>
          </div>
          <input
              class="uk-input uk-border-rounded uk-padding-small uk-text-small"
              type="email"
              v-model="email"
              required
              placeholder=""
          />
        </div>

        <!-- Champ mot de passe -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row uk-flex-middle">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: lock"></span>
            <label class="uk-form-label uk-margin-small-left uk-text-bold uk-text-primary">Mot de passe</label>
          </div>
          <input
              class="uk-input uk-border-rounded uk-padding-small uk-text-small"
              type="password"
              v-model="password"
              required
              placeholder=""
          />
        </div>

        <!-- Bouton de connexion -->
        <div class="uk-flex uk-flex-center uk-margin">
          <button type="submit" class="uk-button uk-button-primary uk-width-2-5 uk-border-rounded">
            <span uk-icon="sign-in"></span> Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

async function handleLogin() {
  errorMessage.value = ''
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await response.json()

    if (data.code == 200) {
      localStorage.setItem('token', data.token)

      router.push('/')
    } else {
      errorMessage.value = data.message || 'Veuillez vérifier vos identifiants.'
    }
  } catch (err) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer !'
  }
}
</script>
