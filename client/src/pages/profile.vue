<template>
  <div>
    <NuxtLink to="/home">
      Home
    </NuxtLink>
    <p>
      Your Profile
    </p>
    <button v-if="edit" @click="edit = false">
      Cancel
    </button>
    <button v-else @click="edit = true">
      Edit
    </button>
    <form @submit.prevent="updateProfile">
      <label>
        <p>What's Your Name?</p>
        <input v-if="edit" v-model="profile.name" type="text">
        <p v-else>{{ profile.name || '-' }}</p>
      </label>
      <label>
        <p>Where Are You From?</p>
        <input v-if="edit" v-model="profile.nationality" type="text">
        <p v-else>{{ profile.nationality || '-' }}</p>
      </label>
      <label>
        <p>What's Your Favorite Weather?</p>
        <input v-if="edit" v-model="profile.favorite_weather" type="text">
        <p v-else>{{ profile.favorite_weather || '-' }}</p>
      </label>
      <input v-if="edit" type="submit">
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

<style>

</style>
