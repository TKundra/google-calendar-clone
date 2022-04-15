import React from 'react';
import { CreateEventButton, SmallCalendar, Label } from './index';

const Sidebar = () => {
  return (
    <div className='border p-5 w-64'>
      <CreateEventButton />
      <SmallCalendar />
      <Label />
    </div>
  )
}

export default Sidebar;