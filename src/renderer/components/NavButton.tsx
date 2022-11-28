import { UnstyledButton, Group, ThemeIcon, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

function NavButton({ icon, color, label, to }: MainLinkProps) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: 0,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant={'light'} size={'xl'}>
            {icon}
          </ThemeIcon>

          <Text size="md">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

export default NavButton;
