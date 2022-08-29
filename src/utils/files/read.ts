import * as fse from 'fs-extra';

export async function readFile(path: string) {
  try {
    return await fse.readJson(path);
  } catch (err) {
    console.error(err);
  }
}
