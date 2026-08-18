import fs from "fs";
import path from "path";
import { marked } from "marked";

const helpDirectory = path.join(process.cwd(), "content/help");

export async function getHelpDocument(filename: string) {
  const markdown = fs.readFileSync(path.join(helpDirectory, filename), "utf8");
  return marked.parse(markdown);
}
