import React from 'react'
import { useEffect } from 'react'


function Modal({ closeModal }) {
  return (
    <div className='modal-background' >
        <div className="modal-container">
            <button className="modal-close" onClick={() => closeModal()}> X </button>
            <div className="modal-title">
                Sorry. This isn't implemented yet...
            </div>
            <div className="modal-body">
                <p>The feature will be awesome though!</p>
            </div>
            <div className="modal-footer">
                <button onClick={() => closeModal()} >Close</button>
            </div>
        </div>
    </div>
  )
}

export default Modal