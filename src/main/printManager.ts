import { app, BrowserWindow, ipcMain, ipcRenderer, Notification } from 'electron';
import { mkdirSync, readFileSync } from 'fs';
import { copyFile, readdir, rename, rm } from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
// @ts-ignore
import sharp from 'sharp';
import { Client } from 'types/Client';
import { createRaffle } from '../templateUtil';
import { Day } from '../types/Day';
import RaffleData from '../types/RaffleData';
import { createWriter } from "muhammara"
import { PageSizes } from 'pdf-lib';
export const generatedPath = path.join(
  app.getPath('documents'),
  '/RaffleManager/Generated'
);

// Changes directory to the resources folder if the app is packaged
const resPath = path.join(
  cwd(),
  `${app.isPackaged ? '/resources/' : ''}`,
  'res/'
);
const raffleTemplatePath = path.join(resPath, 'template.svg');
const rafflePosTemplatePath = path.join(resPath, 'image-pos-nocustom.svg');
const cachedRaffleTemplate = readFileSync(raffleTemplatePath, 'utf8');

export async function printDay(day: Day, printRemaining?: boolean) {
  if (printRemaining === undefined) {
    printRemaining = false;
  }
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
    listName: list,
    line1Info,
    line2Info,
    line3Info,
    colors,
    infoPos,
    posLottery,
  } = day;
  new Notification({
    title: 'Raffle Manager',
    body: 'Empezando a generacion...',
  }).show();
  const raffleData: RaffleData[][]  = clients.map((client: Client) => {
    const asignedNumbers = client.numbers.filter(
      (asignedNumber) => asignedNumber.list === list
    )[0];
    return asignedNumbers.numbers.map((number: string) => {
      return {
        clientName: client.name,
        date: date,
        prize: prize,
        prizeValue: prizeValue,
        lottery: lottery,
        price: price,
        number,
        encerradoValue: encerradoValue,
        line1Info: line1Info,
        line2Info: line2Info,
        line3Info: line3Info,
        colors,
        infoPos,
        posLottery,
      };
    });
  });

  const raffleDataFlat: RaffleData[] = raffleData.flat();
  if (printRemaining === true) {
    console.log("Printing remaining numbers")
    // the remaining numbers are in the list parameter of the day, they are the numbers that are not in the clients list
    // the idea is to print the remaining numbers the same way as the clients numbers but whitout the client name
    const remainingNumbers = day.list!.numbers.map((number: string) => {
      return {
        clientName: "",
        date: date,
        prize: prize,
        prizeValue: prizeValue,
        lottery: lottery,
        price: price,
        number,
        encerradoValue: encerradoValue,
        line1Info: line1Info,
        line2Info: line2Info,
        line3Info: line3Info,
        colors,
        infoPos,
        posLottery,
      };
    }
    );
    raffleDataFlat.push(...remainingNumbers);
  }


  try {
    await rm(path.join(generatedPath, date), { recursive: true });
  } catch (error) {
    console.log('No folder to delete');
  }
  let skipFolderCreation = false;

  new Notification({
    title: 'Raffle Manager',
    body: 'Empezando a generar imagenes',
  }).show();

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
          `${flatRaffle.number}.png`
        )
      );
    // ipcMain.emit("print:progress", { progress: 1, total: raffleDataFlat.length });
    BrowserWindow.getAllWindows()[0].webContents.send('print:progress', {
      progress: 1,
      total: raffleDataFlat.length,
    });
  }
  await makePages(path.join(generatedPath, date));
  // const make = await spawn(new Worker("./makePDF.ts"))
  // const pdf = await make.makePDF(path.join(generatedPath, date))
  new Notification({
    title: 'Raffle Manager',
    body: 'Empezando a generar PDF',
  }).show();
  await makePDF(path.join(generatedPath, date));

  await cleanUp(path.join(generatedPath, date));
  new Notification({
    title: 'Raffle Manager',
    body: 'Generacion finalizada',
  }).show();
}

async function makePDF(pagesPath: string ) {
    const files = (await readdir(pagesPath))
      .filter((file) => file.includes('page'))
      .sort();
    for await (const file of files) {
      await sharp(path.join(pagesPath, file, 'template.svg'))
        .resize(3400, 5600)
        .png()
        .toFile(path.join(pagesPath, `${file}.png`));
    }

    const pdfDoc = createWriter(path.join(pagesPath, 'raffles.pdf'));

    const filesPNG = (await readdir(pagesPath)).filter((file) =>
      file.endsWith('.png')
    );
    filesPNG.forEach((file) => {
      console.log('🚀 ~ makePDF ~ file', file);
    });
    for await (const file of filesPNG) {
      const page = pdfDoc.createPage(
        0,
        0,
        PageSizes.Legal[0],
        PageSizes.Legal[1]
      );
      pdfDoc
        .startPageContentContext(page)
        .drawImage(0, 0, path.join(pagesPath, file), {
          transformation: {
            width: PageSizes.Legal[0],
            height: PageSizes.Legal[1],
          },
        });
      pdfDoc.writePage(page);
    }

    pdfDoc.end();
    await rename(path.join(pagesPath, 'raffles.pdf'), path.join(pagesPath, 'raffles-final.pdf'))
  }

export async function makePages(imagesPath: string) {
  const files = await readdir(imagesPath);
  const pageCount = files.length < 18 ? 1 : Math.round(files.length / 18);
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


export async function cleanUp(pagesPath: string) {
  //Erase all files in the folder except the pdf
  const files = await readdir(pagesPath);
  for await (const file of files) {
    if (!file.endsWith('pdf')) {
      await rm(path.join(pagesPath, file), { recursive: true });
    }
  }
}
