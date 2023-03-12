import { app } from "electron";
import { readdir } from "fs/promises";
import path from "path";

export const generatedPath = path.join(
  app.getPath('documents'),
  '/RaffleManager/Generated'
);
export async function getRecentPrints() {
  const recentPrints = await readdir(generatedPath)
  const pdfs: { day: string, pdfPath: string}[]= []
  for await (const print of recentPrints) {
    (await readdir(path.join(generatedPath, print))).filter((file) => file.endsWith('.pdf')).forEach((file) => {
      pdfs.push({ day: print,  pdfPath: path.join(generatedPath, print, file)})
    })
  }
  return pdfs
}
