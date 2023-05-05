export default interface RaffleData {
  clientName: string | undefined;
  date: string;
  prize: string;
  prizeValue: string;
  lottery: string;
  price: string;
  number: string;
  encerradoValue: string;
  line1Info: string;
  line2Info: string;
  line3Info: string;
  raffleName?: string;
  prizePos?: string;
  infoPos?: {
    line1: string;
    line2: string;
    line3: string;
  },
  posLottery?: string;
  colors?: {
  c1c1c1ff?: string;
  c1c1c2ff?: string;
  c1c1c3ff?: string;
  c1c1c4ff?: string;
  c1c1c5ff?: string;
  c1c1c6ff?: string;
  c1c1c7ff?: string;
  c1c1c8ff?: string;
  c1c1c9ff?: string;
  c1c1c10f?: string;
  c1c1c11f?: string;
  c1c1c12f?: string;
  c1c1c13f?: string;
}
}
