import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

const labeledClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
const EventModal = () => {

  const {
    setShowEventModal,
    daySelected,
    dispatchEvents,
    selectedEvent
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? labeledClasses.find((lbl) => lbl === selectedEvent.label)
      : labeledClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(), // timestamp
      id: selectedEvent ? selectedEvent.id : Date.now()
    }

    if (selectedEvent) dispatchEvents({ type: "update", payload: calendarEvent });
    else dispatchEvents({ type: "push", payload: calendarEvent });

    setShowEventModal(false);
  }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <form className='bg-white rounded-lg shadow-2xl w-1/4'>

        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
          <span className='material-icons-outlined text-gray-400 cursor-pointer'>
            drag_handle
          </span>
          <div>
            {selectedEvent &&
              <button onClick={() => {
                dispatchEvents({type: "delete", payload: selectedEvent});
                setShowEventModal(false)
              }}>
                <span className='material-icons-outlined text-gray-400 cursor-pointer'>
                  delete
                </span>
              </button>}
            <button onClick={() => setShowEventModal(false)}>
              <span className='material-icons-outlined text-gray-400 cursor-pointer'>
                close
              </span>
            </button>
          </div>
        </header>

        <div className='p-3'>
          <div className='grid grid-cols-1/5 items-end gap-y-7'>

            <div></div>
            <input
              type="text" name="title" placeholder='add title'
              value={title} onChange={(e) => setTitle(e.target.value)}
              required className='border-0 pt-3 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:blue-500'
            />

            <span className='material-icons-outlined text-gray-400'>
              schedule
            </span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>

            <span className='material-icons-outlined text-gray-400'>
              segment
            </span>
            <input
              type="text" name="description" placeholder='add description'
              value={description} onChange={(e) => setDescription(e.target.value)}
              required className='border-0 pt-3 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:blue-500'
            />

            <span className='material-icons-outlined text-gray-400'>
              bookmark_border
            </span>
            <div className='flex gap-x-2'>
              {labeledClasses.map((labels, idx) => (
                <span onClick={() => setSelectedLabel(labels)} className={`bg-${labels}-400 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`} key={idx}>
                  {labels === selectedLabel && <span className='material-icons-outlined text-white text-sm'>
                    check
                  </span>}
                </span>
              ))}
            </div>

          </div>
        </div>

        <footer className='flex justify-end border-t p-3 mt-5'>
          <button onClick={handleSubmit} type='submit' className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'>
            Save
          </button>
        </footer>

      </form>
    </div>
  )
}

export default EventModal;