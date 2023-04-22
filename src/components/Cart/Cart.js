import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cart } = useContext(CartContext)
    console.log('cart :>> ', cart);

    return (
        <div>
            {cart.length>0 ?<><h1>Cart</h1>
            <div>
            {
                cart.map(prod => {
                    return (
                        <div key={prod.id}>
                            {prod.name}
                        </div>
                    )
                })
            }
            </div>
            <Link to='/checkout'><p>Finalizar compra</p></Link></>:'No tenes nada agregado al carrito'}
            
        </div>
    )
}

export default Cart