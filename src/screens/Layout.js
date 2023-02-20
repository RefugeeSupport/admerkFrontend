import React, { useContext } from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { userContext } from '../context/UserContext'

function Layout(props) {
    const { user } = useContext(userContext)
    return (
        <>
            {user ? <>

                <Navbar />
                {props.children}
                <Footer />
            </> :
                <span className='d-none'>
                    {window.location = window.location.origin + "/login"}
                </span>
                // <>
                //     <Navbar />
                //     {props.children}
                //     <Footer />
                // </>
            }
        </>
    )
}

export default Layout