import React, { useEffect, useState } from 'react';
import { Calendar } from '@mantine/dates';
import 'dayjs/locale/es-mx';
import {
  Button,
  Checkbox,
  Group,
  Popover,
  Select,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs';
import RaffleData from 'types/RaffleData';
import { Day } from 'types/Day';
function Print() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDatesText, setSelectedDatesText] = useState<string>('');
  const [listKey, setListKey] = useState<string>('');
  const [selectedRaffleTemplate, setSelectedRaffleTemplate] = useState<
    RaffleData | undefined
  >(undefined);
  const [printRemaining, setPrintRemaining] = useState<boolean>(false);

  function getRaffleTemplates(): RaffleData[] {
    return localStorage.getItem('raffles')
      ? JSON.parse(localStorage.getItem('raffles') as string)
      : [];
  }
  function printSelected() {
    if (
      selectedRaffleTemplate === undefined ||
      selectedDates.length < 1 ||
      listKey === ''
    ) {
      console.error('Not enough arguments');
      return;
    }
    const toPrint: Day[] = [];
    selectedDates.forEach((date) => {
      toPrint.push({
        clients:
          window.db
            .getClients()
            .filter(
              (client) =>
                (client.numbers.filter((list) => list.list === listKey).length >
                0) && client.name.match(/ignorados\.?/gi) === null
            ) ?? [],
        date: dayjs(date).locale('es-mx').format('dddd D [de] MMMM [del] YYYY'),
        encerradoValue: selectedRaffleTemplate.encerradoValue,
        line1Info: selectedRaffleTemplate.line1Info,
        line2Info: selectedRaffleTemplate.line2Info,
        line3Info: selectedRaffleTemplate.line3Info,
        colors: selectedRaffleTemplate.colors,
        infoPos: selectedRaffleTemplate.infoPos,
        posLottery: selectedRaffleTemplate.posLottery,
        listName: listKey,
        list: window.db.getList(listKey) ?? {
          list: '',
          numbers: [],
        },
        lottery: selectedRaffleTemplate.lottery,
        price: selectedRaffleTemplate.price,
        prize: selectedRaffleTemplate.prize,
        prizeValue: selectedRaffleTemplate.prizeValue,
      });
    });
    window.printApi.print(toPrint, printRemaining);
  }
  useEffect(() => {
    setSelectedDatesText(
      selectedDates
        .map((date) =>
          dayjs(date).locale('es-mx').format('dddd D [de] MMMM [del] YYYY')
        )
        .join(', ')
    );
    return () => {};
  }, [selectedDates]);

  return (
    <div>
      <Group grow>
        <Popover>
          <Popover.Target>
            <TextInput
              label={'Fechas Seleccionadas'}
              value={selectedDatesText}
              readOnly
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Calendar
              multiple
              value={selectedDates}
              onChange={(val) => {
                setSelectedDates(val);
                console.log(val);
              }}
              locale="es-mx"
            />
          </Popover.Dropdown>
        </Popover>
        <Select
          label="Plantilla Seleccionada"
          data={getRaffleTemplates().map((raf) => {
            return { value: raf.raffleName ?? '', label: raf.raffleName ?? '' };
          })}
          onChange={(value) => {
            setSelectedRaffleTemplate(
              getRaffleTemplates().find((raf) => raf.raffleName === value)
            );
          }}
        />
        <Select
          data={window.db.getListKeys().map((key) => {
            return { value: key, label: key };
          })}
          label="Selecione las lista de numeros"
          placeholder="Listas"
          searchable
          nothingFound="Nothing found"
          value={listKey}
          onChange={(value) => {
            setListKey(value ?? '');
          }}
        />
      </Group>
      <Checkbox
        style={{ marginTop: '1rem' }}
        checked={printRemaining}
        onChange={(e) => setPrintRemaining((v) => !v)}
        label="Imprimir los numeros restantes"
      />
      <Button onClick={printSelected}>Imprimir</Button>
    </div>
  );
}

export default Print;
