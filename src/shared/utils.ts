import path from 'path';
import fs from 'fs-extra';

export async function read(baseDir: string, filename: string): Promise<string> {
  return (await fs.readFile(path.resolve(baseDir, filename))).toString().trim();
}
