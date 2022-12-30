import {
  ActionIcon,
  Affix,
  Button,
  Dialog,
  Drawer,
  Group,
  Modal,
  Stack,
  TextInput,
  Text,
} from '@mantine/core';
// @ts-ignore
import { IconPlus, IconListNumbers, IconTrash, IconPencil } from '@tabler/icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import RegisterClient from '../components/RegisterClient';
import { ClientsTable, testData } from '../components/ClientsTable';

function Clients() {
  const [opened, setOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [reload, setReload] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  useEffect(() => {
    return () => {};
  }, [dialogOpened]);

  return (
    <div>
      <ClientsTable
        editEnabled={isEditEnabled}
        data={window.db.getClients()}
        reloadSetter={setReload}
        reloadVal={reload}
      />

      <Affix position={{ bottom: 20, right: 20 }}>
        <Stack align="center">
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }}>
            <ActionIcon
              radius="xl"
              variant="filled"
              size="xl"
              color={isEditEnabled ? 'red' : 'gray'}
              onClick={() => setIsEditEnabled(!isEditEnabled)}
            >
              <IconPencil />
            </ActionIcon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }}>
            <ActionIcon
              radius="xl"
              variant="filled"
              size="xl"
              onClick={() => setDialogOpened(!dialogOpened)}
            >
              <IconListNumbers />
            </ActionIcon>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }}>
            <ActionIcon
              radius="xl"
              variant="filled"
              size="xl"
              onClick={() => setOpened(!opened)}
            >
              <IconPlus />
            </ActionIcon>
          </motion.div>
        </Stack>
      </Affix>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => setOpened(!opened)}
        size="xl"
      >
        <RegisterClient />
      </Drawer>
      <Dialog
        opened={dialogOpened}
        withCloseButton
        onClose={() => setDialogOpened(false)}
        size="lg"
        radius="md"
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          Ingresa el nombre de la lista
        </Text>

        <Group align="flex-end">
          <TextInput
            value={dialogText}
            onChange={(e) => setDialogText(e.target.value)}
            placeholder="Lista"
            style={{ flex: 1 }}
          />
          <Button
            onClick={() => {
              try {
                window.db.createList(dialogText);
              } catch (error) {
                showNotification({
                  title: 'Error',
                  message:
                    'No se pudo crear la lista, ' +
                    `${(error as Error).message}`,
                  color: 'red',
                });
              }
              setDialogText('');
              setDialogOpened(false);
            }}
          >
            Crear
          </Button>
          <Button
            color={'red'}
            onClick={() => {
              try {
                window.db.removeList(dialogText);
                setDialogText('');
              } catch (error) {
                showNotification({
                  title: 'Error',
                  message:
                    'No se pudo eliminar la lista, ' +
                    `${(error as Error).message}`,
                  color: 'red',
                });
              }
            }}
          >
            <IconTrash />
          </Button>
        </Group>
      </Dialog>
    </div>
  );
}

export default Clients;
