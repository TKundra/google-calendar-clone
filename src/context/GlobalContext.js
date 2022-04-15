import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},

  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},

  daySelected: null,
  setDaySelected: (index) => {},

  showEventModal: false,
  setShowEventModal: () => {},

  dispatchEvents: ({type, payload}) => {},
  savedEvents: [],

  selectedEvent: null,
  setSelectedEvent: () => {},

  setLabels: () => {},
  labels: [],
  
  updateLabel: () => {},
  filteredEvents: [],
});

export default GlobalContext;