const express = require('express');
const { ethers } = require('ethers');

const app = express();
app.use(express.json());

// ১. হোমপেজ রাউট
app.get(['/', '/crypto', '/crypto/'], (req, res) => {
    res.json({
        status: "success",
        message: "Crypto HD Wallet API is running successfully!"
    });
});

// ২. ইউজার আইডি অনুযায়ী ইউনিক BEP20 অ্যাড্রেস জেনারেটর
app.get(['/:userId', '/crypto/:userId'], async (req, res) => {
    try {
        let userId = parseInt(req.params.userId);
        
        if (isNaN(userId)) {
            return res.status(400).json({ success: false, error: "Invalid User ID. Use numbers like /crypto/1" });
        }
        
        const mnemonic = process.env.WALLET_MNEMONIC;
        if (!mnemonic) {
            return res.status(500).json({ success: false, error: "Wallet mnemonic is not configured!" });
        }
        
        const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
        const childWallet = hdNode.deriveChild(44).deriveChild(60).deriveChild(0).deriveChild(0).deriveChild(userId);

        res.json({
            success: true,
            user_id: userId,
            bep20_address: childWallet.address
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ৩. BEP20 USDT ডিপোজিট মনিটরিং API
app.get(['/check/:userId', '/crypto/check/:userId'], async (req, res) => {
    try {
        let userId = parseInt(req.params.userId);
        
        if (isNaN(userId)) {
            return res.status(400).json({ success: false, error: "Invalid User ID" });
        }
        
        const mnemonic = process.env.WALLET_MNEMONIC;
        if (!mnemonic) {
            return res.status(500).json({ success: false, error: "Wallet mnemonic is not configured!" });
        }

        const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
        const childWallet = hdNode.deriveChild(44).deriveChild(60).deriveChild(0).deriveChild(0).deriveChild(userId);
        const userAddress = childWallet.address;

        const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
        const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955";
        const abi = ["function balanceOf(address owner) view returns (uint256)"];

        const usdtContract = new ethers.Contract(usdtContractAddress, abi, provider);
        const balanceRaw = await usdtContract.balanceOf(userAddress);
        const balanceUsdt = ethers.formatUnits(balanceRaw, 18);

        res.json({
            success: true,
            user_id: userId,
            address: userAddress,
            usdt_balance: balanceUsdt,
            message: "USDT deposit checked successfully from BSC Network!"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
