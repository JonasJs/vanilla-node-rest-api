
import fs from 'node:fs';
import { Transform, Readable } from 'node:stream';
import { validateSchema } from '../data-guard/index.js';

const csvPath = new URL('./tasks.csv', import.meta.url);


const schema = {
  title: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class TransfromCSV extends Transform {
  #buffers = [];

  _transform(chunk, encoding, callback) {
    this.#buffers.push(chunk);

    const buffers = Buffer.concat(this.#buffers).toString();
    let rows = buffers.split('\n');
    
    // Remove Headers
    rows.shift();
    
    for (const row of rows) {
      const [title, description] = row.split(',');

      const validationResult = validateSchema(schema, { title, description });

      if(!validationResult.success) {
        continue;
      }

      const task = {
        title,
        description
      }

      this.push(JSON.stringify(task) + '\n');
    }
    callback();
    // const lines = this.#bunormalize_optionsffer
  }

  async _flush(callback) {
    if(this.#buffers.length > 0) {
      console.log(this.#buffers);

      const buffers = Buffer.concat(this.#buffers).toString();
      let rows = buffers.split('\n');
      // Remove Headers
      rows.shift();
      
      // const buffersString = Buffer.concat(this.#buffers).toString();
      for await (const row of rows) {
        
        const [title, description] = row.split(',');
        console.log("aqui => ", row);
        const validationResult = validateSchema(schema, { title, description });
  
        if(validationResult.success) {
          const task = {
            title,
            description
          }
    
          this.push(JSON.stringify(task) + '\n');
        }
      }

    }
    callback();
  }

}


async function createTaskUsingCSV() {
  const readStream = fs.createReadStream(csvPath, 'utf8');
  const transfromCSV = new TransfromCSV();

  const rows = readStream.pipe(transfromCSV);

  for await (const row of rows) {
    console.log(row.toString());
    await wait(1000);
  }

  // console.log(linesParse);
}

createTaskUsingCSV();