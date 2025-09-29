<template>
  <div class="uk-container uk-margin-large-top">
    <div class="uk-margin-top uk-margin-bottom">
      <button @click="router.push('/')" class="uk-button uk-button-primary uk-border-rounded">
        <span uk-icon="icon: arrow-left"></span>Retour
      </button>
    </div>

    <div v-if="article" class="uk-margin-large-top uk-card uk-card-default uk-card-large uk-border-rounded uk-box-shadow-large uk-padding">
      <div class="uk-flex uk-flex-row uk-flex-right uk-width-1-1 uk-margin-large-bottom">
        <button v-if="!isEditing" @click="activateEdit" class="uk-button uk-button-secondary uk-border-rounded uk-margin-left">
          <span uk-icon="icon: pencil"></span>
        </button>
        <button v-if="!isEditing" @click="deleteArticle" class="uk-button uk-button-danger uk-border-rounded uk-margin-left">
          <span uk-icon="icon: trash"></span>
        </button>
      </div>

      <div class="uk-card-media-top uk-margin-bottom">
        <img :src="article.imgPath" alt="Article Image" class="uk-border-rounded uk-box-shadow-small">
      </div>

      <div class="uk-card-body">
        <!--Bloc lors d'une affichage-->
        <template v-if="!isEditing">
          <h1 class="uk-text-large uk-text-bolder uk-margin-small-bottom">{{ article.title }}</h1>
          <p>{{ article.desc }}</p>
          <hr class="uk-margin-small-top uk-margin-small-bottom">
          <p class="uk-text-meta uk-margin-remove-bottom">Créé par {{ article.author }}</p>
        </template>

        <!--Bloc lors d'une modification-->
        <template v-else>
          <label class="uk-form-label">Titre</label>
          <input class="uk-input uk-border-rounded uk-margin-small-top uk-margin-small-bottom" v-model="editableArticle.title">

          <label class="uk-form-label uk-margin-top">Description</label>
          <textarea class="uk-textarea uk-border-rounded uk-margin-small-top uk-margin-small-bottom" v-model="editableArticle.desc"></textarea>

          <label class="uk-form-label uk-margin-top">Auteur</label>
          <input class="uk-input uk-border-rounded uk-margin-small-top uk-margin-small-bottom" v-model="editableArticle.author">
        </template>
      </div>

      <div class="uk-flex uk-flex-row uk-flex-center">
        <button v-if="isEditing" @click="saveArticle" class="uk-button uk-button-secondary uk-border-rounded uk-margin-left">
          <span uk-icon="icon: check"></span> Enregistrer
        </button>
        <button v-if="isEditing" @click="cancelEditing" class="uk-button uk-button-default uk-border-rounded uk-margin-left">
          <span uk-icon="icon: close"></span> Annuler
        </button>
      </div>
    </div>

    <div v-else class="uk-text-center uk-text-muted">
      Loading article...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const editableArticle = ref(null)
const isEditing = ref(false)

// Chargement de l'article
async function loadArticle() {
  try {
    const response = await fetch(`http://localhost:3000/articles/${route.params.id}`)
    const result = await response.json()
    article.value = result.data
  } catch (err) {
    UIkit.notification('Impossible de charger l\'article.', 'danger')
  }
}

// Activation de la modification
function activateEdit() {
  editableArticle.value = { ...article.value }
  isEditing.value = true
}

// Annulation d'une modification
function cancelEditing() {
  isEditing.value = false
}

// Modification d'un article
async function saveArticle() {
  try {
    const response = await fetch(`http://localhost:3000/articles/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editableArticle.value)
    })
    const result = await response.json()

    if (response.ok) {
      article.value = { ...editableArticle.value }
      isEditing.value = false
      UIkit.notification('Article modifié avec succès !', 'success')
    } else {
      UIkit.notification(result.message || 'Échec de la modification.', 'danger')
    }
  } catch (err) {
    UIkit.notification('Erreur réseau. Veuillez réessayer !', 'danger')
  }
}

// Suppression d'un article
async function deleteArticle() {
  try {
    const response = await fetch(`http://localhost:3000/articles/${article.value.id}`, {
      method: 'DELETE',
      headers: { 'accept': 'application/json' }
    })
    const result = await response.json()

    if (response.ok) {
      UIkit.notification('Article supprimé avec succès !', 'success')
      router.push('/')
    } else {
      UIkit.notification(result.message || 'Échec de la suppression.', 'danger')
    }
  } catch (err) {
    UIkit.notification('Erreur réseau. Veuillez réessayer !', 'danger')
  }
}

onMounted(loadArticle)
</script>
