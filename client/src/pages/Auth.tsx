import { type Component, createSignal, Show } from 'solid-js'
import { createStore } from 'solid-js/store'

import Modal from '../components/UI/Modal'
import styles from './Auth.module.scss'

const Auth: Component = () => {
  const [isLogin, setIsLogin] = createSignal(true)
  const [error, setError] = createSignal<string | null>(null)
  const toggleAuth = () => setIsLogin(prev => !prev)
  const [fields, setFields] = createStore({
    name: '',
    password: ''
  })

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault()

    let body = JSON.stringify({
      query: `
        query Auth($name: String!, $password: String!) {
          authenticate(name: $name, password: $password) {
            token,
            expiresIn
          }
        }
      `,
      variables: {
        name: fields.name,
        password: fields.password
      }
    })

    if (!isLogin) {
      body = JSON.stringify({
        query: `
          mutation CreatePlayer($name: String!, $password: String!) {
            createPlayer(name: $name, password: $password) {
              name
            }
          }
        `,
        variables: {
          name: fields.name,
          password: fields.password
        }
      })
    }

    try {
      const response = await fetch('http://localhost:8080/graphql', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body
      })
      const data = await response.json()

      if (data.errors) {
        throw new Error(data.errors[0].message)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      <Modal open={error() != null} onClose={() => setError(null)}>
        <p class="title">Error!</p>
        <p>{error()}</p>
        <menu class='dialog-menu'>
          <button onClick={() => setError(null)} class='nes-btn'>Close</button>
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
