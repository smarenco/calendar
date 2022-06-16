import { useSelector, useDispatch } from "react-redux"
import { onAddNewEvent, onEditedEvent, onSetActiveEvent } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {
 
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar)
    
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //backend

        if(calendarEvent._id){
            //actualizando
            dispatch( onEditedEvent( { ...calendarEvent } ) );
        }else{
            //creando
            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) );
        }
    }
    
    return ({
        //propiedades
        activeEvent,
        events,

        //metodos
        setActiveEvent,
        startSavingEvent,

    })
}
