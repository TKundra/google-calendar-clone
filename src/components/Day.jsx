import dayjs from 'dayjs';
import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';

const Day = ({ day, rowIdx }) => {

    const { 
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent
    } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);

    useEffect(() => {
        // event.day - the valueOf we stored
        const events = filteredEvents.filter((event) => dayjs(event.day).format('DD-MM-YY') === day.format('DD-MM-YY'));
        setDayEvents(events);
    }, [filteredEvents, day]);

    function getCurrentClass() {
        const format = 'DD-MM-YYYY';
        let currentDay = day.format(format);
        let nowDay = dayjs().format(format);
        return currentDay === nowDay ? 'bg-blue-600 text-white rounded-full w-7' : '';
    }
    
    return (
        <div className='border border-gray-200 flex flex-col'>

            <header className='flex flex-col items-center'>
                {rowIdx === 0 &&
                    <p className='text-small mt-1'>
                        {day.format('ddd').toUpperCase()}
                    </p>
                }
                <p onClick={() => {
                    setDaySelected(day)
                    setShowEventModal(true)
                    }} className={`text-sm p-1 my-1 text-center cursor-pointer ${getCurrentClass()}`}>
                    {day.format('DD')}
                </p>
            </header>

            <div className='flex-1 cursor-pointer' onClick={()=>{
                setDaySelected(day)
                setShowEventModal(true) }}>
                {dayEvents.map((devnt, idx) => (
                    <div key={idx} onClick={() => setSelectedEvent(devnt)} className={`bg-${devnt.label}-400 p-1 mx-3 text-center text-white text-sm rounded mb-1 truncate`}>
                        {devnt.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Day;