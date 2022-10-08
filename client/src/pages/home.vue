<template>
  <div class="home-page">
    <h2 class="home-page__greeting">
      Welcome, {{ name }}, to...
    </h2>
    <h1 class="home-page__title">
      Simple Weather App
    </h1>
    <div class="home-page__tell-us-wrapper">
      <NuxtLink to="/profile" class="home-page__tell-us">
        Tell us more about you
      </NuxtLink>
    </div>
    <div v-if="blocked">
      <p class="home-page__info">
        Unfortunately, We cannot find your current location
      </p>
      <p class="home-page__info">
        Instead, we will let you know about the weather in Jakarta, Indonesia:
      </p>
    </div>
    <p v-else class="home-page__info">
      This is your current weather in your location:
    </p>
    <div class="home-page__weather">
      <div class="home-page__weather__main">
        <img
          :src="`https://openweathermap.org/img/wn/${weather.icon}@4x.png`"
          width="200"
          class="home-page__weather__icon"
        >
        <p class="home-page__weather__temp">
          {{ weather.temperature }}&deg;C
        </p>
      </div>
      <p class="home-page__weather__description">
        {{ weather.description }}
      </p>
    </div>
    <div class="home-page__attribution">
      <img src="/open-weather.png" alt="" width="80">
      <p>Weather data provided by <a href="https://openweathermap.org/" target="_blank" class="home-page__attribution-link">OpenWeather</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      name: '',
      blocked: false,
      weather: {}
    }
  },
  async mounted () {
    const profile = await this.$api.$get('/profile')
    this.name = profile.name

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        if (lat && lon) {
          this.weather = await this.getWeather(lat, lon)
        } else {
          this.blocked = true
          this.weather = await this.getWeather(6.2088, 106.8456)
        }
      },
      async () => {
        this.blocked = true
        this.weather = await this.getWeather(6.2088, 106.8456)
      }
    )
  },
  methods: {
    async getWeather (lat, lon) {
      const data = await this.$api.$get('/weather', {
        params: { lat, lon }
      })

      return {
        description: this.toSpacedPascal(data.weather[0]?.description),
        icon: data.weather[0]?.icon,
        temperature: data.main?.temp
      }
    },
    toSpacedPascal (val) {
      if (!val) { return '' }

      return val.split(' ').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  &__greeting {
    font-weight: 500;
    text-align: center;
  }

  &__title {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }

  &__attribution {
    display: flex;
    align-items: center;
  }

  &__tell-us-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
  }

  &__info {
    color: gray;
    text-align: center;
  }

  &__weather {
    margin: 0 0 3rem;

    &__main {
      display: flex;
      align-items: center;
    }

    &__temp {
      flex: none;
      padding: 2rem;
      font-size: 2.5rem;
      font-weight: 500;
      border-left: solid 1.5px black;
    }

    &__description {
      color: rgb(56, 56, 172);
      font-size: 2.5rem;
      text-align: center;
    }
  }

  &__attribution-link, &__tell-us {
    margin: 0 1rem 0 0;
    color: rgb(255, 132, 0);
    font-size: 600;
    text-decoration: none;

    &:hover, &:active {
      color: rgb(177, 94, 4);
    }
  }
}
</style>
