import {  memo } from 'react' //useEffect, useState,
import { useParams } from 'react-router-dom'
// import { getProducts, getProductsByCategory } from "../../asyncMock"
import ItemList from '../ItemList/ItemList'
// import { getDocs, collection, query, where } from 'firebase/firestore'
// import { db } from '../../services/firebase/firebaseConfig'
import { getProducts } from '../../services/firebase/firestore/products'
import { useAsync } from '../../hooks/useAsync'

const ItemListMemo = memo(ItemList)

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams()
    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])
    // const [products, setProducts] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false)

    // useEffect(() => {
    //     setLoading(true)

    //     getProducts(categoryId)
    //         .then(products => {
    //             setProducts(products)
    //         })
    //         .catch(error => {
    //             setError(error)
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })

    //     const productsRef = categoryId 
    //         ? query(collection(db, 'products'), where('categories', '==', categoryId))
    //         : collection(db, 'products')
    //     getDocs(productsRef)
    //         .then(snapshot => {
    //             const productsAdapted = snapshot.docs.map(doc => {
    //                 const data = doc.data()
    //                 return { id: doc.id, ...data }
    //             })
    //             setProducts(productsAdapted)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
            
    //     // const asyncFunction = categoryId ? getProductsByCategory : getProducts

    //     // asyncFunction(categoryId)
    //     //     .then(products => {
    //     //         setProducts(products)
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //         setError(true)
    //     //     })
    //     //     .finally(() => {
    //     //         setLoading(false)
    //     //     })
    // }, [categoryId])
    // console.log('products :>> ', products.name);
    if(loading) {
        return <h1>Cargando...</h1>
    }

    if(error) {
        return <h1>Vuelva a cargar la pagina</h1>
    }
    const [{category}] = products
    return (
        <div>
            <h1>{greeting ? greeting : category ==='tortas'?greeting='Nuestras Tortas': 
            category ==='panes'?greeting='Nuestros Panes': 
            category ==='pasteleria'?greeting='Nuestra Pasteleria':''}</h1>
            <ItemListMemo products={products}/>
        </div>
    )
}

export default ItemListContainer