const router = require("express").Router();
//const {connect} = require("./lnd");
const { getInfo, getBalances, getChannels } = require("./lnd");



router.get("/", async (req, res) => {
    const info = await getInfo();
    const balances = await getBalances();
    const channels = await getChannels();
    res.status(200).json({ info, balances, channels: channels.channels })
});




module.exports = router;
