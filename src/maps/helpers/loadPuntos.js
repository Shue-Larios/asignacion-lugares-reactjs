import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';


export const loadPuntos = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');
    const collectionRef = collection(FirebaseDB, `${uid}/lugares_puntos/puntos/`);

    const docs = await getDocs(collectionRef);

    const puntos = [];
    docs.forEach(doc => {
        puntos.push({ id: doc.id, ...doc.data() });

    });
    return puntos;
}






