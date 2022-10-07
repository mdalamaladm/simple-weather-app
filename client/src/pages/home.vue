<template>
  <div>
    <h2>Welcome, {{ name }} to...</h2>
    <h1>Simple Weather App</h1>
    <div v-if="blocked">
      <p>
        Unfortunately, We cannot find your current location
      </p>
      <p>
        Instead, we will let you know about the weather in Jakarta, Indonesia:
      </p>
      {{ weather }}
    </div>
    <div v-else>
      <p>This is your current weather in your location</p>
      {{ weather }}
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
    console.log(profile)
    this.name = profile.name

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      console.log(lat, lon)

      if (lat && lon) {
        this.weather = await this.$api.$get('/weather', {
          params: {
            lat,
            lon
          }
        })
      } else {
        this.blocked = true

        this.weather = await this.$api.$get('/weather', {
          params: {
            lat: 6.2088,
            lon: 106.8456
          }
        })
      }
    })
  }
}
</script>

<style>

</style>
