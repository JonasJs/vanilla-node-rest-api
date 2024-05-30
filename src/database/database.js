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
   
  #tableAlreadyExist(table) {
    return Array.isArray(this.#database[table]);
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, filter ) {
    let data = this.#database[table] ?? [];

    // TODO: Melhorar essa validção de filtro.
    if(typeof filter === 'object') {
      data = data.filter(row => {
        const filterData = Object.entries(filter);

        if(filterData.length > 0) {
          return filterData.some(([key, value]) => {
            return row[key].toLowerCase().includes(value.toLowerCase());
          });
        }

        return true;
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
  
  findById(table, id) {
    if(!this.#tableAlreadyExist(table)) {
      throw new Error(`Table ${table} does not exist.`);
    }

    const data = this.#database[table].find(row => row?.id === id);

    return data ?? null;
  }

  updateById(table, id, newData) {
    // TODO: Colocar essa validação de forma global
    if(!this.#tableAlreadyExist(table)) {
      throw new Error(`Table ${table} does not exist.`);
    }
    
    const index = this.#database[table].findIndex(row => row.id === id);
    if (index && index === -1) {
      throw new Error("Data not found");
    }

    const updatedData = { ...this.#database[table][index], ...newData };
    this.#database[table][index] = updatedData;

    this.#persist();
    return updatedData;
  }

  deleteById(table, id) {
    // TODO: Colocar essa validação de forma global
    if(!this.#tableAlreadyExist(table)) {
      throw new Error(`Table ${table} does not exist.`);
    }

    const index = this.#database[table].findIndex(row => row?.id === id);

    if (index === -1) {
      throw new Error(`Item with id ${id} does not exist in table ${table}.`);
    }

    this.#database[table].splice(index, 1);
    this.#persist();
  }
}