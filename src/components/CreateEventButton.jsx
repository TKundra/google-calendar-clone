import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import plus from '../assets/plus.svg';

const CreateEventButton = () => {

  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button onClick={() => setShowEventModal(true)} className='border p-2 rounded-full flex items-center shadow-md hover:shadow-lg transition duration-200'>
        <img src={plus} alt="create event" className='w-7 h-7' />
        <span className='pl-3 pr-3'>Create</span>
    </button>
  )
};

export default CreateEventButton;