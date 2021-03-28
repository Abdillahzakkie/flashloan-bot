require('dotenv/config');
const { ChainId, Token, TokenAmount, Pair } = require('@uniswap/sdk');
const { eth, weth, dai, usdc, usdt } = require('../addresses/tokens-mainnet.json');
const { connectWeb3 } = require('../web3');
const { web3, kyber } = connectWeb3();

const toWei = _amount => web3.utils.toWei(_amount.toString(), 'ether');
const fromWei = _amount => web3.utils.fromWei(_amount.toString(), 'ether');

const AMOUNT_ETH = parseInt(process.env.AMOUNT_ETH);
const RECENT_ETH_PRICE = parseInt(process.env.RECENT_ETH_PRICE); // Set current ETHER value to any value. This value will later be overrided.
const AMOUNT_ETH_WEI = toWei(AMOUNT_ETH);
const AMOUNT_TOKEN_WEI = toWei(AMOUNT_ETH * RECENT_ETH_PRICE);


const kyberPrice = async () => {
    try {
        const _Kyber_ETH_DAI = await Kyber_ETH_DAI();
        const _Kyber_ETH_USDC = await Kyber_ETH_USDC();
        const _Kyber_ETH_USDT = await Kyber_ETH_USDT();
        // const _Kyber_USDT_USDC = await Kyber_USDT_USDC();

        return {
            Kyber_ETH_DAI: _Kyber_ETH_DAI,
            Kyber_ETH_USDC: _Kyber_ETH_USDC,
            Kyber_ETH_USDT: _Kyber_ETH_USDT,
        };
    } catch (error) {
        return error;
    }
}


const Kyber_ETH_DAI = async () => {
    try {
        const Kyber_ETH_DAI = await Promise.all([
            kyber.methods.getExpectedRate(
                dai,
                eth,
                AMOUNT_TOKEN_WEI
            ).call(),
            kyber.methods.getExpectedRate(
                eth,
                dai,
                AMOUNT_ETH_WEI
            ).call()
        ]);

        const Kyber_ETH_DAI_RATE = {
            buy: parseFloat(1 / (fromWei(Kyber_ETH_DAI[0].expectedRate))),
            sell: parseFloat(fromWei(Kyber_ETH_DAI[1].expectedRate))
        };
        return Kyber_ETH_DAI_RATE;
    } catch (error) {
        return error;
    }
}

const Kyber_ETH_USDC = async () => {
    try {
        const Kyber_ETH_USDC = await Promise.all([
            kyber.methods.getExpectedRate(
                usdc,
                eth,
                AMOUNT_TOKEN_WEI
            ).call(),
            kyber.methods.getExpectedRate(
                eth,
                usdc,
                AMOUNT_ETH_WEI
            ).call()
        ]);

        const Kyber_ETH_USDC_RATE = {
            buy: parseFloat(Kyber_ETH_USDC[0].expectedRate / (10 ** 6)),
            sell: parseFloat(fromWei(Kyber_ETH_USDC[1].expectedRate))
        };
        return Kyber_ETH_USDC_RATE;
    } catch (error) {
        return error;
    }
}

const Kyber_ETH_USDT = async () => {
    try {
        const Kyber_ETH_USDT = await Promise.all([
            kyber.methods.getExpectedRate(
                usdt,
                eth,
                AMOUNT_TOKEN_WEI
            ).call(),
            kyber.methods.getExpectedRate(
                eth,
                usdt,
                AMOUNT_ETH_WEI
            ).call()
        ]);

        const Kyber_ETH_USDT_RATE = {
            buy: parseFloat(Kyber_ETH_USDT[0].expectedRate / (10 ** 6)),
            sell: parseFloat(fromWei(Kyber_ETH_USDT[1].expectedRate))
        };
        return Kyber_ETH_USDT_RATE;
    } catch (error) {
        return error;
    }
}



module.exports = { kyberPrice }