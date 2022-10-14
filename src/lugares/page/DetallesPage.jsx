import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { DeleteForever, Edit, Reply } from '@mui/icons-material';
import { useLugarStore } from '../../hook';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavBar } from '../../components';
import { PuntosModal } from '../../puntos/components/PuntosModal';
import { usePuntosStore } from '../../hook/usePuntosStore';
import { startLoadingPunto } from '../../store/puntos/thunks';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const DetallesPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();


  const { startCloseModal } = useLugarStore();

  const { activeLugar, editLugares } = useSelector(state => state.lugares);

  const { puntos, setActivePunto, setEditPunto, deletePunto } = usePuntosStore();

  useEffect(() => {
    dispatch(startLoadingPunto());
  }, [puntos]);


  const onEditar = (row) => {
    puntos.map(punto => {
      if (punto.id !== row) {
        return
      } else {
        setActivePunto(punto)
        setEditPunto();
      }
    });
  }

  const handleEliminar = (row) => {
    puntos.map(punto => {
      if (punto.id !== row) {
        return
      } else {
        setActivePunto(punto);
        Swal.fire({
          title: '¿Estas seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, bórralo!',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            deletePunto(punto)
            Swal.fire(
              '¡Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            )
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            startCloseModal()
          }

        })
      }
    });

  }

  useEffect(() => {
    if (id != activeLugar?.id) {
      navigate('/auth/', {
        replace: true
      });
    }
  }, [])


  const handleAtras = () => {
    startCloseModal()
    navigate('/');
  }

  return (
    <>
      <NavBar />
      <div className="contenedor sombra">
        <div className='titlePrincipal'>
          <div className="back">
            <Button color="inherit" title="Atras" onClick={handleAtras}>
              <Reply />
            </Button>
          </div>
          <div className="tittle">
            <h2>Detalles</h2>
          </div>
        </div>

        <div className="centro">
          <div className="varios">
            <h4> Nombre: {activeLugar?.nombre} </h4>
            <h4> Tipo: {activeLugar?.tipo} </h4>
            <h4> Estado: {activeLugar?.disponible} </h4>
            <h4> Rango: {activeLugar?.rango} </h4>
          </div>

          <div className="detalles">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Codigo</StyledTableCell>
                    <StyledTableCell align="center">Latitud</StyledTableCell>
                    <StyledTableCell align="center">Longitud</StyledTableCell>
                    <StyledTableCell align="center">Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {puntos.filter(punto => punto.idLugar == id).map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{row.codigo}</StyledTableCell>
                      <StyledTableCell align="center">{row.latitud}</StyledTableCell>
                      <StyledTableCell align="center">{row.longitud}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button color="inherit" title="Edita el punto" onClick={() => onEditar(row.id)}>
                          <Edit />
                        </Button>

                        <Button color="inherit" title="Elimina el punto" onClick={() => handleEliminar(row.id)} >
                          <DeleteForever />
                        </Button>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <PuntosModal />

    </>
  )
}
