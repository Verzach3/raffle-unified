import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Image,
  List,
  Popover,
  TextInput,
} from '@mantine/core';
// @ts-ignore
import { IconTrash } from '@tabler/icons';
// @ts-ignore
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import RaffleData from 'types/RaffleData';
function TemplateEditor() {
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [preview, setPreview] = useState('');
  const [raffleName, setRaffleName] = useState('');
  // useStates for the TextInputs below
  const [prize, setPrize] = useState('Mercado');
  const [prizeValue, setPrizeValue] = useState('100.000');
  const [lottery, setLottery] = useState('Chontico Dia');
  const [price, setPrice] = useState('200');
  const [encerradoValue, setEncerradoValue] = useState('2000');
  const [line1Info, setLine1Info] = useState(
    'Resp: FREDDY Calle 20 No. 12-76  CEL: 3157807292'
  );
  const [line2Info, setLine2Info] = useState(
    'Pago de premios de lunes a sábado de 4 p.m. a 6 p.m.'
  );
  const [line3Info, setLine3Info] = useState(
    'Boleta rota o enmendada no se paga - caducidad 8 dìas.'
  );
  const testRaffle: RaffleData = {
    clientName: 'Raul',
    date: 'Martes 12 de Abril de 2021',
    prize: prize,
    prizeValue: prizeValue,
    lottery: lottery,
    price: price,
    number: '2',
    encerradoValue: encerradoValue,
    line1Info: line1Info,
    line2Info: line2Info,
    line3Info: line3Info,
    raffleName: raffleName,
  };
  useEffect(() => {
    window.previewApi.generatePreview(testRaffle).then((data) => {
      setPreview('data:image/png;base64,' + data);
    });
    return () => {};
  }, [
    price,
    prize,
    prizeValue,
    lottery,
    encerradoValue,
    line1Info,
    line2Info,
    line3Info,
  ]);

  function saveRaffle() {
    if (localStorage.getItem('raffles')) {
      let raffles: RaffleData[] = JSON.parse(
        localStorage.getItem('raffles') as string
      );
      raffles = raffles.filter((raf) => raf.raffleName !== raffleName);
      raffles.push(testRaffle);
      localStorage.setItem('raffles', JSON.stringify(raffles));
    } else {
      localStorage.setItem('raffles', JSON.stringify([testRaffle]));
    }

    setRaffleName('');
  }
  function deleteRaffle(raffleName: string) {
    if (localStorage.getItem('raffles')) {
      let raffles: RaffleData[] = JSON.parse(
        localStorage.getItem('raffles') as string
      );
      raffles = raffles.filter((raf) => raf.raffleName !== raffleName);
      localStorage.setItem('raffles', JSON.stringify(raffles));
    }
    forceUpdate();
  }
  return (
    <div
    >
      <Grid grow justify='space-between' align='center'>
        <Grid.Col span={2}>
        <Image src={preview} width={500} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput
            label="Nombre de la plantilla"
            placeholder=""
            value={raffleName}
            onChange={(e) => setRaffleName(e.target.value)}
          />
          <TextInput
            label="Premio"
            placeholder="Mercado"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
          />
          <TextInput
            label="Valor del premio"
            placeholder="200.000"
            value={prizeValue}
            onChange={(e) => setPrizeValue(e.target.value)}
          />
          <TextInput
            label="Loteria"
            placeholder="Loteria de la Caja"
            value={lottery}
            onChange={(e) => setLottery(e.target.value)}
          />
          <TextInput
            label="Precio"
            placeholder="200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextInput
            label="Valor de encerrado"
            placeholder="2000"
            value={encerradoValue}
            onChange={(e) => setEncerradoValue(e.target.value)}
          />
          <TextInput
            label="Linea 1"
            placeholder="Resp: FREDDY Calle 20 No. 12-76  CEL: 3157807292"
            value={line1Info}
            onChange={(e) => setLine1Info(e.target.value)}
          />
          <TextInput
            label="Linea 2"
            placeholder="PAGO DE PREMIOS DE LUNES A SÁBADO DE 4 P.M. A 6 P.M"
            value={line2Info}
            onChange={(e) => setLine2Info(e.target.value)}
          />
          <TextInput
            label="Linea 3"
            placeholder="Boleta rota o enmendada no se paga - caducidad 8 dìas."
            value={line3Info}
            onChange={(e) => setLine3Info(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      <Group>
        <Popover>
          <Popover.Target>
            <Button mr={5}>Cargar</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <List>
              {localStorage.getItem('raffles') ? (
                JSON.parse(localStorage.getItem('raffles') as string).map(
                  (raffle: RaffleData) => {
                    return (
                      <List.Item key={nanoid()}>
                        <Group>
                          <Button
                            variant="outline"
                            mb={5}
                            onClick={() => {
                              setPrize(raffle.prize);
                              setPrizeValue(raffle.prizeValue);
                              setLottery(raffle.lottery);
                              setPrice(raffle.price);
                              setEncerradoValue(raffle.encerradoValue);
                              setLine1Info(raffle.line1Info);
                              setLine2Info(raffle.line2Info);
                              setLine3Info(raffle.line3Info);
                              setRaffleName(raffle.raffleName ?? "Plantilla sin nombre")
                            }}
                          >
                            {raffle.raffleName ?? 'Plantilla sin nombre'}
                          </Button>
                          <ActionIcon
                            variant="outline"
                            color={'red'}
                            onClick={() =>
                              deleteRaffle(raffle.raffleName ?? '')
                            }
                          >
                            <IconTrash />
                          </ActionIcon>
                        </Group>
                      </List.Item>
                    );
                  }
                )
              ) : (
                <List.Item>No hay boletas guardadas</List.Item>
              )}
            </List>
          </Popover.Dropdown>
        </Popover>
        <Button onClick={saveRaffle} ml={5} color={'green'}>
          Guardar
        </Button>
      </Group>
    </div>
  );
}

export default TemplateEditor;
