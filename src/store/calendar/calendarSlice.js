import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
        _id: new Date().getTime(),
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
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onEditedEvent: ( state, { payload } ) => {
            console.log(payload)
            state.events = state.events.map((event) => {
                if(event._id === payload._id){
                    return payload;
                }
                return event;
            }
            );
            state.activeEvent = null;
        }
    }
})


export const { onSetActiveEvent, onAddNewEvent, onEditedEvent } = calendarSlice.actions;