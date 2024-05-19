import fs from "node:fs/promises";

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};
  
  constructor() {
    
    fs.readFile(databasePath, 'utf-8').then((file) => {
      this.#database = JSON.parse(file);
    }).catch(() => {
      this.#persist();
    })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, { filter }) {
    let data = this.#database[table] ?? [];

    console.log(filter);

    if(typeof filter === 'object') {
      data = data.filter(row => {
        const filterData = Object.entries(filter);

        // const filterValues = filterData.filter(([key, value]) => typeof value === 'string');

        return filterData.some(([key, value]) => {
          return typeof value !== 'string' || row[key].toLowerCase().includes(value.toLowerCase());
        });
      })
    }

    return data;
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }


}