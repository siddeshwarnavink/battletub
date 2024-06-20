import { createSignal, type JSX } from 'solid-js'

import Modal from '../components/UI/Modal'

type ReturnType = {
  error: boolean,
  setError: (message: string) => void,
  errorModal: JSX.Element,
  clearError: () => void
}

const useErrorModal = (): ReturnType => {
  const [error, setError] = createSignal<string | null>(null)

  const clearError = () => {
    setError(null)
  }

  const modal = (
    <Modal open={error() != null} onClose={() => setError(null)}>
      <p class="title">Error!</p>
      <p>{error()}</p>
      <menu class='dialog-menu'>
        <button onClick={() => setError(null)} class='nes-btn'>Close</button>
      </menu>
    </Modal>
  )

  return {
    error: error !== null,
    setError,
    errorModal: modal,
    clearError
  }
}

export default useErrorModal
