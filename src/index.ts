import Client from './Entity/Client';

const version = process.argv[2];

switch (version) {
  case 'dev':
    new Client().start(process.env.DEV_TOKEN!);
    break;
  case 'secure':
    new Client().start(process.env.SECURE_TOKEN!);
    break;
  default:
    new Client().start(process.env.TOKEN!);
}
