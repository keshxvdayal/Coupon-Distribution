const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
app.use(cors({
    origin: "https://coupon-distribution-gules.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }));
  
app.use(express.json());
app.set("trust proxy", true);

let ipClaims = {};

const getClientIP = (req) => {
    return req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
};

app.post("/claim", (req, res) => {
    const userIP = getClientIP(req);

    if (!req.body?.coupon) {
        return res.status(400).json({ error: "Invalid coupon." });
    }

    const { coupon } = req.body;
    ipClaims[userIP] = ipClaims[userIP] || {};

    if (ipClaims[userIP][coupon]) {
        return res.status(400).json({ error: "You have already claimed this coupon." });
    }

    ipClaims[userIP][coupon] = Date.now();
    return res.json({ message: "Coupon claimed successfully!" });
});

app.get("/claimed-coupons", (req, res) => {
    const userIP = getClientIP(req);
    return res.json({ claimedCoupons: Object.keys(ipClaims[userIP] || {}) });
});

module.exports = app;
module.exports.handler = serverless(app);
