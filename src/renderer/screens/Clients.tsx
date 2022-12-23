import { ActionIcon, Affix, Button, Dialog, Drawer, Group, Modal, Stack, TextInput, Text } from '@mantine/core';
// @ts-ignore
import { IconPlus, IconListNumbers } from '@tabler/icons';
import { motion } from 'framer-motion';
import RegisterClient from './RegisterClient';
import { useState } from 'react';
import { ClientsTable, testData } from './ClientsTable';
import { showNotification } from '@mantine/notifications';
function Clients() {
  const [opened, setOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogText, setDialogText] = useState('');
  return (
    <div>
      <ClientsTable data={window.db.getClients()} />

      <Affix position={{ bottom: 20, right: 20 }}>
        <Stack align={"center"}>
        <motion.div whileHover={{ scale: 1.1, rotate: 360 }}>
          <ActionIcon radius={'xl'} variant={'filled'} size={'xl'} onClick={() => setDialogOpened(!dialogOpened)}>
            <IconListNumbers />
          </ActionIcon>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: 360 }}>
          <ActionIcon radius={'xl'} variant={'filled'} size={'xl'} onClick={() => setOpened(!opened)}>
            <IconPlus />
          </ActionIcon>
        </motion.div>
        </Stack>
      </Affix>
      <Drawer position='right' opened={opened} onClose={() => setOpened(!opened)} size="xl">
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
          <TextInput value={dialogText} onChange={(e) => setDialogText(e.target.value)} placeholder="Lista" style={{ flex: 1 }} />
          <Button onClick={() => {
            try {
              window.db.createList(dialogText)
            } catch (error) {
              showNotification({
                title: 'Error',
                message: 'No se pudo crear la lista, ' + `${(error as Error).message}`,
                color: 'red',
              })
            }
            setDialogText('')
            setDialogOpened(false)
            }}>Subscribe</Button>
        </Group>
      </Dialog>
    </div>
  );
}

export default Clients;
