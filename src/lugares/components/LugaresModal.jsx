import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useLugarStore } from '../../hook';
import { useDispatch } from 'react-redux';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const FilDisponible = [
    { label: '' },
    { label: 'Disponible' },
    { label: 'No Disponible' },
];

const FilTipo = [
    { label: '' },
    { label: 'Colonia' },
    { label: 'Inst. Gubernamental' },
    { label: 'Centro Educativo' },
    { label: 'Centro Comerciales' },
];


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const initialForm = {
    nombre: '',
    disponible: '',
    rango: '',
    tipo: ''
}

export const LugaresModal = () => {
    const dispatch = useDispatch();

    const { activeLugar, startSavingLugar, startCloseModal, editLugares } = useLugarStore();
    const [formSubmitted, setformSubmitted] = useState(false)

    const [valueDis, setValueDis] = useState(FilDisponible[0]);
     const [valueTipo, setValueTipo] = useState(FilTipo[0]);

    const [formValues, setformValues] = useState(initialForm);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (activeLugar !== null && editLugares !== null) {
            setformValues({ ...activeLugar })
            handleOpen();
        }
    }, [activeLugar])





    // cuando el formulario se bloquea y no deja escribir hacemos esto
    const onInputChange = ({ target }) => {

        // este es el cambio del formulario en useState
        setformValues({
            // para solo sobrescribir el q tenga el valor del target
            ...formValues,
            [target.name]: target.value
        })
    }

    // para manejar el posteo del formulario
    const onSubmit = async (event) => {
        formValues.disponible = valueDis.label
        formValues.tipo = valueTipo.label


        // detenemos la propagacion del formulario
        event.preventDefault();
        // console.log(formValues);
        // aca cuando se intento hacer el posteo del formulario
        setformSubmitted(true);
        // para no permitir que la fecha final sea menor a la inicial

        //  si en el titulo no escribo nada evita q se mande el formulario
        if (formValues.nombre.length <= 0 ||
            formValues.disponible.length <= 0
            ||
            formValues.rango.length <= 0 ||
            formValues.tipo.length <= 0

        ) return Toast.fire({
            // showCancelButton: true,
            //showConfirmButton: true, // para mostrar un boton por si es necesario sino usar las otras alertas
            icon: 'error',
            title: 'Debe llenar los campos',
            // para poner la alerta enfrente del modal form-modal es el id del modal
            target: document.getElementById('form-modal')
        });



        // caso contrario si todo esta bien
        startSavingLugar(formValues)






        // TODO
        // await startSavingEvent(formValues)
        // cerrar modal
        handleClose();
        setformValues(initialForm);
        setValueDis(FilDisponible[0]);
        setValueTipo(FilTipo[0]);
        // // Remover errores en pantalla
        // setformSubmitted(false);
        // form-modal.reset();

    }

    const onClose = () => {
        handleClose();
        // setformValues({ ...formValues })
        startCloseModal();
        setformValues(initialForm);
    }


    return (

        <>

            <div>
                <a onClick={handleOpen} className="btn-flotante">
                    <Add />
                </a>


                <Modal
                    onBackdropClick={onClose} // evita q se cierre el modal con dar clic fuera d el      
                    open={open}
                    onClose={onClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
                >
                    <form onSubmit={onSubmit} id='form-modal'>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Lugares
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                <br />
                                <TextField name='nombre' label='Nombre' type='text' fullWidth
                                    value={
                                        formValues.nombre
                                    }
                                    onChange={onInputChange}
                                />
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                {/* <TextField name='disponible' label='Disponible' type='option' fullWidth
                                    value={formValues.disponible}
                                    onChange={onInputChange}
                                /> */}

                                <Autocomplete
                                    value={valueDis}
                                    onChange={(event, newValue) => {
                                        setValueDis(newValue);
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={FilDisponible}
                                    renderInput={(params) => <TextField {...params} label="Disponiblilidad" />}
                                />





                            </Typography>
                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                <TextField name='rango' label='Rango' placeholder='Rango en metros' type='text' fullWidth
                                    value={formValues.rango}
                                    onChange={onInputChange} />
                            </Typography>
                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                {/* <TextField name='tipo' label='Tipo lugar' type='text' fullWidth
                                    value={formValues.tipo}
                                    onChange={onInputChange} />   */}


                                {/* probando tipos */}
                                <Autocomplete
                                    // value={valueTipo}
                                    onChange={(event, newValue) => {
                                        setValueTipo(newValue);
                                    }}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={FilTipo}
                                    renderInput={(params) => <TextField {...params} label="Tipo" />}
                                />



                            </Typography>



                            <div align='right'>
                                <Button color='primary' type='submit' >Guardar

                                </Button>

                                <Button color='error' onClick={onClose} >
                                    Cancelar

                                </Button>

                            </div>
                        </Box>


                    </form>
                </Modal>





            </div>

        </>

    )
}

