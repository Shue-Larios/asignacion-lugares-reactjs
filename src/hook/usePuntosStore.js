import { useDispatch, useSelector } from 'react-redux';
import { setCloseModal, onSetActivePunto, onSetEditPunto } from '../store/puntos/puntosSlice';
import { startDeletingPunto, startNewPunto, startSavePunto } from '../store/puntos/thunks';


export const usePuntosStore = () => {

   const dispatch = useDispatch();

   const { puntos, activePunto, editpuntos } = useSelector(state => state.puntos);

   const setActivePunto = (e) => {
      dispatch(onSetActivePunto(e))
   }

   const setEditPunto = () => {
      dispatch(onSetEditPunto())
   }

   const startSavingPunto = async (data) => {
      if (data.id) {
         dispatch(startSavePunto({...data}));           
      } else {
         dispatch(startNewPunto(data));
      }

   }

   const startCloseModal = () => {
      dispatch(setCloseModal())
   }

   const deletePunto = (data) => {
      dispatch(startDeletingPunto(data));
   }



   return {
      puntos,
      activePunto,
      editpuntos,
      setActivePunto,
      startSavingPunto,
      startCloseModal,
      deletePunto,
      setEditPunto
   }
}
