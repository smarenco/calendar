import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMenssages'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'
import { useEffect } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'


export const CalendarPage = () => {
  
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');  

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEVent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEVent ? '#347CF7' : '#465660',
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

  useEffect(() => {
    startLoadingEvent();
  }, [])

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
    <FabAddNew />
    <FabDelete />

    </>
  )
}
