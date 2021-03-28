require('dotenv/config');
const express = require('express');
const cors = require('cors');
const { connectWeb3 } = require('./web3');
const { connectDB } = require('./DB');
const { kyberPrice, uniswapPrice } = require('./helper');


const PORT = process.env.PORT || 8000;
const app = express();
const { web3 } = connectWeb3();

app.use(cors());
app.use(express.json());

web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
        console.log(`New block recieved. Block #${block.number}`);
        const kyberRate = await kyberPrice();
        console.log("kyberRate", kyberRate);

        // const uniswapRate = await uniswapPrice();
        // console.log("uniswapRate", uniswapRate);
    })
    .on('error', async error => {
        console.log(error)
    })

app.listen(PORT, async () => {
    await connectDB();
    
    console.log(`Server running on PORT: ${PORT}`);
});