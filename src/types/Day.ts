import { Client } from "./Client";

export type Day = {
  date: string;
  prize: string;
  prizeValue: string;
  lottery: string;
  price: string;
  encerradoValue: string;
  clients: Client[];
  line1Info: string;
  line2Info: string;
  line3Info: string;
}