import { type Component, createEffect, type JSX } from 'solid-js'

interface ModalProps {
  open: boolean,
  onClose: () => void,
  children: JSX.Element
}

const Modal: Component<ModalProps> = (props) => {
  let dialog: HTMLDialogElement

  createEffect(() => {
    if (props.open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  })

  return (
    <dialog ref={el => dialog = el} class="nes-dialog" onClose={props.onClose}>
      {props.children}
    </dialog>
  )
}

export default Modal
