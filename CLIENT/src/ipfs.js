const IPFS = require('ipfs-api');
const ipfs = new IPFS('/ip4/127.0.0.1/tcp/5002/http');

export default ipfs;