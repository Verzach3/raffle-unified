import { app } from 'electron';
import { statSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export const generatedPath = path.join(
  app.getPath('documents'),
  '/RaffleManager/Generated'
);
export async function getRecentPrints() {
  const recentPrints = await readdir(generatedPath);
  const pdfs: { day: string; pdfPath: string; createdAt: number }[] = [];
  for await (const print of recentPrints) {
    console.log(print);
    (await readdir(path.join(generatedPath, print)))
      .filter((file) => {
        const inc = file.includes('pdf')
        console.log("File", file, "includes pdf?", inc);
        return inc;
      })
      .forEach((file) => {
        const stats = statSync(path.join(generatedPath, print, file));
        pdfs.push({
          day: print,
          pdfPath: path.join(generatedPath, print, file),
          createdAt: stats.birthtimeMs,
        });
      });
  }

  return pdfs;
}
