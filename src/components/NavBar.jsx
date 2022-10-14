
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";


import Swal from "sweetalert2";
import { Logout } from "@mui/icons-material";
import { startLogout } from "../store/auth/thunks";
import { useDispatch } from "react-redux";

export const NavBar = () => {

  const dispatch = useDispatch();

  const logout = () => {
    Swal.fire({
      title: 'Estas seguro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0062cc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startLogout());
      }
    })
  }



  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Lugares y Puntos
            </Typography>
            <Button color="inherit" onClick={logout} >Cerrar sesion
              &nbsp;
              <Logout />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}


