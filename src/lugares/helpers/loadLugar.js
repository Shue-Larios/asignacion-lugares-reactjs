import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';


export const loadLugar = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');
    const collectionRef = collection(FirebaseDB, `${uid}/lugares_puntos/lugares/`);

    const docs = await getDocs(collectionRef);

    const lugares = [];
    docs.forEach(doc => {
        lugares.push({ id: doc.id, ...doc.data() });
    });
    return lugares;
}






