import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClikNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2),
            bgColor: '#fafafa',
            user: {
                id: '123',
                name: 'Santiago'
            }
        })
        openDateModal();
    }

    return (
        <button className='btn btn-primary fab' onClick={handleClikNew}>
            <i className='fas fa-plus'></i>
        </button>
    )
}
