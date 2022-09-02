import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { mainColor } from '../utils/styles';
import { useWindowDimensions } from '../utils/hooks';

function MapModal({ closeModal, deal }) {
    const address = deal.restaurant.area.address;
    const hexMainColor = '0x' + mainColor.slice(1).toUpperCase();
    const mapUrl = `http://maps.google.com/maps/search/${address}`
    const { height, width } = useWindowDimensions();

    const mobile = width < 600 ? true : false;
    const { mapWidth, mapHeight } = {
        mapWidth: width < 600 ? 300 : 400,
        mapHeight: 350
    }

    return (
        <div className='modal-background' >
            <div className={`modal-container map-modal-container ${mobile && 'mobile'} `}>
                <div className="modal-title map-modal-title">
                    {deal.restaurant.name}
                </div>
                <div className="modal-body">
                    <a href={mapUrl} >
                        <img 
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=15&size=${mapWidth}x${mapHeight}&markers=color:${hexMainColor}|label:${deal.restaurant.name.charAt(0)}|${address}&region=ZA&key=AIzaSyDhgYqJh_AjhayFv58WXCYFa_8RK1LcWhk`}
                        />
                    </a>
                </div>
                <div className="modal-footer">
                    <a href={mapUrl} >
                        <button className='confirm-button' onClick={() => closeModal()} >View on Maps</button>
                    </a>
                    <button onClick={() => closeModal()} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default MapModal