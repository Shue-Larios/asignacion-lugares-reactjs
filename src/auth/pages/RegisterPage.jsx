
import { Button, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hook';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import './Pages.css';


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


const registerFormFields = {
    email: "",
    password: "",
    repetPassword: "",
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'La contraseña debe de tener mas de 6 letras'],
    repetPassword: [(value) => value.length >= 6, 'La contraseña debe de tener mas de 6 letras'],
}

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    const [formSubmitted, setFormSubmitted] = useState(false);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const { formState, email, password, repetPassword, onInputChange, isFormValid,
        emailValid, passwordValid, repetPasswordValid
    } = useForm(registerFormFields, formValidations);

    const [shown, setShown] = useState();
    const interruptorMostrado = () => setShown(!shown);

    const registerSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;

        if (password !== repetPassword) {
            return Toast.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden'
            })
        }
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    if (!!errorMessage) {
        Toast.fire({
            icon: 'error',
            title: errorMessage
        })
    }

    return (

        <div className='principal'>

            <div className="centrar">
                <div className="titulo">
                    ¡Regístrate ahora!
                </div>
                <form onSubmit={registerSubmit} >

                    <p>Complete Los Campos Para Registrarse.</p>

                    <TextField name='email'
                        value={email}
                        onChange={onInputChange} label='Correo' type='text' fullWidth
                        error={!!emailValid && formSubmitted}
                        helperText={emailValid}
                    />

                    &nbsp;
                    <TextField name='password'
                        value={password}
                        onChange={onInputChange} label='Contraseña' type={shown ? 'text' : 'password'} fullWidth
                        error={!!passwordValid && formSubmitted}
                        helperText={passwordValid}
                    />

                    &nbsp;
                    <TextField name='repetPassword'
                        value={repetPassword}
                        onChange={onInputChange} label='Repita La Contraseña' type={shown ? 'text' : 'password'} fullWidth
                        error={!!repetPasswordValid && formSubmitted}
                        helperText={repetPasswordValid}
                    />

                    <div className="mostrar">
                        <input type="checkbox" id="check" onClick={interruptorMostrado} />
                        <label className=""> Mostrar Contraseña</label>
                    </div>


                    <div className="d-grid gap-2">
                        <Button
                            disabled={isCheckingAuthentication}
                            type="submit" variant="contained" fullWidth >
                            Registrarme
                        </Button>
                        <p>¿Ya tienes cuenta?  <NavLink className='link' to="/auth/login"> Inicia sesión. </NavLink> </p>

                    </div>
                </form>
            </div>
        </div>
    )
}




