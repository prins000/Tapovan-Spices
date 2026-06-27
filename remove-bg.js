import * as jimpModule from 'jimp';

async function main() {
  try {
    const Jimp = jModule();
    
    console.log('Loading logo.jpeg...');
    const image = await Jimp.read('public/logo.jpeg');
    
    console.log('Processing pixels...');
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is close to white, make it transparent
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    console.log('Writing logo.png...');
    image.write('public/logo.png', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Success! logo.png created with transparent background.');
      }
    });
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

function jModule() {
  return jimpModule.default || jimpModule.Jimp || jimpModule;
}

main();
