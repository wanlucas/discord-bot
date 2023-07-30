import fs from 'fs';
import { join } from 'path';

export default class Error {
  constructor(
    public message: string,
    public date: Date = new Date(),
  ) { }

  public register(path: string, log: Object) {
    if (!path.endsWith('.json')) throw new Error('The path must be a json file');

    if (!fs.existsSync(join(__dirname, 'logs'))) {
      fs.mkdirSync(join(__dirname, 'logs'));
    }

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify([]));
    }

    fs.readFile(path, 'utf8', (error, previous) => {
      if (!error) {
        fs.writeFileSync(path, JSON.stringify([...JSON.parse(previous || '[]'), log], null, 2));
      }
    });
  }
}