export default function ({ route, redirect, $localStorage, $snackbar }) {
  const excluded = [
    'index',
    'registration'
  ]

  const token = $localStorage.get('token')

  if (!excluded.includes(route.name)) {
    if (!token) {
      redirect('/')
    }
  } else if (token) {
    redirect('/home')
  }
}
