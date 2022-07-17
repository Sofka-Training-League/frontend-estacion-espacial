import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import React from 'react'
import Login from '../pages/Login';
// import Admin from 'pages/admin/Admin';
import { Home } from '../pages/Home';
import { PublicLayout } from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import { DatosTecnicos } from '../pages/DatosTecnicos';
import { Naves } from '../pages/Naves';
import { Usuarios } from '../pages/Usuarios';
import { Footer } from '../components/Footer';
import { Tipos } from '../pages/Tipos';

const RouterApp = () => {
    return (
        <Router>
            <Switch>
                {/* RUTAS PRIVADAS ADMIN */}
                <Route path={['/admin/tiposdenave', '/admin/naves', '/admin/datostecnicos', '/admin/usuarios']}>
                    <PrivateLayout>
                        <Switch>
                            <Route path='/admin/tiposdenave'>
                                <Tipos/>
                            </Route>    
                            <Route path='/admin/naves'>
                                <Naves/>
                            </Route>    
                            <Route path='/admin/datostecnicos'>
                                <DatosTecnicos/>
                            </Route>   
                            <Route path='/admin/usuarios'>
                                <Usuarios/>
                            </Route>
                        </Switch>
                    </PrivateLayout>
                </Route>
                {/* RUTAS DE AUTENTICACION (LOGIN-REGISTRO) */}
                <Route path={['/login']}>
                    <AuthLayout>
                        <Switch>
                            <Route path='/login'>
                                <Login/>
                            </Route>
                        </Switch>
                    </AuthLayout>
                </Route>
                {/* RUTAS PUBLICAS HOME */}
                <Route path={['/']}>
                    <PublicLayout>
                        <Switch>
                            <Route exact path='/'>
                                <Home/>
                            </Route>
                        </Switch>
                        <Footer></Footer>
                    </PublicLayout>
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterApp;
