<template>
  <div>
    <h1>Simple Weather App</h1>
    <h2>Login</h2>
    <form @submit.prevent="login">
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
    <NuxtLink to="/register">
      Register
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    async login (event) {
      const username = event.target[0].value
      const password = event.target[1].value

      const token = await this.$api.$post('/login', {
        username,
        password
      })

      this.$localStorage.set('token', token)

      this.$router.push('/home')
    }
  }
}
</script>
