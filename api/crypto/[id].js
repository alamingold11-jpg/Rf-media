import cryptoHandler from '../crypto.js';

export default async function handler(req, res) {
  return cryptoHandler(req, res);
}
