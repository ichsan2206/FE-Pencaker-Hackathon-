import React from 'react'
import { Outlet } from "react-router-dom"
import NavbarCompany from '../../commponent/Navbar/NavbarCompany'

export default function MidleCompany() {
  return (
    <div>
        <NavbarCompany />
        <div>
            <Outlet />
        </div>
    </div>
  )
}
