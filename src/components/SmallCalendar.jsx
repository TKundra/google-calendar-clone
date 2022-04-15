import dayjs from 'dayjs';
import React, { useEffect, useState, useContext } from 'react';
import { getMonth } from '../util';
import GlobalContext from '../context/GlobalContext';

const SmallCalendar = () => {

    const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } = useContext(GlobalContext);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
    const [currentMonth, setcurrentMonth] = useState(getMonth());

    useEffect(() => { // locally
        setcurrentMonth(getMonth(currentMonthIndex));
    }, [currentMonthIndex])

    useEffect(() => { // updated by big calendar
        setCurrentMonthIndex(monthIndex);
    }, [monthIndex])

    function getCurrentClass(day) {
        const format ='DD-MM-YY';
        const currentDay = day.format(format);
        const nowDay = dayjs().format(format);
        const selected = daySelected && daySelected.format(format);
        if (currentDay === nowDay)
            return 'bg-blue-600 text-white rounded-full w-7'
        else if (currentDay === selected)
            return 'bg-blue-100 rounded-full font-bold'
        else 
            return ''
    }

    function handlePrevMonth() {
        setCurrentMonthIndex(currentMonthIndex-1);
    }
    function handleNextMonth() {
        setCurrentMonthIndex(currentMonthIndex+1);
    }

    return (
        <div className='mt-9'>
            <header className='flex justify-between'>
                <p className='text-gray-500 font-bold'>
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format('MMMM YYYY')}
                </p>
                <div>
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
                </div>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {currentMonth[0].map((day, idx) => (
                    <span key={idx} className='text-sm py-1 text-center'>
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, idx) => (
                    <React.Fragment key={idx}>
                        {row.map((day, idxx) => (
                            <button className={`py-1 w-full ${getCurrentClass(day)}`} 
                            onClick={()=>{
                                setSmallCalendarMonth(currentMonthIndex)
                                setDaySelected(day)
                            }} 
                            key={idxx}>
                                <span className='text-sm'>
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default SmallCalendar;