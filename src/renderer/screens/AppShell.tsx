import { AppShell as AP, Navbar } from "@mantine/core"
import { IconHome, IconUsers } from "@tabler/icons"
import React from 'react'
import { Outlet } from "react-router-dom"
import NavButton from "renderer/components/NavButton"

function AppShell() {
  return (
    <AP
      navbar=
      {<Navbar width={{ base: 300}} >
        <Navbar.Section grow>
          <NavButton icon={<IconHome/>} color="red" label="Main" to="/"/>
          <NavButton icon={<IconUsers/>} color="red" label="Clientes" to="/clients"/>
        </Navbar.Section>

      </Navbar>}
    >
      <Outlet />
    </AP>
    )
}

export default AppShell
