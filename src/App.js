import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from './context/GlobalContext';
import { getMonth } from './util';
import { CalendarHeader, Month, Sidebar, EventModal } from './components/index';

function App() {

  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const [month, setMonth] = useState(getMonth());

  useEffect(() => {
    setMonth(getMonth(monthIndex));
  }, [monthIndex]);
  
  return (
    <>
      {showEventModal && <EventModal />}
      <div className='h-screen flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={month} />
        </div>
      </div>
    </>
  );
}

export default App;
