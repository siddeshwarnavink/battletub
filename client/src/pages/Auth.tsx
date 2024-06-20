import { useNavigate } from '@solidjs/router'
import { type Component, createSignal, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import Modal from '../components/UI/Modal'
import AuthContext from '../context/Auth'
import useErrorModal from '../hooks/useErrorModal'
import graphqlService, { GraphqlParams } from '../services/graphql'
import styles from './Auth.module.scss'

const Auth: Component = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = createSignal(true)
  const [message, setMessage] = createSignal<string | null>(null)
  const [fields, setFields] = createStore({
    name: '',
    password: ''
  })
  const authCtx = useContext(AuthContext)
  const { setError, errorModal } = useErrorModal()
  const toggleAuth = () => setIsLogin(prev => !prev)

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault()

    const body: GraphqlParams = {
      query: `
        query Auth($name: String!, $password: String!) {
          authenticate(name: $name, password: $password) {
            token,
            player {
              id,
              name,
              score
            }
          }
        }
      `,
      variables: {
        name: fields.name,
        password: fields.password
      }
    }

    if (!isLogin()) {
      body.query = `
        mutation CreatePlayer($name: String!, $password: String!) {
          createPlayer(name: $name, password: $password) {
            name,
            score
          }
        }
      `
    }

    try {
      const data = await graphqlService(body)
      if (data.errors)
        throw new Error(data.errors[0].message)

      if (!isLogin()) {
        setMessage('Account created. Now you can login')
        setFields('name', '')
        setFields('password', '')
        setIsLogin(true)
      }
      else {
        const token: string = data.data.authenticate.token
        localStorage.setItem('token', token)
        authCtx?.setToken(token)
        authCtx?.setProfile(data.data.authenticate.player)
        navigate('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      {errorModal}
      <Modal open={message() != null} onClose={() => setMessage(null)}>
        <p class="title">Message</p>
        <p>{message()}</p>
        <menu class='dialog-menu'>
          <button onClick={() => setMessage(null)} class='nes-btn'>Close</button>
        </menu>
      </Modal>
      <div class={styles.wrapper}>
        <div class={`nes-container with-title  ${styles.container}`}>
          {isLogin() ? <h3 class='title'>Login</h3> : <h3 class='title'>Create an account</h3>}
          <form onSubmit={handleSubmit}>
            <div class={`nes-field ${styles.field}`}>
              <label>Name</label>
              <input
                class='nes-input'
                value={fields.name}
                onInput={event => setFields('name', event.target.value)}
              />
            </div>
            <div class={`nes-field ${styles.field}`}>
              <label>Password</label>
              <input
                class='nes-input'
                type='password'
                value={fields.password}
                onInput={event => setFields('password', event.target.value)}
              />
            </div>
            <button type='submit' class='nes-btn is-primary'>
              {isLogin() ? 'Login' : 'Create'}
            </button>
            <span class='nes-text is-primary' onClick={toggleAuth}>
              {isLogin() ? 'Create an Account' : 'Login instead'}
            </span>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
