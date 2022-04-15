import dayjs from 'dayjs';
import React, { useContext } from 'react';
import logo from '../assets/logo.png'
import GlobalContext from '../context/GlobalContext';

const CalendarHeader = () => {

    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    
    function handleToday() {
        setMonthIndex(dayjs().month());
    }
    function handlePrevMonth() {
        setMonthIndex(monthIndex-1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex+1);
    }

    return (
        <div className='px-4 py-2 flex items-center'>
            <img src={logo} alt="calendar" className='mr-2 h-12 w-12' />
            <h1 className='mr-10 text-xl text-gray-500 font-bold'>
                Calendar
            </h1>
            <button className='border rounded py-2 px-4 mr-5 hover:text-white hover:bg-blue-600 transition ease-in duration-200' onClick={handleToday}>Today</button>
            <button onClick={handlePrevMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_left
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                    chevron_right
                </span>
            </button>
            <h2 className='ml-4 text-xl text-gray-500 font-bold'>
                {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
            </h2>
        </div>
    )
}

export default CalendarHeader;