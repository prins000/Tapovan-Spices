import * as jimpModule from 'jimp';

async function main() {
  try {
    const Jimp = jModule();
    console.log('Reading public/logo.jpeg...');
    const image = await Jimp.read('public/logo.jpeg');
    
    console.log('Resizing image to 64x64 (keeping the original white background)...');
    image.resize({ w: 64, h: 64 });
    
    console.log('Saving as public/favicon-logo.png...');
    await image.write('public/favicon-logo.png');
    console.log('Success! favicon-logo.png created.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

function jModule() {
  return jimpModule.default || jimpModule.Jimp || jimpModule;
}

main();
