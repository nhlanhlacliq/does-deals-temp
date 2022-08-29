import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { mainColor } from '../utils/styles';

function MapModal({ closeModal, deal }) {
    const { lat, lng } = deal.restaurant.area.location;
    const hexMainColor = '0x' + mainColor.slice(1).toUpperCase();

    return (
        <div className='modal-background' >
            <div className="modal-container map-modal-container">
                <div className="modal-close">
                    <button className="modal-close-button" onClick={() => closeModal()}>
                        <AiOutlineClose size={25} />
                    </button>
                </div>
                <div className="modal-title map-modal-title">
                    {deal.restaurant.name}
                </div>
                <div className="modal-body">
                    <img 
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x350&markers=color:${hexMainColor}|label:${deal.restaurant.name.charAt(0)}|${lat},${lng}&key=AIzaSyDhgYqJh_AjhayFv58WXCYFa_8RK1LcWhk`}
                    />
                </div>
                <div className="modal-footer">
                    <a href={`http://maps.google.com/maps/place/${lat},${lng}`} >
                        <button className='confirm-button' onClick={() => closeModal()} >View on Map</button>
                    </a>
                    <button onClick={() => closeModal()} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default MapModal