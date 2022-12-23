export interface Client {
  id: string;
  name: string;
  numbers: { list: string; numbers: string[] }[];
};
