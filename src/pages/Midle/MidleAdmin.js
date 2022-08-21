import React from 'react'
import { Outlet } from "react-router-dom"
import NavbarAdmin from '../../commponent/Navbar/NavbarAdmin'

export default function MidleAdmin() {
  return (
    <div>
        <NavbarAdmin />
        <div>
            <Outlet />
        </div>

    </div>
  )
}
