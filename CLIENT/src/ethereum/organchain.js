import web3 from './web3';
import OrganChain from './build/contracts/OrganChain.json';

const instance = new web3.eth.Contract(
    OrganChain.abi,
    '0x2e21d6D9d50CECC091caaF49A348A7357a01256a'
)



export default instance;