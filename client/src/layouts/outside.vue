<template>
  <div class="outside-layout">
    <div class="outside-layout__box">
      <h1 class="outside-layout__title">
        Simple Weather App
      </h1>
      <div class="outside-layout__content">
        <Nuxt />
      </div>
    </div>
    <TheMessage ref="Message" />
  </div>
</template>

<script>
export default {
  name: 'OutsideLayout',
  mounted () {
    this.$nuxt.$on('message', (text) => {
      this.$refs.Message?.show(text)
    })
  }
}
</script>

<style lang="scss" scoped>
.outside-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(255, 132, 0, 0.061);

  &__box {
    display: flex;
    flex-direction: column;
    width: 30rem;
    min-height: 30rem;
    padding: 2rem;
    background-color: white;
    border: solid 2px rgb(255, 132, 0);
    border-radius: 1rem;
  }

  &__title {
    flex: none;
    margin: 0 0 1rem;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }

  &__content {
    flex: 1 1 0;
  }
}
</style>
