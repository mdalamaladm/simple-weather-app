<template>
  <div class="register-page">
    <p class="register-page__title">
      Register
    </p>
    <form
      class="register-page__form"
      @submit.prevent="register"
    >
      <label class="register-page__input-wrapper">
        <p class="register-page__label">Name</p>
        <input type="text" class="register-page__input">
      </label>
      <label class="register-page__input-wrapper">
        <p class="register-page__label">Username</p>
        <input type="text" class="register-page__input">
      </label>
      <label class="register-page__input-wrapper">
        <p class="register-page__label">Password</p>
        <input type="password" class="register-page__input">
      </label>
      <input type="submit" value="Register" class="button register-page__submit">
    </form>
    <NuxtLink to="/" class="register-page__back">
      &lt; Back To Login
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'outside',
  methods: {
    async register (event) {
      try {
        const name = event.target[0].value
        const username = event.target[1].value
        const password = event.target[2].value

        await this.$api.$post('/register', {
          name,
          username,
          password
        })

        this.$nuxt.$emit('message', 'Account has been successfully registered')

        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      } catch {
        this.$nuxt.$emit('message', 'Something\'s wrong, pleas try again')
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

.register-page {
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

  &__back {
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
