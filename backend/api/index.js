const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
app.use(cors()); // Allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

let ipClaims = {};

app.post("/claim", (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!req.body || !req.body.coupon) {
        return res.status(400).json({ error: "Invalid coupon." });
    }

    const { coupon } = req.body;

    if (!ipClaims[userIP]) {
        ipClaims[userIP] = {};
    }

    if (ipClaims[userIP][coupon]) {
        return res.status(400).json({ error: "You have already claimed this coupon." });
    }

    ipClaims[userIP][coupon] = Date.now();
    res.json({ message: "Coupon claimed successfully!" });
});

app.get("/claimed-coupons", (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const claimedCoupons = ipClaims[userIP] ? Object.keys(ipClaims[userIP]) : [];
    res.json({ claimedCoupons });
});

module.exports = app;
module.exports.handler = serverless(app);
