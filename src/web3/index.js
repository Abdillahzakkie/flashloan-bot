require('dotenv/config');
const Web3 = require('web3');
const { kyberNetworkProxy } = require('../abis/kyber.json');
const { kyberNetworkProxyAddress } = require('../addresses/kyber-mainnet.json');

const alchemyApiKey = process.env.alchemyApiKey;

const connectWeb3 = () => {
    try {
        const web3 = new Web3(
            new Web3.providers.WebsocketProvider(`wss://eth-mainnet.ws.alchemyapi.io/v2/${alchemyApiKey}`)
        );
        const kyber = new web3.eth.Contract(kyberNetworkProxy, kyberNetworkProxyAddress);
        return { web3, kyber  };
    } catch (error) { return error; }
}

module.exports = { connectWeb3 };