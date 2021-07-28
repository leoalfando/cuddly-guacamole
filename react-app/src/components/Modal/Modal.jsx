import './Modal.scss'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none"
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='close-btn' onClick={handleClose}>
          X
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
