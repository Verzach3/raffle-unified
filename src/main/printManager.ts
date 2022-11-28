import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { mkdirSync, readFileSync } from 'fs';
import { copyFile, readdir, rename, rm } from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
import sharp from 'sharp';
import { Client } from 'types/Client';
import { createRaffle } from '../templateUtil';
import { Day } from '../types/Day';
import RaffleData from '../types/RaffleData';
import HummusRecipe from 'hummus-recipe';
import { PageSizes } from 'pdf-lib/cjs/api';
export const generatedPath = path.join(
  app.getPath('documents'),
  '/RaffleManager/Generated'
);
const resPath = path.join(
  cwd(),
  `${app.isPackaged ? '/resources/' : ''}`,
  'res/'
);
const raffleTemplatePath = path.join(resPath, 'template.svg');
const rafflePosTemplatePath = path.join(resPath, 'image-pos-nocustom.svg');
const cachedRaffleTemplate = readFileSync(raffleTemplatePath, 'utf8');
export async function printDay(day: Day) {
  try {
    mkdirSync(generatedPath, { recursive: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  const {
    date,
    prize,
    prizeValue,
    lottery,
    price,
    encerradoValue,
    clients,
    line1Info,
    line2Info,
    line3Info,
  } = day;

  const raffleData = clients.map((client: Client) => {
    return client.asignedNumbers.map((number: string) => {
      return {
        clientName: client.name,
        date,
        prize,
        prizeValue,
        lottery,
        price,
        number,
        encerradoValue,
        line1Info,
        line2Info,
        line3Info,
      };
    });
  });

  const raffleDataFlat: RaffleData[] = raffleData.flat();

  try {
    await rm(path.join(generatedPath, date), { recursive: true });
  } catch (error) {
    console.log('No folder to delete');
  }
  let skipFolderCreation = false;

  for await (const flatRaffle of raffleDataFlat) {
    if (!skipFolderCreation) {
      try {
        mkdirSync(path.join(generatedPath, date));
      } catch (error) {
        skipFolderCreation = true;
      }
    }
    flatRaffle.number = flatRaffle.number.padStart(3, '0');
    const raffle = createRaffle(cachedRaffleTemplate, flatRaffle);

    // await writeFile(path.join(generatedPath, date, `${raffleData.clientName}-${raffleData.number}.svg`), raffle);
    await sharp(Buffer.from(raffle))
      .resize(800, 500)
      .png()
      .toFile(
        path.join(
          generatedPath,
          date,
          `${flatRaffle.clientName}-${flatRaffle.number}.png`
        )
      );
    // ipcMain.emit("print:progress", { progress: 1, total: raffleDataFlat.length });
    BrowserWindow.getAllWindows()[0].webContents.send('print:progress', {
      progress: 1,
      total: raffleDataFlat.length,
    });
  }
  await makePages(path.join(generatedPath, date));
  await makePDF(path.join(generatedPath, date));
}

export async function makePages(imagesPath: string) {
  const files = await readdir(imagesPath);
  const pageCount = Math.round(files.length / 18);
  for (let i = 0; i < pageCount; i += 1) {
    const page = files.slice(i * 18, (i + 1) * 18);
    const pagePath = path.join(imagesPath, `page${i + 1}`);
    try {
      mkdirSync(pagePath);
    } catch (error) {
      console.log(
        '🚀 ~ makePages ~ error',
        "Maybe the page already exists, let's continue"
      );
    }
    page.forEach(async (file, index) => {
      try {
        mkdirSync(path.join(pagePath, 'images'));
      } catch (error) {
        console.log(
          '🚀 ~ page.forEach ~ error',
          "Maybe the page already exists, let's continue"
        );
      }
      const filePath = path.join(imagesPath, file);
      const newFilePath = path.join(
        pagePath,
        'images',
        `image${index + 1}.png`
      );
      try {
        await rename(filePath, newFilePath);
      } catch (error) {
        console.log('🚀 ~ Move failed, ', 'Fallback to copy');
        await copyFile(filePath, newFilePath);
        await rm(filePath);
      }
    });
    try {
      await copyFile(
        rafflePosTemplatePath,
        path.join(pagePath, `template.svg`)
      );
    } catch (error) {
      console.log('🚀 ~ makePages ~ error', 'Error copying the pos template');
    }
  }
}

export async function makePDF(pagesPath: string) {
  const files = (await readdir(pagesPath)).filter((file) =>
    file.includes('page')
  );
  for await (const file of files) {
    await sharp(path.join(pagesPath, file, 'template.svg'))
      .resize(3400, 5600)
      .png()
      .toFile(path.join(pagesPath, `${file}.png`));
  }
  const pdfDoc = new HummusRecipe('new', path.join(pagesPath, 'raffles.pdf'), {
    author: 'Raffle Manager',
  });

  const filesPNG = (await readdir(pagesPath)).filter((file) =>
    file.endsWith('.png')
  );
  filesPNG.forEach((file) => {
    console.log('🚀 ~ makePDF ~ file', file);
  });
  for await (const file of filesPNG) {
    pdfDoc
      .createPage(PageSizes.Legal[0], PageSizes.Legal[1])
      .image(path.join(pagesPath, file), 0, 0, {
        width: PageSizes.Legal[0],
        height: PageSizes.Legal[1],
      })
      .endPage();
  }

  pdfDoc.endPDF();
}
