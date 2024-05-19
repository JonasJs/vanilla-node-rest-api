import { randomUUID } from "node:crypto";

export class Tasks {
  id;
  title;
  description;
  completed_at = null;
  created_at = null;
  updated_at = null;

  constructor(title, description) {
    this.id = randomUUID();
    this.created_at = new Date().getTime();
    this.title = title;
    this.description = description;
  }
}