<template>
  <div class="profile-page">
    <h1 class="profile-page__title">
      About You
    </h1>
    <button v-if="edit" class="button profile-page__action" @click="edit = false">
      Cancel
    </button>
    <button v-else class="button profile-page__action" @click="edit = true">
      Edit
    </button>
    <form
      class="profile-page__form"
      @submit.prevent="updateProfile"
    >
      <label class="profile-page__input-wrapper">
        <p class="profile-page__label">What's Yout Name?</p>
        <input v-if="edit" v-model="profile.name" type="text" class="profile-page__input">
        <p v-else class="profile-page__text">{{ profile.name || '-' }}</p>
      </label>
      <label class="profile-page__input-wrapper">
        <p class="profile-page__label">Where Are You From?</p>
        <input v-if="edit" v-model="profile.nationality" type="text" class="profile-page__input">
        <p v-else class="profile-page__text">{{ profile.nationality || '-' }}</p>
      </label>
      <label class="profile-page__input-wrapper">
        <p class="profile-page__label">What's Yout Favorite Weather?</p>
        <input v-if="edit" v-model="profile.favorite_weather" type="text" class="profile-page__input">
        <p v-else class="profile-page__text">{{ profile.favorite_weather || '-' }}</p>
      </label>
      <input v-if="edit" type="submit" value="Update" class="button profile-page__submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      edit: false,
      profile: {}
    }
  },
  async mounted () {
    this.profile = await this.$api.$get('/profile')
  },
  methods: {
    async updateProfile (event) {
      const name = event.target[0].value
      const nationality = event.target[1].value
      const favoriteWeather = event.target[2].value

      await this.$api.$put('/profile', {
        name,
        nationality,
        favorite_weather: favoriteWeather
      })

      this.edit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  cursor: pointer;
}

.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;

  &__title {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    font-weight: 500;
  }

  &__form {
    display: flex;
    flex-direction: column;
    margin: 1.5rem 0 0;
  }

  &__input-wrapper {
    display: block;
    width: 100%;
    margin: 0 0 1rem;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  &__label {
    color: gray;
    text-align: center;
  }

  &__text {
    font-size: 1.5rem;
    text-align: center;
  }

  &__submit {
    margin: 1rem 0 0;
    background-color: rgb(55, 55, 200);
    color: white;

    &:hover, &:active {
      background-color: rgb(33, 33, 151);
    }
  }

  &__action {
    margin: 1rem 0 0;
    background-color: rgb(255, 132, 0);
    color: white;
    font-size: 600;
    text-decoration: none;

    &:hover, &:active {
      background-color: rgb(177, 94, 4);
    }
  }
}
</style>
