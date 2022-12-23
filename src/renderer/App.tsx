import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from '@mantine/notifications';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import AppShell from "./screens/AppShell";
import Clients from "./screens/Clients";
import MainScreen from "./screens/MainScreen";
import Print from "./screens/Print";
import Settings from "./screens/Settings";
import TemplateEditor from "./screens/TemplateEditor";

const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: '/', element: <MainScreen /> },
      { path: '/clients', element: <Clients /> },
      { path: '/print', element: <Print /> },
      { path: '/settings', element: <Settings /> },
      { path: '/editor', element: <TemplateEditor /> },
    ],
  }
])

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider position="top-right">
        <RouterProvider router={router} />
      </NotificationsProvider>
    </MantineProvider>
  );
}
