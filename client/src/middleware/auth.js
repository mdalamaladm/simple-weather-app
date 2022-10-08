export default function ({ route, redirect, $cookiz }) {
  const excluded = [
    'index',
    'register'
  ]

  const token = $cookiz.get('token')

  if (!excluded.includes(route.name)) {
    if (!token) {
      redirect('/')
    }
  } else if (token) {
    redirect('/home')
  }
}
