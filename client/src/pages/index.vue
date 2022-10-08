<template>
  <div class="login-page">
    <p class="login-page__title">
      Login
    </p>
    <form
      class="login-page__form"
      @submit.prevent="login"
    >
      <label class="login-page__input-wrapper">
        <p class="login-page__label">Username</p>
        <input type="text" class="login-page__input">
      </label>
      <label class="login-page__input-wrapper">
        <p class="login-page__label">Password</p>
        <input type="password" class="login-page__input">
      </label>
      <input type="submit" value="Login" class="button login-page__submit">
    </form>
    <NuxtLink to="/register" class="login-page__register">
      Create Account
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'outside',
  methods: {
    async login (event) {
      try {
        const username = event.target[0].value
        const password = event.target[1].value

        const token = await this.$api.$post('/login', {
          username,
          password
        })

        this.$cookiz.set('token', token)

        this.$nuxt.$emit('message', 'Login success')

        setTimeout(() => {
          this.$router.push('/home')
        }, 2000)
      } catch {
        this.$nuxt.$emit('message', 'Something\'s wrong, please try again')
      }
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

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__title {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__input-wrapper {
    display: block;
    width: 100%;
    margin: 0 0 1rem;
  }

  &__input {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  &__submit {
    margin: 1rem 0 0;
    background-color: rgb(55, 55, 200);
    color: white;

    &:hover, &:active {
      background-color: rgb(33, 33, 151);
    }
  }

  &__register {
    margin: 1rem 0 0;
    color: rgb(255, 132, 0);
    font-size: 600;
    text-decoration: none;

    &:hover, &:active {
      color: rgb(177, 94, 4);
    }
  }
}
</style>
