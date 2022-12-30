// @ts-ignore
import { app } from "electron";
import { readFileSync } from "fs";
import path from "path";
import { cwd } from "process";
import sharp from "sharp";
import RaffleData from "types/RaffleData";
import { createRaffle } from '../templateUtil';
const resPath = path.join(
        cwd(),
        `${app.isPackaged ? '/resources/' : ''}`,
        'res/'
        );
const raffleTemplatePath = path.join(resPath, 'template.svg');
const cachedRaffleTemplate = readFileSync(raffleTemplatePath, 'utf8');
async function generateBase64Raffle(raffle: Buffer) {
  return (await sharp(raffle).resize(800, 500).png().toBuffer()).toString("base64")
}

export async function generatePreview(raffleData: RaffleData){
  raffleData.number = raffleData.number.padStart(3, '0');
  return generateBase64Raffle(Buffer.from(createRaffle(cachedRaffleTemplate, raffleData)))
}
