const router = require("express").Router();
//const {connect} = require("./lnd");
const { getInfo, getBalances, getChannels, addPeer, openChannel, closeChannel } = require("./lnd");



router.get("/", async (req, res) => {
    const info = await getInfo();
    const balances = await getBalances();
    const channels = await getChannels();
    res.status(200).json({ info, balances, channels: channels.channels })
});

router.post('/addPeer', async (req, res) => {
    const { pubkey, host } = req.body;
    const peer = await addPeer(pubkey, host);
    res.status(200).json({ peer });
});

router.post('/openChannel', async (req, res) => {
    const { pubkey, amount } = req.body;
    const channel = await openChannel(pubkey, amount);
    //console.log("Channel opened?", channel);
    res.status(200).json({
        message: "Channel opened successfully",
    });
});

router.post("/closeChannel", async (req, res) => {
    const { channelId } = req.body;

    const channel = await closeChannel(channelId);

    if (channel.error) {
        res.status(400).json({
            message: channel.error,
        });
    }

    res.status(200).json({
        message: "Channel closed",
    });
});






module.exports = router;
