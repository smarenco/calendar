import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FabDelete = () => {

    const { startDeletetingEvent, hasEventSelected } = useCalendarStore();
    
    const handleDeleteEvent = () => {
        startDeletetingEvent();
    }
    
    return (
        <button style={{ display: hasEventSelected ? '' : 'none'} } className='btn btn-danger fab-danger' onClick={handleDeleteEvent}>
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}
