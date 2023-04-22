import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../services/firebase/firebaseConfig'
import { documentId, getDocs, query, collection, where, writeBatch, addDoc } from 'firebase/firestore'
import { useNotification } from '../../notification/NotificationService'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [loading, setLoading] = useState(false)
    const { cart, total, clearCart } = useContext(CartContext)
    const [buyer, setBuyer] = useState({
        Nombre:'',
        Email:'',
        Telefono:'',
        items: cart,
        total: total
    })
    const {Nombre, Email, Telefono} = buyer
        
    const handleInputChange = (e) => {
        setBuyer(({
            ...buyer,
            [e.target.name]:e.target.value
        }))
    }
    const { setNotification } = useNotification()
    const navigate = useNavigate()
    const handleConfirm = async (e) => {
        e.preventDefault()
        try{ 
            setLoading(true)
            // const objOrder = {
            //     buyer: {
            //         name: 'Sebastian Zuviria',
            //         phone: '123456789',
            //         address: 'mi direaccion 123'
            //     },
            //     items: cart,
            //     total: total
            // }
            const ids = cart.map(prod => prod.id)

            const productRef = query(collection(db, 'products'), where(documentId(), 'in', ids))

            const productsAddedFromFirestore = await getDocs(productRef)

            const { docs } = productsAddedFromFirestore

            const batch = writeBatch(db)
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                } else {
                    outOfStock.push({ id: doc, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, buyer)
                clearCart()
                setOrderId(orderAdded.id)

                setTimeout(() => {
                    navigate('/')
                }, 5000)

            } else {
                setNotification('error', 'Hay productos que no tienen stock disponible')
            } 
        } catch (error) {
            setNotification('error', 'Hubo un error generando la orden')
        } finally {
            setLoading(false)
        }
    }
    
    if(loading) {
        return <h1>SE esta generando su orden...</h1>
    }
    // console.log('buyer :>> ', buyer);
    return (
        <div>
            <h1>Checkout</h1>
            <h4>Completar Datos:</h4>
                <br />
                <form>
                    <input
                        type="text"
                        name="Nombre"
                        placeholder="Nombre"
                        value={Nombre}
                        onChange={handleInputChange}
                        required
                    />
                    <br />
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={Email}
                        onChange={handleInputChange}
                        required
                    />
                    <br />
                    <input
                        type="number"
                        name="Telefono"
                        placeholder="Telefono"
                        value={Telefono}
                        onChange={handleInputChange}
                        required
                    />
                    <br /><br />
                { orderId ? <h2>El id de su orden es: {orderId}</h2> : <button onClick={handleConfirm}>Generar orden</button> }
                </form>
        </div>
    )
}

export default Checkout