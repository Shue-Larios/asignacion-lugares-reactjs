import { Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hook';
import { clearErrorMessage } from '../../store';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';
import './Pages.css';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const loginFormFields = {
  email: "",
  password: "",
}


export const LoginPage = () => {

  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector(state => state.auth);

  const { email, password, onInputChange, isFormValid } = useForm(loginFormFields);

  const [shown, setShown] = useState();
  const interruptorMostrado = () => setShown(!shown);


  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      return Toast.fire({
        icon: 'error',
        title: 'Debe llenar los campos'
      })
    }
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  useEffect(() => {
    if (!!errorMessage) {
      Toast.fire({
        icon: 'error',
        title: errorMessage
      })
      dispatch(clearErrorMessage());
    }
  }, [])





  return (
    <>
      <div className="principal">
        <div className="centrar">
          <div className="titulo">
            Bienvenido
          </div>
          <form onSubmit={onSubmit} >
            <p>Por favor, complete sus credenciales para iniciar sesión.</p>

            <TextField name='email'
              value={email}
              onChange={onInputChange} label='Correo' type='text' fullWidth />


            &nbsp;
            <TextField name='password'
              value={password}
              onChange={onInputChange} label='Contraseña' type={shown ? 'text' : 'password'} fullWidth />

            <div className="mostrar">
              <input type="checkbox" id="check" onClick={interruptorMostrado} />
              <label className=""> Mostrar Contraseña</label>
            </div>


            <div className="d-grid gap-2">
              <Button
                disabled={isAuthenticating}
                type="submit" variant="contained" fullWidth >
                Ingresar
              </Button>

              <p>¿No tienes una cuenta?  <NavLink className='link' to="/auth/register"> Regístrate ahora. </NavLink> </p>
            </div>
          </form>
        </div>
      </div>
    </>

  )





}



