import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import { AuthContextProvider, UserContextProvider, AdminContextProvider, NewMessageContextProvider } from './context'
import 'uuid'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import Showtimes from './Showtimes.jsx'
import UpcomingFilms from './UpcomingFilms.jsx'
import Menu from './Menu.jsx'
import Polls from './Polls.jsx'
import Chat from './Chat.jsx'
import Protected from './protectedroute.jsx'
import Events from './Events.jsx'
import Profile from './Profile.jsx'


function Layout() {
  return (
    <>
      <Header />
        <div id='page-content'>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        element: <Protected />,
        children: [
          {
            path: '/',
            element: <App />
          },
          {
            path: '/showtimes',
            element: <Showtimes />
          },
          {
            path: '/upcomingfilms',
            element: <UpcomingFilms />
          },
          {
            path: '/menu',
            element: <Menu />
          },
          {
            path: 'polls',
            element: <Polls />
          },
          {
            path: 'chat',
            element: <Chat />
          },
          {
            path: 'events',
            element: <Events />
          },
          {
            path: '/profile',
            element: <Profile />
          }
        ]  
      },
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
    <AdminContextProvider>
      <UserContextProvider>
        <AuthContextProvider>
          <NewMessageContextProvider>
            <RouterProvider router={router} />
          </NewMessageContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </AdminContextProvider> 
)
