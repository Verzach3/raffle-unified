import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  ActionIcon,
  Badge,
} from '@mantine/core';
// @ts-ignore
import { IconPencil, IconTrash } from '@tabler/icons';
import { Client } from 'types/Client';
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: Client[];
}

export function ClientsTable({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>
        <Group>
          {row.numbers.map((list) => (
            <Badge key={list.list}>{list.list}</Badge>
          ))}
        </Group>
      </td>
      <td>
        <Group>
          <ActionIcon
            variant="transparent"
            color="dark"
            onClick={() => {
              console.log(row.name);
            }}
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            color="red"
            onClick={() => {
              console.log(row.name);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Nombre</th>
            <th>Listas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export const testData = {
  data: [
    {
      name: 'Athena Weissnat',
      company: 'Little - Rippin',
      email: 'Elouise.Prohaska@yahoo.com',
    },
    {
      name: 'Deangelo Runolfsson',
      company: 'Greenfelder - Krajcik',
      email: 'Kadin_Trantow87@yahoo.com',
    },
    {
      name: 'Danny Carter',
      company: 'Kohler and Sons',
      email: 'Marina3@hotmail.com',
    },
    {
      name: 'Trace Tremblay PhD',
      company: 'Crona, Aufderhar and Senger',
      email: 'Antonina.Pouros@yahoo.com',
    },
    {
      name: 'Derek Dibbert',
      company: 'Gottlieb LLC',
      email: 'Abagail29@hotmail.com',
    },
    {
      name: 'Viola Bernhard',
      company: 'Funk, Rohan and Kreiger',
      email: 'Jamie23@hotmail.com',
    },
    {
      name: 'Austin Jacobi',
      company: 'Botsford - Corwin',
      email: 'Genesis42@yahoo.com',
    },
    {
      name: 'Hershel Mosciski',
      company: 'Okuneva, Farrell and Kilback',
      email: 'Idella.Stehr28@yahoo.com',
    },
    {
      name: 'Mylene Ebert',
      company: 'Kirlin and Sons',
      email: 'Hildegard17@hotmail.com',
    },
    {
      name: 'Lou Trantow',
      company: 'Parisian - Lemke',
      email: 'Hillard.Barrows1@hotmail.com',
    },
    {
      name: 'Dariana Weimann',
      company: 'Schowalter - Donnelly',
      email: 'Colleen80@gmail.com',
    },
    {
      name: 'Dr. Christy Herman',
      company: 'VonRueden - Labadie',
      email: 'Lilyan98@gmail.com',
    },
    {
      name: 'Katelin Schuster',
      company: 'Jacobson - Smitham',
      email: 'Erich_Brekke76@gmail.com',
    },
    {
      name: 'Melyna Macejkovic',
      company: 'Schuster LLC',
      email: 'Kylee4@yahoo.com',
    },
    {
      name: 'Pinkie Rice',
      company: 'Wolf, Trantow and Zulauf',
      email: 'Fiona.Kutch@hotmail.com',
    },
    {
      name: 'Brain Kreiger',
      company: 'Lueilwitz Group',
      email: 'Rico98@hotmail.com',
    },
    {
      name: 'Myrtice McGlynn',
      company: 'Feest, Beahan and Johnston',
      email: 'Julius_Tremblay29@hotmail.com',
    },
    {
      name: 'Chester Carter PhD',
      company: 'Gaylord - Labadie',
      email: 'Jensen_McKenzie@hotmail.com',
    },
    {
      name: 'Mrs. Ericka Bahringer',
      company: 'Conn and Sons',
      email: 'Lisandro56@hotmail.com',
    },
    {
      name: 'Korbin Buckridge Sr.',
      company: 'Mraz, Rolfson and Predovic',
      email: 'Leatha9@yahoo.com',
    },
    {
      name: 'Dr. Daisy Becker',
      company: 'Carter - Mueller',
      email: 'Keaton_Sanford27@gmail.com',
    },
    {
      name: 'Derrick Buckridge Sr.',
      company: "O'Reilly LLC",
      email: 'Kay83@yahoo.com',
    },
    {
      name: 'Ernie Hickle',
      company: "Terry, O'Reilly and Farrell",
      email: 'Americo.Leffler89@gmail.com',
    },
    {
      name: 'Jewell Littel',
      company: "O'Connell Group",
      email: 'Hester.Hettinger9@hotmail.com',
    },
    {
      name: 'Cyrus Howell',
      company: 'Windler, Yost and Fadel',
      email: 'Rick0@gmail.com',
    },
    {
      name: 'Dr. Orie Jast',
      company: 'Hilll - Pacocha',
      email: 'Anna56@hotmail.com',
    },
    {
      name: 'Luisa Murphy',
      company: 'Turner and Sons',
      email: 'Christine32@yahoo.com',
    },
    {
      name: 'Lea Witting',
      company: 'Hodkiewicz Inc',
      email: 'Ford_Kovacek4@yahoo.com',
    },
    {
      name: 'Kelli Runolfsson',
      company: "Feest - O'Hara",
      email: 'Dimitri87@yahoo.com',
    },
    {
      name: 'Brook Gaylord',
      company: 'Conn, Huel and Nader',
      email: 'Immanuel77@gmail.com',
    },
  ],
};