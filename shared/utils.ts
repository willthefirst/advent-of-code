import path from 'path';
import fs from 'fs-extra';

export async function read(filename: string): Promise<string> {
  return (await fs.readFile(path.resolve(__dirname, '../', filename)))
    .toString()
    .trim();
}
