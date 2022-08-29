import * as fse from 'fs-extra';

export async function writeFile(path: string, data: any) {
  try {
    await fse.writeJson(path, data);

    console.log('success!');
  } catch (err) {
    console.error(err);
  }
}
