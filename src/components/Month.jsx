import React from 'react';
import { Day } from './index';

const Month = ({ month }) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5'>
        {month.map((row, idx) => (
            <React.Fragment key={idx}>
                {row.map((day, idxx) => (
                    <Day day={day} key={idxx} rowIdx={idx} />
                ))}
            </React.Fragment>
        ))}
    </div>
  )
}

export default Month;