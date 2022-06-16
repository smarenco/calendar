import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMenssages'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'


export const CalendarPage = () => {
  
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log('onDoubleClick', event);
    openDateModal();
  }

  const onSelectEvent = (event) => {
    setActiveEvent( event )
  }

  const onViewChanged = (valor) => {
    localStorage.setItem('lastView', valor);
    setLastView(valor);
  }

  return (
    <>

    <NavBar />

    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES}
      eventPropGetter={ eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChanged}
    />

    <CalendarModal />

    </>
  )
}
