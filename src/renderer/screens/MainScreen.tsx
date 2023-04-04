import { Badge, Button, Card, Center, Group, Text } from '@mantine/core';
// @ts-ignore
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
function MainScreen() {
  const [recentPrints, setRecentPrints] = useState<
    { day: string; pdfPath: string, createdAt: number }[]
  >([]);
  useEffect(() => {
    window.printApi.getRecentPrints().then((data) => {
      setRecentPrints(data ?? []);
    });
    return () => {};
  }, []);

  return (
    <div>
      <Text fz={"xl"} fw={500}>Impresiones Recientes</Text>
      {recentPrints.length !== 0 ?
      recentPrints.sort((a, b) => b.createdAt - a.createdAt).map((print) => (
        <Card key={nanoid()} shadow="sm" p={'lg'} radius={'md'} mt={"md"} withBorder onClick={() => {
          window.printApi.open(print.pdfPath)
        }}>
          <Center>
            <Group position="apart" mt="md" mb="xs" >
              <Text weight={500}>{print.day}</Text>
              {(print.pdfPath.includes("final") ?
                <Badge color="green">Completa</Badge>
              :
                <Badge color="blue">Incompleta</Badge>
              )}
            </Group>
          </Center>
        </Card>
      ))
    :
    <Center>
      <Text>No hay impresiones recientes</Text>
    </Center>
    }
    </div>
  );
}

export default MainScreen;
