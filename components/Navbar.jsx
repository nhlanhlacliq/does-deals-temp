import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { Modal } from '../components';
import { useState } from 'react';

const Navbar = () => {
  const [ modalOpen, setModalOpen ] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div className='navbar-container' >
      <p className='logo' >
        <Link href='/' > Doesdeals </Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => toggleModal()} >
        <AiOutlineUser />
      </button>

      {modalOpen && <Modal closeModal={() => toggleModal()}/>}

    </div>
  )
}

export default Navbar