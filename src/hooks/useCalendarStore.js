import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import { onAddNewEvent, onEditedEvent, onSetActiveEvent, onDeleteEvent, onLoadEvents } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {
 
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector( state => state.calendar)
    const { user } = useSelector( state => state.auth)
    
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            
            if(calendarEvent.id){
                //actualizando
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, { ...calendarEvent })
                dispatch( onEditedEvent( { ...calendarEvent, user } ) );
                return;
            }

            //creando
            const { data } = await calendarApi.post('/events/', { ...calendarEvent });
            dispatch( onAddNewEvent( { ...calendarEvent, id: data.evento.id, user } ) );
            
        } catch (err) {
            console.log(err);
            Swal.fire('Error al guardar', err.response.data.msg, 'error');
        }
        
    }

    const startDeletetingEvent = async() => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch( onDeleteEvent() )
            
        } catch (err) {
            console.log(err);
            Swal.fire('Error al eliminar', err.response.data.msg, 'error');
        }
    }

    const startLoadingEvent = async(id) => {

        try {
            const { data } = await calendarApi.get('/events/');
            const events = convertEventsToDateEvents( data.eventos );
                        
            dispatch( onLoadEvents( events ) );

        } catch (err) {
            console.log('Error cargando los Eventos');
            console.log(err);
        }
    }
    
    return ({
        //propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeletetingEvent,
        startLoadingEvent,
    })
}
