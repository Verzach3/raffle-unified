import { Client } from "./Client";

export interface Day {
  date: string;
  prize: string;
  prizeValue: string;
  lottery: string;
  price: string;
  encerradoValue: string;
  clients: Client[];
  list: string;
  line1Info: string;
  line2Info: string;
  line3Info: string;
}
