<template>
  <div>
    <h1>Simple Weather App</h1>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>
        <p>Name</p>
        <input type="text">
      </label>
      <label>
        <p>Username</p>
        <input type="text">
      </label>
      <label>
        <p>Password</p>
        <input type="text">
      </label>
      <input type="submit">
    </form>
    <NuxtLink to="/">
      Login
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  methods: {
    async register (event) {
      const name = event.target[0].value
      const username = event.target[1].value
      const password = event.target[2].value

      await this.$api.$post('/register', {
        name,
        username,
        password
      })

      this.$router.push('/')
    }
  }
}
</script>
