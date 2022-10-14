import React from 'react'
import { LugaresModal } from '../components/LugaresModal'
import '../components/Buscar.css';
import '../components/Buscar.css';
import { Buscar, NavBar } from '../../components';



export const LugaresPage = () => {

  const { inputValue } = Buscar();

  return (
    <>
      <NavBar />
      <div className="contenedor sombra">
        <h2>Lugares</h2>
        <Buscar />
        <LugaresModal />
      </div>
    </>
  )
}
