import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useLugarStore } from '../../hook';
import { usePuntosStore } from '../../hook/usePuntosStore';
import { useParams } from 'react-router-dom';

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
    codigo: "",
    latitud: '',
    longitud: '',
    idLugar: '',
}



export const PuntosModal = () => {

    const { id } = useParams();
    const { lugares, setActiveLugar, activeLugar, setEditLugar } = useLugarStore();

    const { puntos } = usePuntosStore();

    const { activePunto, startSavingPunto, startCloseModal, editpuntos } = usePuntosStore();

    const [formValues, setformValues] = useState(initialForm);
    const [valuePuntos, setValuePuntos] = useState(lugares);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        if (activePunto !== null && editpuntos !== null) {
            setformValues({ ...activePunto })
            handleOpen();
        }
    }, [activePunto])

    const [formSubmitted, setformSubmitted] = useState(false)

    const onInputChange = ({ target }) => {

        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onSubmit = async (event) => {

        formValues.idLugar = activeLugar.id,
            event.preventDefault();

        setformSubmitted(true);
        if (formValues.codigo.length <= 0 ||
            formValues.latitud.length <= 0
            ||
            formValues.longitud.length <= 0

        ) return Toast.fire({
            icon: 'error',
            title: 'Debe llenar los campos',
            target: document.getElementById('form-modal')
        });

        startSavingPunto(formValues)

        handleClose();
        setformValues(initialForm);
    }

    const onClose = () => {
        handleClose();
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
                    onBackdropClick={onClose}
                    open={open}
                    onClose={onClose}>
                    <form onSubmit={onSubmit} id='form-modal'>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Puntos
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                <br />
                                <TextField name='codigo' label='Codigo' type='number' fullWidth
                                    value={
                                        formValues.codigo
                                    }
                                    onChange={onInputChange}
                                />
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                <TextField
                                    name='latitud' label='Latitud' min="-100" type='numeric' fullWidth
                                    value={formValues.latitud}
                                    onChange={onInputChange}
                                />
                            </Typography>
                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                <TextField name='longitud' label='Longitud' type='number' fullWidth
                                    value={formValues.longitud}
                                    onChange={onInputChange} />
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

