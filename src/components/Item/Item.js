import './Item.css'
import { Link, useNavigate } from 'react-router-dom'

const Item = ({id, name, img, price }) => {
// console.log('Item :>> ', id,name,img,price);
    // const navigate = useNavigate()

    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
            </section>           
            <footer className='ItemFooter'>
               <Link to={`/item/${id}`} className='Option'>Ver detalle</Link>
               {/* <button onClick={() => navigate('/item')} className='Option'>Ver detalle</button> */}
            </footer>
        </article>
    )
}

export default Item