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

// const addPeer = async (pubkey) => {
//     console.log(lnd.services)
//     const addPeer = await lnd.services.Lightning.connectPeer({ addr: { pubkey, host } });
//     return addPeer;
// }

const addPeer = async (pubkey, host) => {
    const addPeer = await lnd.services.Lightning.connectPeer({
        addr: {
            pubkey,
            host: host,
        },
    });

    return addPeer;
};

const openChannel = async (pubkey, amount) => {
    const channelOpen = await lnd.services.Lightning.openChannel({
        node_pubkey: pubkey,
        local_funding_amount: amount,
    });

    return channelOpen;
};

const closeChannel = async (channelPoint) => {
    // first get the channel point from the channel
    const channel = await lnd.services.Lightning.getChanInfo({
        chan_id: channelPoint,
    });

    const fundingTxId = channel.chan_point.split(":")[0];

    const outputIndex = parseInt(channel.chan_point.split(":")[1]);

    // then close the channel
    const channelClose = await lnd.services.Lightning.closeChannel({
        channel_point: {
            funding_txid_str: fundingTxId,
            output_index: outputIndex,
        },
    });

    return channelClose;
};

module.exports = { connect, getInfo, getBalances, getChannels, addPeer, openChannel, closeChannel };
