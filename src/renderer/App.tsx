import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from '@mantine/notifications';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import AppShell from "./screens/AppShell";
import Clients from "./screens/Clients";
import MainScreen from "./screens/MainScreen";
import Settings from "./screens/Settings";

const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: '/', element: <MainScreen /> },
      { path: '/clients', element: <Clients /> },
      { path: '/settings', element: <Settings /> },
    ],
  }
])

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </MantineProvider>
  );
}
