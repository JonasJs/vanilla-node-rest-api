
import fs from 'node:fs';
import { Transform, Readable } from 'node:stream';
import { validateSchema } from '../data-guard/index.js';

const BASE_URL = 'http://localhost:3333';
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

class TransfromCSV extends Transform {
  #buffers = [];

  constructor() {
    super({ readableObjectMode: true });
  }

  _transform(chunk, _, callback) {
    this.#buffers.push(chunk);

    const buffers = Buffer.concat(this.#buffers).toString();
    let rows = buffers.split('\n');
  
    // Remove a primeira linha do csv(Headers)
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

      this.push(JSON.stringify(task));
    }
    callback();
  }
}


async function createTaskUsingCSV() {
  const readStream = fs.createReadStream(csvPath, 'utf8');
  const transfromCSV = new TransfromCSV();

  const rows = readStream.pipe(transfromCSV);

  for await (const row of rows) {
    await wait(2000);
    
    const url = `${BASE_URL}/task`;
    const body = {
      method: "POST",
      body: row.toString(),
    }

    await fetch(url, body);
  }

}

createTaskUsingCSV();