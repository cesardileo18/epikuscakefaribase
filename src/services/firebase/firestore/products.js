import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export const getProducts = (categoryId) => {
    const productsRef = categoryId 
    ? query(collection(db, 'products'), where('category', '==', categoryId))
    : collection(db, 'products')
    // console.log('productsRef :>> ', productsRef);
    return getDocs(productsRef)
        .then(snapshot => {
            const productsAdapted = snapshot.docs.map(doc => {
                const data = doc.data()
                // console.log('object :>> ', data);
                return { id: doc.id, ...data }
            })
            // console.log('productsAdapted :>> ', productsAdapted);
            return productsAdapted
        })
        .catch(error => {
            return error
        })
}
export const getProductsById = () => {

}