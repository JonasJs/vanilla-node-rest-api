import { randomUUID } from "node:crypto";
import { getBrazilianTimestamp } from "../../../utils/get-brazilian-timestamp.js";

export class Task {
  id;
  title;
  description;
  completed_at = null;
  created_at = null;
  updated_at = null;

  constructor(title, description) {
    this.id = randomUUID();
    this.created_at = getBrazilianTimestamp();
    this.title = title;
    this.description = description;
  }
}