import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { useLugarStore } from '../../hook';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { startLoadingLugar } from '../../store/lugares/thunks';
import { useDispatch } from 'react-redux';


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


export default function CustomizedTables({ datoBuscar, tipoBuscar }) {



  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { lugares, setActiveLugar, deleteLugar, setEditLugar, startCloseModal } = useLugarStore();

  const [count, setCount] = useState(5);

  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');

  const dataMostrar = lugares.slice(0, count);

  useEffect(() => {
    dispatch(startLoadingLugar());
  }, [lugares]);


  const onEditar = (row) => {
    lugares.map(lugar => {
      if (lugar.id !== row) {
        return
      } else {
        setActiveLugar(lugar)
        setEditLugar();
      }
    });
  }

  const handleEliminar = (row) => {
    lugares.map(lugar => {
      if (lugar.id !== row) {
        return
      } else {
        setActiveLugar(lugar)
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
            deleteLugar(lugar);
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

  const handleDetalle = (row) => {
    lugares.map(lugar => {
      if (lugar.id !== row) {
        return
      } else {
        setActiveLugar(lugar);
        navigate(`/detalle/${row}`, {
          replace: true
        });
      }
    });
  }


  function searchingTerm() {
    if (tipoBuscar === 'Todos') {
      return function (row) {
        return dataMostrar
      }
    }
    if (tipoBuscar === '') {
      return function (row) {
        return row.nombre.includes(datoBuscar)
      }
    } else {
      return function (row) {
        return row.tipo.includes(tipoBuscar)
      }
    }
  }

  return (
    <>
      <div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Disponible</StyledTableCell>
                <StyledTableCell align="center">Rango</StyledTableCell>
                <StyledTableCell align="center">Tipo</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataMostrar.filter(searchingTerm()).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.disponible}</StyledTableCell>
                  <StyledTableCell align="center">{row.rango}</StyledTableCell>
                  <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                  <StyledTableCell align="center">

                    <Button color="inherit" title="Detalles del lugar" onClick={() => handleDetalle(row.id)} >
                      <Visibility />
                    </Button>

                    <Button color="inherit" title="Edita el lugar" onClick={() => onEditar(row.id)}>
                      <Edit />
                    </Button>

                    <Button color="inherit" title="Elimina el lugar" onClick={() => handleEliminar(row.id)} >
                      <DeleteForever />
                    </Button>


                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={() => setCount(count + 5)} >Cargar mas</Button>
      </div>
    </>
  );
}
