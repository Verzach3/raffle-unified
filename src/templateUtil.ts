import RaffleData from 'types/RaffleData';

export function numberToText(number: string) {
  const numbers = number.split('');
  let text = '';
  for (let i = 0; i < numbers.length; i += 1) {
    switch (numbers[i]) {
      case '0':
        text += '  CERO,';
        break;
      case '1':
        text += '  UNO,';
        break;
      case '2':
        text += '  DOS,';
        break;
      case '3':
        text += '  TRES,';
        break;
      case '4':
        text += 'CUATRO,';
        break;
      case '5':
        text += ' CINCO,';
        break;
      case '6':
        text += '  SEIS,';
        break;
      case '7':
        text += 'SIETE,';
        break;
      case '8':
        text += ' OCHO,';
        break;
      case '9':
        text += 'NUEVE,';
        break;
      default:
        break;
    }
  }
  return text;
}
export function createRaffle(raffle: string, raffleData: RaffleData) {
  const numberText = numberToText(raffleData.number).split(',');
  // console.log(raffleData.colors)
  return raffle
    .replace(/{{clientName}}/g, raffleData.clientName || "")
    .replaceAll(/{\{10}}/g, raffleData.date.toUpperCase())
    .replace(/{\{01}}/g, raffleData.prize)
    .replace(/{\{05}}/g, raffleData.prizeValue)
    .replace(/{\{02}}/g, raffleData.lottery)
    .replace(/{\{03}}/g, raffleData.price)
    .replace(/{\{06}}/g, raffleData.number)
    .replace(/{\{04}}/g, raffleData.encerradoValue)
    .replace(/{\{11}}/g, raffleData.line1Info)
    .replace(/{\{12}}/g, raffleData.line2Info)
    .replace(/{\{13}}/g, raffleData.line3Info)
    .replaceAll(/{\{prizePos}}/g, raffleData.prizePos ?? "2816.78")
    .replace(
      /{\{07}}/g,
      numberText[0].trim() === 'CUATRO' || numberText[0].trim() === 'NUEVE'
        ? numberText[0]
        : `   ${numberText[0]}`
    )
    .replace(
      /{\{08}}/g,
      numberText[0].trim() === 'CUATRO' ||
      numberText[0].trim() === 'NUEVE' ||
      numberText[0].trim() === 'CERO'
        ? numberText[1]
        : `  ${numberText[1]}`
    )
    .replace(/{\{09}}/g, numberText[2].trim())
    .replace(/{\{info1Pos}}/g, raffleData.infoPos?.line1 ?? "1356")
    .replace(/{\{info2Pos}}/g, raffleData.infoPos?.line2 ?? "1356")
    .replace(/{\{info3Pos}}/g, raffleData.infoPos?.line3 ?? "1356")
    .replace(/{\{posLottery}}/g, raffleData.posLottery ?? "2832")
    // make another with the following color codes and the following format: replace(/c1c1c1ff/g, raffleData.color?.c1c1c1ff ?? "000000ff")
    // c1c1c1ff: Asociacion de Sorteos Text
    // c1c1c2ff: Buga text
    // c1c1c3ff: Icon circle
    // c1c1c4ff: Freddy Back
    // c1c1c5ff: Round - line
    // c1c1c6ff: ASOSORBU text
    // c1c1c7ff: Number text
    // c1c1c8ff: Down Text
    // c1c1c9ff: prize text
    // c1c1c10f: Lottery Text
    // c1c1c11f: Price text
    // c1c1c12f: Date Text
    // c1c1c13f: N° Text
    .replaceAll(/#c1c1c1/g, raffleData.colors?.c1c1c1ff ?? "000000")
    .replaceAll(/#c1c1c2/g, raffleData.colors?.c1c1c2ff ?? "000000")
    .replaceAll(/#c1c1c3/g, raffleData.colors?.c1c1c3ff ?? "000000")
    .replaceAll(/#c1c1c4/g, raffleData.colors?.c1c1c4ff ?? "000000")
    .replaceAll(/#c1c1c5/g, raffleData.colors?.c1c1c5ff ?? "000000")
    .replaceAll(/#c1c1c6/g, raffleData.colors?.c1c1c6ff ?? "000000")
    .replaceAll(/#c1c1c7/g, raffleData.colors?.c1c1c7ff ?? "000000")
    .replaceAll(/#c1c1c8/g, raffleData.colors?.c1c1c8ff ?? "000000")
    .replaceAll(/#c1c1c9/g, raffleData.colors?.c1c1c9ff ?? "000000")
    .replaceAll(/#c1c110/g, raffleData.colors?.c1c1c10f ?? "000000")
    .replaceAll(/#c1c111/g, raffleData.colors?.c1c1c11f ?? "000000")
    .replaceAll(/#c1c112/g, raffleData.colors?.c1c1c12f ?? "000000")
    .replaceAll(/#c1c113/g, raffleData.colors?.c1c1c13f ?? "000000");
}

export function singleNumberToFullNumber(number: string) {
  const numInt = parseInt(number, 10);
  if (numInt < 10) return `00${numInt}`;
  if (numInt < 100) return `0${numInt}`;
  return numInt.toString();
}
