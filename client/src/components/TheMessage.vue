<template>
  <div class="message__layout">
    <p
      v-for="(item, index) in items"
      :key="index"
      class="message"
    >
      {{ item.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TheMessage',
  data () {
    return {
      items: []
    }
  },
  methods: {
    show (text) {
      const id = Math.random()

      const timeout = setTimeout(() => {
        this.$set(this, 'items', this.items.filter(item => item.id !== id))
      }, 2000)

      this.items.push({
        id,
        text,
        timeout
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  align-items: center;
  max-width: 27rem;
  padding: 0.5rem;
  margin: 1rem;
  background-color: rgb(47, 47, 67);
  border-radius: 0.5rem;
  color: white;

  &__wrapper {
    flex: 1 1 0;
    min-width: 0;
    margin: 0 0.5rem;
    text-align: center;
    word-wrap: break-word;
  }

  &__layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 27rem;
    position: fixed;
    bottom: 3rem;
    left: calc(50vw - 13.5rem);
    z-index: 10000001;
  }
}
</style>
