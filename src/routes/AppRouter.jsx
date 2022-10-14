import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { useCheckAuth } from '../hook';
import { CheckingAuth } from '../interface/components/CheckingAuth';
import { DetallesPage, LugaresPage } from '../lugares';
import { MapsPage } from '../maps';


export const AppRouter = () => {

  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }


  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/*" element={<Navigate to='/auth/login' />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<LugaresPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/detalle/:id" element={<DetallesPage />} />
              <Route path="/*" element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>
  )
}



