import { createWriter } from 'muhammara';
import { readdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { PageSizes } from 'pdf-lib/cjs/api';
import { expose } from 'threads';

expose({
  async makePDF(pagesPath: string ) {
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
  },
});
