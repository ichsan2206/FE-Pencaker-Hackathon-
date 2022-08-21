import React from 'react'
import NavbarUser from '../../commponent/Navbar/NavbarUser'
import { Outlet } from "react-router-dom"

export default function MidleUser() {
  return (
    <div>
            <NavbarUser />
        <div>
            <Outlet />
      </div>
    </div>
  )
}
