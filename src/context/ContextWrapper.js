import React, {
    useState, useMemo, useEffect, useReducer
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((event) =>
                event.id === payload.id ? payload : event
            );
        case "delete":
            return state.filter((event) => event.id !== payload.id);
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

export default function ContextWrapper(props) {

    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);

    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);

    const [savedEvents, dispatchEvents] = useReducer(
        savedEventsReducer, [], initEvents
    );
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [labels, setLabels] = useState([]);

    const filteredEvents = useMemo(() => { // filter events on checked: true,false
        return savedEvents.filter((evt) =>
            labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label).includes(evt.label)
        );
    }, [savedEvents, labels]);

    useEffect(() => { // whenever events changes, saved to storage
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => { // extract labels
        setLabels((prevLables) => {
            return [...new Set(savedEvents.map((event) => event.label))].map((label) => {
                let currentLabel = prevLables.find(lbl => lbl.label === label);
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true
                }
            });
        });
    }, [savedEvents]);

    function updateLabel(label) { // update label,checked from Label.jsx
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

    useEffect(() => { // to sync large calendar with small calendar
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth])

    useEffect(() => { // cleaning
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    return (
        <GlobalContext.Provider value={{
            monthIndex, setMonthIndex,
            smallCalendarMonth, setSmallCalendarMonth,
            daySelected, setDaySelected,
            showEventModal, setShowEventModal,
            dispatchEvents, savedEvents,
            selectedEvent, setSelectedEvent,
            setLabels, labels, updateLabel,
            filteredEvents
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}