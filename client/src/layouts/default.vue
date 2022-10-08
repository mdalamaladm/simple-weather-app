<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <NuxtLink class="default-layout__link" to="/profile">
        Profile
      </NuxtLink>
      <NuxtLink class="default-layout__link" to="/home">
        Home
      </NuxtLink>
      <NuxtLink class="default-layout__link" to="/" @click.native="logout">
        Logout
      </NuxtLink>
    </header>
    <Nuxt />
    <TheMessage ref="Message" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  mounted () {
    this.$nuxt.$on('message', (text) => {
      this.$refs.Message?.show(text)
    })
  },
  methods: {
    logout () {
      this.$cookiz.remove('token')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  &__header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    margin: 0 0 1rem;
  }

   &__link {
    margin: 0 1rem 0 0;
    color: rgb(255, 132, 0);
    font-size: 600;
    text-decoration: none;

    &:hover, &:active {
      color: rgb(177, 94, 4);
    }

    &:last-child {
      color: rgb(255, 0, 0);

      &:hover, &:active {
        color: rgb(140, 0, 0);
      }
    }
  }
}
</style>
