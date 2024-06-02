
# Vanilla Node REST API

> Full CRUD REST API using Node.js with no framework or dependencies

This project was developed for learning and experimentation purposes. In production projects, you would typically use frameworks like Express. However, this project was implemented entirely in vanilla Node.js, without the use of any frameworks or external dependencies.

## Features

The project implements a full REST API with the following features:

- Create a task
- List all tasks
- Update a task by `id`
- Delete a task by `id`
- Mark a task as complete by `id`
- Bulk import tasks via a CSV file

## Data Guard

For this project, a custom JSON validator called [`data-guard`](https://github.com/JonasJs/vanilla-node-rest-api/tree/main/data-guard) was created, inspired by libraries such as Zod and Yup. [`data-guard`](https://github.com/JonasJs/vanilla-node-rest-api/tree/main/data-guard) validates the structure and data of tasks, ensuring they are correct before being processed by the API.

#### Usage Examples

- **Schema and Data**
  ```javascript
  const schema = {
    name: { type: 'string', required: true },
    age: { type: 'number' },
    email: 'string',
  };

  const data = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St',
  };
  ```

### Expected Result:
  An error should be returned because the `address` key is not in the schema.

  If `address` were removed, it should return `{ name: 'John Doe', age: 30 }`.


## Routes

```
# Routes
POST     /tasks
GET      /tasks
PUT      /tasks/:id
DELETE   /tasks/:id
PATCH    /tasks/:id/complete
```

## Usage

### Installation

```bash
# Install dependencies
npm install
```

### Running the Project

```bash
# Run in development mode
npm run dev

# Run in production
npm start
```

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License.