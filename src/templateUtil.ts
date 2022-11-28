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
  const output = raffle
    .replace(/{{clientName}}/g, raffleData.clientName)
    .replace(/{{date}}/g, raffleData.date)
    .replace(/{{prize}}/g, raffleData.prize)
    .replace(/{{prizeValue}}/g, raffleData.prizeValue)
    .replace(/{{lottery}}/g, raffleData.lottery)
    .replace(/{{price}}/g, raffleData.price)
    .replace(/{{number}}/g, raffleData.number)
    .replace(/{{encerradoValue}}/g, raffleData.encerradoValue)
    .replace(/{{line1Info}}/g, raffleData.line1Info)
    .replace(/{{line2Info}}/g, raffleData.line2Info)
    .replace(/{{line3Info}}/g, raffleData.line3Info)
    .replace(
      /{{numberText1}}/g,
      numberText[0].trim() === 'CUATRO' || numberText[0].trim() === 'NUEVE'
        ? numberText[0]
        : `   ${numberText[0]}`
    )
    .replace(
      /{{numberText2}}/g,
      numberText[0].trim() === 'CUATRO' ||
        numberText[0].trim() === 'NUEVE' ||
        numberText[0].trim() === 'CERO'
        ? numberText[1]
        : `  ${numberText[1]}`
    )
    .replace(/{{numberText3}}/g, numberText[2].trim());
  return output;
}

export function singleNumberToFullNumber(number: string) {
  const numInt = parseInt(number, 10);
  if (numInt < 10) return `00${numInt}`;
  if (numInt < 100) return `0${numInt}`;
  return numInt.toString();
}
