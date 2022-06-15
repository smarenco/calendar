import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        title: 'Evento',
        notes: ' notasss s s',
        start: new Date(),
        end: addHours( new Date(), 2),
        bgColor: '#fafafa',
        user: {
          _id: '123',
          name: 'Santiago'
        }
    };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
    }
})


//export const { onOpenDateModal, onCloseDateModal } = calendarSlice.actions;