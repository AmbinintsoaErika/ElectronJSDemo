<template>
  <div class="uk-flex uk-flex-middle uk-flex-center uk-height-viewport ">
    <div class="uk-card uk-card-default uk-card-body uk-width-3-4 uk-border-rounded uk-box-shadow-large">
      <div class="uk-text-center uk-margin uk-flex uk-flex-row uk-flex-center uk-flex-middle">
        <h2 class="uk-card-title uk-text-bolder uk-margin-small-top">INSCRIPTION</h2>
      </div>

      <form @submit.prevent="handleSignUp" class="uk-form-stacked">
        <!-- Message d'erreur -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>

        <!-- Champ pseudo -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: user"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Pseudo</label>
          </div>
          <input class="uk-input uk-border-rounded" v-model="pseudo" required />
        </div>

        <!-- Champ e-mail -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: mail"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">E-mail</label>
          </div>
          <input class="uk-input uk-border-rounded" type="email" v-model="email" required />
        </div>

        <!-- Champ mot de passe -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: lock"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Mot de passe</label>
          </div>
          <input class="uk-input uk-border-rounded" type="password" v-model="password" required />
        </div>

        <!-- Champ confirmation mot de passe -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: lock"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Confirmation mot de passe</label>
          </div>
          <input class="uk-input uk-border-rounded" type="password" v-model="passwordConfirm" required />
        </div>

        <!-- Champ code postal -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: hashtag"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Code postal</label>
          </div>
          <input class="uk-input uk-border-rounded" v-model="cityCode" required />
        </div>

        <!-- Champ ville -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: crosshairs"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Code postal</label>
          </div>
          <input class="uk-input uk-border-rounded" v-model="city" required />
        </div>

        <!-- Champ téléphone -->
        <div class="uk-margin">
          <div class="uk-flex uk-flex-row">
            <span class="uk-margin-small-bottom uk-text-primary" uk-icon="icon: phone"></span>
            <label class="uk-form-label uk-text-bold uk-text-primary uk-margin-small-left">Téléphone</label>
          </div>
          <input class="uk-input uk-border-rounded" v-model="phone" required />
        </div>

        <!-- Bouton d'inscription -->
        <div class="uk-flex uk-flex-center uk-margin">
          <button type="submit" class="uk-button uk-button-primary uk-width-3-5 uk-border-rounded">
            <span uk-icon="plus"></span> S'inscrire
          </button>
        </div>

        <div class="uk-flex uk-flex-row uk-flex-right">
          <span>Vous avez déjà un compte ?</span>
          <router-link to="/login" tag="button" class="uk-margin-small-left">Connectez-vous</router-link>
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
const passwordConfirm = ref('')
const pseudo = ref('')
const cityCode = ref('')
const city = ref('')
const phone = ref('')
const errorMessage = ref('')

const router = useRouter()

async function handleSignUp() {
  errorMessage.value = ''

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        pseudo: pseudo.value,
        cityCode: cityCode.value,
        city: city.value,
        phone: phone.value
      })
    })

    const data = await response.json()

    if (data.code === 201 || data.code === 200) {
      if (data.token) localStorage.setItem('token', data.token)
      router.push('/')
    } else {
      errorMessage.value = data.message || 'Impossible de créer le compte.'
    }
  } catch (err) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer !'
  }
}
</script>
