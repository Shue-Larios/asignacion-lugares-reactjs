
import { Button, ListItem } from '@mui/material';
import { useState } from 'react';
import '../lugares/components/Buscar.css';
import CustomizedTables from '../lugares/components/CustomizedTables';
 

import { NavLink } from "react-router-dom"


export const Buscar = () => {

    const [inputValue, setInputValue] = useState('');
 
    const [typeOp, setTypeOp] = useState('');

    const onInputChange = ({ target }) => {
        setInputValue(target.value);
    }

    const captureType = (e) => {
        setInputValue('');
        setTypeOp(e.target.value);
    }

    const reiniciar = (e) => {
        setInputValue('');
        document.getElementById("firstSelect").getElementsByTagName('option')[0].selected = 'Todos'
        setTypeOp(e.target.value);
    }
    
    return (
        <>
            <form >
                <input className='inputBuscar'
                onClick={ reiniciar }
                    type="text"
                    placeholder="Buscar por nombre"
                    value={inputValue}
                    onChange={onInputChange}
                />
            </form>

            <div className='centro'>
                <div className="varios">
                    <form as="select" onChange={captureType}>
                    <select className='select' id="firstSelect">
                        <option value='Todos' >Tipo de Lugar</option>
                        <option value="Colonia">Colonia</option>
                        <option value="Inst. Gubernamental">Instituciones Gubernamentales</option>
                        <option value="Centro Educativo">Centro Educativo</option>
                        <option value="Centro Comercial">Centros Comerciales</option>
                    </select>
                    </form>
                   
                    <ListItem >
                        <Button variant="contained" title="Limpia los buscadores" onClick={reiniciar} >
                            Reiniciar
                        </Button>
                    </ListItem >
                    <ListItem >

                        <Button variant="contained" title="Google Maps">
                            <NavLink className='linkMaps' to="/maps">Google Maps </NavLink>
                        </Button>
                    </ListItem >
                </div>
            </div>
            <CustomizedTables datoBuscar={inputValue} tipoBuscar={typeOp} />
        </>

    )
}
