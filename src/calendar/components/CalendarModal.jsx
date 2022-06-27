import { addHours, differenceInSeconds } from 'date-fns';
import { set } from 'date-fns/esm';
import React, { useEffect, useMemo, useState } from 'react'
import DatePicker, { registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';
//import { useDispatch } from "react-redux"
import { useCalendarStore } from '../../hooks/useCalendarStore';


registerLocale('es', es)


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    //const dispatch = useDispatch();

    const [formSumited, setFormSumited] = useState(false);
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const [formValues, setFormValues] = useState({
        id: new Date().getTime(),
        title: 'Evento',
        notes: ' notasss s s',
        start: new Date(),
        end: addHours( new Date(), 2),
        bgColor: '#fafafa',
        user: {
          id: '123',
          name: 'Santiago'
        }
    })

    const titleClass = useMemo(() => {
       if(!formSumited) return '';

       return ( formValues.title.length > 0) ? '' : 'is-invalid';

    }, [formValues.title, formSumited]);

    useEffect(() => {
      if( activeEvent !== null){
        setFormValues({ ...activeEvent });
      }
    
    }, [activeEvent])
    

    const onInputChanged = ({ target }) => {
        setFormValues({ ...formValues, [target.name]: target.value});
    }

    const onDateChanged = (event, changing) => {
        setFormValues({ ...formValues, [changing]: event});
    }
    
    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        setFormSumited(true);

        const { start, end } = formValues;
        const difference = differenceInSeconds(end, start);
        if(isNaN(difference) || difference < 0){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if(formValues.title.length <= 0){
            return;
        }

        await startSavingEvent( formValues );
        closeDateModal();
        setFormSumited(false);

    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        selected={ formValues.start}
                        onChange={e => onDateChanged(e, 'start')}
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                        selected={ formValues.end}
                        onChange={e => onDateChanged(e, 'end')}
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
