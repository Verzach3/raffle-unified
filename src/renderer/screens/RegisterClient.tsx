import { Box, Button, Group, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
function RegisterClient() {
  const form = useForm({
    initialValues: {
      name: '',
      numbers: [],
    },
  });
  return (
    <div>
      <Box mx={'lg'}>
        <form
          onSubmit={form.onSubmit((values) => {
            try {
              window.db.addClient({
                id: '',
                name: values.name,
                numbers: values.numbers.map((key) => {
                  return { list: key, numbers: [] };
                }),

              });
              form.reset();
            } catch (error) {
              showNotification({
                title: 'Error',
                message:
                  'No se pudo crear el cliente, ' +
                  `${(error as Error).message}`,
                color: 'red',
              });
            }
          })}
        >
          <TextInput
            withAsterisk
            label="Nombre del Cliente"
            placeholder="Nombre"
            {...form.getInputProps('name')}
          />
          <MultiSelect
            data={window.db.getListKeys()}
            label="Selecione las listas de numeros"
            placeholder="Listas"
            searchable
            nothingFound="Nothing found"
            {...form.getInputProps('numbers')}
          />
          <Group position="right" mt={'md'}>
            <Button type="submit">Registrar</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default RegisterClient;
