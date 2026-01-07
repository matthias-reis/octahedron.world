import { glob } from 'glob';
import { parse, join } from 'path';
import sharp from 'sharp';
import { mkdirpSync as mkdirp } from 'mkdirp';

const contentPath = join(process.cwd(), '_content');

async function run() {
  console.log('[IMG] start');
  const files = await glob(`${contentPath}/**/*.{jpg,jpeg,png}`, {
    absolute: true,
  });
  console.log(`[IMG] found ${files.length} files`);
  for (const file of files) {
    const { name } = parse(file);

    // Create flat structure: public/img/{imageName}/s.jpg and public/img/{imageName}/l.jpg
    const imageFolder = join(process.cwd(), 'public/img', name);
    mkdirp(imageFolder);

    const newImageLargeName = join(imageFolder, 'l.jpg');
    const newImageSmallName = join(imageFolder, 's.jpg');

    const imageSharp = sharp(file);

    const imageLarge = imageSharp
      .withMetadata()
      .resize(1280, 1280, {
        fit: 'inside',
        withoutEnlargement: false,
      })
      .sharpen()
      .jpeg({
        quality: 90,
        chromaSubsampling: '4:2:0',
        progressive: true,
        force: true,
      });
    await imageLarge.toFile(newImageLargeName);
    const imageSmall = imageSharp
      .withMetadata()
      .resize(600, 600, {
        fit: 'inside',
        withoutEnlargement: false,
      })
      .sharpen()
      .jpeg({
        quality: 65,
        chromaSubsampling: '4:2:0',
        progressive: true,
        force: true,
      });
    await imageSmall.toFile(newImageSmallName);
    console.log(`[IMG] 🏞️  ${name}`);
  }
  console.log('[IMG] 🏁 done');
}

run();
