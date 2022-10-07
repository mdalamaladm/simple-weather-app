export default function ({ $axios, $localStorage, redirect }, inject) {
  // Create a custom axios instance

  const api = $axios.create({
    baseURL: '/api',
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  function requestHandler (config) {
    const bearerToken = $localStorage.get('token')

    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`
    }

    return config
  }

  function errorHandler (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      $localStorage.remove('token')
      redirect('/')
    }
  }

  api.onRequest(requestHandler)
  api.onError(errorHandler)

  // Inject to context as $api
  inject('api', api)
}
