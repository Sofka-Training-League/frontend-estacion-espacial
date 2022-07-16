import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/sidebar.css'

export const Sidebar = () => {

    const styleSidebar = {
        color: "white",
        backgroundColor: "#0490C9 !important"
      };

    //AGREGAR RUTAS NUEVAS, SU NOMBRE E ICONO PARA EL SIDEBAR
    const routeSidebar = [
    {ruta:"/admin/usuarios", nombre:"Usuarios", icon:"fas fa-users"},
    {ruta:"/admin/tiposdenave", nombre:"Tipos de naves", icon:"fas fa-list"},
    {ruta:"/admin/naves", nombre:"Naves", icon:"fas fa-rocket"},
    {ruta:"/admin/datostecnicos", nombre:"Datos tecnicos", icon:"fas fa-database"},
    ]
    return (
        <div className='sidebar bg-primary color-white' style={styleSidebar}>
            <ul>
                {/* SE RENDERIZA CADA UNO DE LOS COMPONENTES DEL SIDEBAR */}
                {routeSidebar.map((item,index) => (
                    <SidebarRoute key={index} ruta={item.ruta} nombre={item.nombre} icon={item.icon}></SidebarRoute>
                    )
                )}
            </ul>
        </div>      
    )
}

// COMPONENTE NAVLINK PARA CADA COMPONENTE DEL SIDEBAR
const SidebarRoute = ({ruta,nombre,icon}) => {
    return(
        <li>
        <NavLink exact className='link text-dark w-100 py-2 px-3 rounded d-inline-block' to={ruta}><i className={`${icon} me-2`}></i>{nombre}</NavLink>
    </li> 
    )
}
