import NavbarNav from '../components/NavbarNav'
import { Sidebar } from '../components/Sidebar'
import React from 'react'
import '../styles/sidebar.css'


const PrivateLayout = ({children}) => {
    return (
        <div>
            
            <div className="flex">
                <Sidebar/>
                <div className="content w-100">
                    <NavbarNav/>
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}

export default PrivateLayout;