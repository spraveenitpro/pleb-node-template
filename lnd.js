//import LndGrpc from 'lnd-grpc';
const LndGrpc = require('lnd-grpc');
const dotenv = require('dotenv');

dotenv.config();

const options = {
    host: process.env.LND_HOST,
    cert: process.env.LND_CERT,
    macaroon: process.env.LND_MACAROON,
}
const lnd = new LndGrpc(options);

// Aditional refactoring for lnd.js

const connect = async () => {
    await lnd.connect();
    console.log("LND GRPC is ready to be used!");
}

const getInfo = async () => {
    const info = await lnd.services.Lightning.getInfo();
    console.log(info);
    return info;
}

const getWalletBalance = async () => {
    const walletBalance = await lnd.services.Lightning.walletBalance();
    return walletBalance;
}

const getChannelBalance = async () => {
    const channelBalance = await lnd.services.Lightning.channelBalance();
    return channelBalance;
}

const getBalances = async () => {
    const walletBalance = await getWalletBalance();
    const channelBalance = await getChannelBalance();
    return { walletBalance, channelBalance };
}

const getChannels = async () => {
    const channels = await lnd.services.Lightning.listChannels();
    return channels;
}

module.exports = { connect, getInfo, getBalances, getChannels };
