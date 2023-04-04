import {
  ActionIcon,
  Button,
  ColorInput,
  ColorPicker,
  Grid,
  Group,
  Image,
  List,
  Popover,
  Select,
  Slider,
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

  const [info1Pos, setInfo1Pos] = useState('1356');
  const [info2Pos, setInfo2Pos] = useState('1356');
  const [info3Pos, setInfo3Pos] = useState('1356');
  const [color1, setColor1] = useState<string>('000000ff');
  const [color2, setColor2] = useState<string>('000000ff');
  const [color3, setColor3] = useState<string>('000000ff');
  const [color4, setColor4] = useState<string>('000000ff');
  const [color5, setColor5] = useState<string>('000000ff');
  const [color6, setColor6] = useState<string>('000000ff');
  const [color7, setColor7] = useState<string>('000000ff');
  const [color8, setColor8] = useState<string>('000000ff');
  const [color9, setColor9] = useState<string>('000000ff');
  const [color10, setColor10] = useState<string>('000000ff');
  const [color11, setColor11] = useState<string>('000000ff');
  const [color12, setColor12] = useState<string>('000000ff');
  const [color13, setColor13] = useState<string>('000000ff');
  const [posLottery, setPosLottery] = useState<string>('2832');
  const [currentColor, setCurrentColor] = useState<string>('c1c1c1ff');
  const [currentSelColor, setCurrentSelColor] = useState<string>('c1c1c1ff');
  const testRaffle: RaffleData = {
    clientName: 'Raul',
    posLottery: posLottery,
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
    infoPos: {
      line1: info1Pos,
      line2: info2Pos,
      line3: info3Pos,
    },
    colors: {
      c1c1c1ff: color1,
      c1c1c2ff: color2,
      c1c1c3ff: color3,
      c1c1c4ff: color4,
      c1c1c5ff: color5,
      c1c1c6ff: color6,
      c1c1c7ff: color7,
      c1c1c8ff: color8,
      c1c1c9ff: color9,
      c1c1c10f: color10,
      c1c1c11f: color11,
      c1c1c12f: color12,
      c1c1c13f: color13,
    },
  };

  useEffect(() => {
    window.previewApi.generatePreview(testRaffle).then((data) => {
      setPreview('data:image/png;base64,' + data);
    });
    console.log(testRaffle.infoPos);
    console.log(testRaffle.colors);
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
    info1Pos,
    info2Pos,
    info3Pos,
    color1,
    color2,
    color3,
    color4,
    color5,
    color6,
    color7,
    color8,
    color9,
    color10,
    color11,
    color12,
    color13,
    posLottery,
  ]);

  function updateColor(color: string, value: string) {
    value.replace('#', '');
    switch (color) {
      case 'c1c1c1ff':
        setColor1(value);
        break;
      case 'c1c1c2ff':
        setColor2(value);
        break;
      case 'c1c1c3ff':
        setColor3(value);
        break;
      case 'c1c1c4ff':
        setColor4(value);
        break;
      case 'c1c1c5ff':
        setColor5(value);
        break;
      case 'c1c1c6ff':
        setColor6(value);
        break;
      case 'c1c1c7ff':
        setColor7(value);
        break;
      case 'c1c1c8ff':
        setColor8(value);
        break;
      case 'c1c1c9ff':
        setColor9(value);
        break;
      case 'c1c110ff':
        setColor10(value);
        break;
      case 'c1c111ff':
        setColor11(value);
        break;
      case 'c1c112ff':
        setColor12(value);
        break;
      case 'c1c113ff':
        setColor13(value);
        break;
      default:
        console.error("INVALID");
        break;
    }
  }

  function getColor(color: string) {
    switch (color) {
      case 'c1c1c1ff':
        return color1;
      case 'c1c1c2ff':
        return color2;
      case 'c1c1c3ff':
        return color3;
      case 'c1c1c4ff':
        return color4;
      case 'c1c1c5ff':
        return color5;
      case 'c1c1c6ff':
        return color6;
      case 'c1c1c7ff':
        return color7;
      case 'c1c1c8ff':
        return color8;
      case 'c1c1c9ff':
        return color9;
      case 'c1c1c10f':
        return color10;
      case 'c1c1c11f':
        return color11;
      case 'c1c1c12f':
        return color12;
      case 'c1c1c13f':
        return color13;
      default:
        return '000000ff';
    }
  }

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
    <div>
      <Grid grow justify="space-between" align="center">
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
          <Slider
            onChangeEnd={(value) => {
              console.log('end', value);
              setPosLottery(value.toString());
            }}
            value={parseInt(posLottery)}
            max={5000}
            defaultValue={2832}
            min={-5000}
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
          <Slider
            onChangeEnd={(value) => {
              console.log('end', value);
              setInfo1Pos(value.toString());
            }}
            value={parseInt(info1Pos)}
            max={5000}
            defaultValue={1356}
            min={-5000}
          />
          <TextInput
            label="Linea 2"
            placeholder="PAGO DE PREMIOS DE LUNES A SÁBADO DE 4 P.M. A 6 P.M"
            value={line2Info}
            onChange={(e) => setLine2Info(e.target.value)}
          />
          <Slider
            onChangeEnd={(value) => {
              console.log('end', value);
              setInfo2Pos(value.toString());
            }}
            value={parseInt(info2Pos)}
            max={5000}
            defaultValue={1356}
            min={-5000}
          />
          <TextInput
            label="Linea 3"
            placeholder="Boleta rota o enmendada no se paga - caducidad 8 dìas."
            value={line3Info}
            onChange={(e) => setLine3Info(e.target.value)}
          />
          <Slider
            onChangeEnd={(value) => {
              console.log('end', value);
              setInfo3Pos(value.toString());
            }}
            value={parseInt(info3Pos)}
            max={5000}
            defaultValue={1356}
            min={-5000}
          />
          <Select
            data={[
              { label: 'Texto Asociacion de Sorteos', value: 'c1c1c1ff' },
              { label: 'Texto Buga', value: 'c1c1c2ff' },
              { label: 'Circulo Icono', value: 'c1c1c3ff' },
              { label: 'Fondo Freddy', value: 'c1c1c4ff' },
              { label: 'Alrededor y Linea', value: 'c1c1c5ff' },
              { label: 'Texto ASOSORBU', value: 'c1c1c6ff' },
              { label: 'Numero', value: 'c1c1c7ff' },
              { label: 'Texto Inferior', value: 'c1c1c8ff' },
              { label: 'Texto Premio', value: 'c1c1c9ff' },
              { label: 'Texto Loteria', value: 'c1c110ff' },
              { label: 'Texto PRecio', value: 'c1c111ff' },
              { label: 'Fecha', value: 'c1c112ff' },
              { label: 'N°', value: 'c1c113ff' },
            ]}
            label="Colores"
            value={currentColor}
            onChange={(e) => {
              setCurrentColor(e ?? 'c1c1c1ff')
              setCurrentSelColor(getColor(e ?? 'c1c1c1ff'));
            }}
          />
          <br />
          <ColorInput
            value={currentSelColor}
            onChange={(color) => {
              updateColor(currentColor, color);
              setCurrentSelColor(color);
            }}
          />
          <br />
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
                              setRaffleName(
                                raffle.raffleName ?? 'Plantilla sin nombre'
                              );
                              setInfo1Pos(raffle.infoPos?.line1 ?? '0');
                              setInfo2Pos(raffle.infoPos?.line2 ?? '0');
                              setInfo3Pos(raffle.infoPos?.line3 ?? '0');
                              setColor1(raffle.colors?.c1c1c1ff ?? 'c1c1c1ff');
                              setColor2(raffle.colors?.c1c1c2ff ?? 'c1c1c2ff');
                              setColor3(raffle.colors?.c1c1c3ff ?? 'c1c1c3ff');
                              setColor4(raffle.colors?.c1c1c4ff ?? 'c1c1c4ff');
                              setColor5(raffle.colors?.c1c1c5ff ?? 'c1c1c5ff');
                              setColor6(raffle.colors?.c1c1c6ff ?? 'c1c1c6ff');
                              setColor7(raffle.colors?.c1c1c7ff ?? 'c1c1c7ff');
                              setColor8(raffle.colors?.c1c1c8ff ?? 'c1c1c8ff');
                              setColor9(raffle.colors?.c1c1c9ff ?? 'c1c1c9ff');
                              setColor10(raffle.colors?.c1c1c10f ?? 'c1c1c10f');
                              setColor11(raffle.colors?.c1c1c11f ?? 'c1c1c11f');
                              setColor12(raffle.colors?.c1c1c12f ?? 'c1c1c12f');
                              setPosLottery(raffle.posLottery ?? '0');
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
