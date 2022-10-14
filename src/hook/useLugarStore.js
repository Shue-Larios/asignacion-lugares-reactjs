import { useDispatch, useSelector } from 'react-redux';
import { onCloseModal, onSetActiveLugar, onSetEditLugar } from '../store';
import { startDeletingLugar, startNewLugar, startSaveLugar } from '../store/lugares/thunks';

export const useLugarStore = () => {

   const dispatch = useDispatch();

   const { lugares, activeLugar, editLugares } = useSelector(state => state.lugares);

   const setActiveLugar = (e) => {
      dispatch(onSetActiveLugar(e))
   }

   const setEditLugar = () => {
      dispatch(onSetEditLugar())
   }

   const startSavingLugar = async (data) => {
      if (data.id) {
         dispatch(startSaveLugar({ ...data }));
      } else {
         dispatch(startNewLugar(data));
      }
   }

   const startCloseModal = () => {
      dispatch(onCloseModal())
   }

   const deleteLugar = (data) => {
      dispatch(startDeletingLugar(data));
   }



   return {
      lugares,
      activeLugar,
      editLugares,
      setActiveLugar,
      startSavingLugar,
      startCloseModal,
      deleteLugar,
      setEditLugar
   }
}
