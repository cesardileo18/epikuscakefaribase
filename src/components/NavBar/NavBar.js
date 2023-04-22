import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const NavBar = () => {
  const [categories, setCategories] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const categoriesRef = query(collection(db, 'categories'), orderBy('order'))

    getDocs(categoriesRef)
      .then(snapshot => {
          const categoriesAdapted = snapshot.docs.map(doc => {
            const data = doc.data()

            return { id: doc.id, ...data }
          })

          setCategories(categoriesAdapted)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <nav className="NavBar" >
        <Link to='/'>EpikusCake</Link>
        <div className="Categories">
            {
              categories.map(cat => {
                return (
                  <NavLink key={cat.id} to={`/category/${cat.slug}`} className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>{cat.label}</NavLink>
                )
              }) 
            }
        </div>
        {
          user ? (
            <CartWidget />
          ) : (
            <NavLink to='/login' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}>Login</NavLink>
          )
        }
    </nav>
  )
}

export default NavBar