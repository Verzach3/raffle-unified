import { AppShell as AP, Navbar } from '@mantine/core';
// @ts-ignore
import {
  IconHome,
  IconPrinter,
  IconSettings,
  IconTicket,
  IconUsers,
} from '@tabler/icons';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavButton from 'renderer/components/NavButton';

function AppShell() {
  return (
    <AP
      navbar={
        <Navbar width={{ base: 300 }}>
          <Navbar.Section grow>
            <NavButton icon={<IconHome />} color="red" label="Main" to="/" />
            <NavButton
              icon={<IconPrinter />}
              color="red"
              label="Imprimir"
              to="/print"
            />
            <NavButton
              icon={<IconTicket />}
              color="red"
              label="Editor"
              to="/editor"
            />
            <NavButton
              icon={<IconUsers />}
              color="red"
              label="Clientes"
              to="/clients"
            />
            <NavButton
              icon={<IconSettings />}
              color="red"
              label="Ajustes"
              to="/settings"
            />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AP>
  );
}

export default AppShell;
