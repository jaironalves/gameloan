import { SponsorIcon } from 'icons'
import { SessionService } from 'services'

const identityGame = {
  icon: SponsorIcon,
  description: 'Autenticar',
}

const loginGame = {
  options: {
    useLogin: false,
    useEmail: true,
    useForgot: false,
    useForgotPath: '',
    useRegister: false,
    useRegisterPath: '',
  },
  stateAsPost: (state) => ({
    login: state.emailOrLogin,
    password: state.password
  }),
}

const useSessionOptions = () => {
  return {
    identity: identityGame,
    login: loginGame,
    session: new SessionService(),
  }
}

export { useSessionOptions }
