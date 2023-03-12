import { Badge, Card, Center, Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
function MainScreen() {
  const [recentPrints, setRecentPrints] = useState<
    { day: string; pdfPath: string }[]
  >([]);
  useEffect(() => {
    window.printApi.getRecentPrints().then((data) => {
      setRecentPrints(data);
    });
    return () => {};
  }, []);

  return (
    <div>
      <Text fz={"xl"} fw={500}>Impresiones Recientes</Text>
      {recentPrints.map((print) => (
        <Card shadow="sm" p={'lg'} radius={'md'} mt={"md"} withBorder>
          <Center>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{print.day}</Text>
            </Group>
          </Center>
        </Card>
      ))}
    </div>
  );
}

export default MainScreen;
