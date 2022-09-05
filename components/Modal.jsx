import React from 'react'
import { useEffect } from 'react'
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';


function Modal({ closeModal }) {
  return (
    <div className='modal-background' >
        <div className="modal-container">
            <div className="modal-close">
                <button className="modal-close-button" onClick={() => closeModal()}>
                    <AiOutlineClose size={25} />
                </button>
            </div>
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