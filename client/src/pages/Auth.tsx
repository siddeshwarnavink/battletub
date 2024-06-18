import { type Component, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'

import styles from './Auth.module.scss'

const Auth: Component = () => {
  const [isLogin, setIsLogin] = createSignal(true)
  const toggleAuth = () => setIsLogin(prev => !prev)
  const [fields, setFields] = createStore({
    name: '',
    password: ''
  })

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault()

    let body = JSON.stringify({
      query: `
        query {
          authenticate(name: $name, password: $password) {
            token,
            expiresIn
          }
        }
      `,
      variables: { ...fields }
    })

    if (!isLogin) {
      body = JSON.stringify({
        query: `
          mutation {
            createPlayer(name: $name, password: $password) {
              name
            }
          }
        `,
        variables: { ...fields }
      })
    }

    const response = await fetch('http://localhost:8080/graphql', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body
    })
    const data = await response.json()
    console.log(data)
  }

  return (
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
    </div >
  )
}

export default Auth
