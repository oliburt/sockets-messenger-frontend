import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import HomeContainer from '../containers/HomeContainer'


export const routes = [
  {
    title: 'Home',
    path: '/',
    component: HomeContainer
  },
  {
    title: 'Log in',
    path: '/login',
    component: LoginForm
  },
  {
    title: 'Sign up',
    path: '/signup',
    component: SignupForm
  },
  {
    title: 'Log out',
    path: '/logout',
    component: props => {
      props.logout()

      return null
    }
  }
]