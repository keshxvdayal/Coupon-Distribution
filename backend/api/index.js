const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
app.use(cors({ origin: "https://coupon-distribution-gules.vercel.app/" }));
app.use(express.json());

let ipClaims = {}; // Store claimed coupons per user IP

app.get("/claim", (req, res) => {
    let allClaims = [];

    for (const ip in ipClaims) {
        for (const coupon in ipClaims[ip]) {
            allClaims.push({
                ip,
                coupon,
                claimedAt: new Date(ipClaims[ip][coupon]).toLocaleString(),
            });
        }
    }

    let html = `<h1>Claimed Coupons</h1>
        <table border="1" cellpadding="8">
            <tr><th>Coupon</th><th>User IP</th><th>Claimed At</th></tr>`;

    allClaims.forEach((claim) => {
        html += `<tr>
                    <td>${claim.coupon}</td>
                    <td>${claim.ip}</td>
                    <td>${claim.claimedAt}</td>
                 </tr>`;
    });

    html += `</table>`;
    res.send(html);
});

app.post("/claim", (req, res) => {
    const userIP = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!req.body || !req.body.coupon) {
        return res.status(400).send("Invalid coupon.");
    }

    const { coupon } = req.body;

    if (!ipClaims[userIP]) {
        ipClaims[userIP] = {};
    }

    if (ipClaims[userIP][coupon]) {
        return res.status(400).send("You have already claimed this coupon.");
    }

    ipClaims[userIP][coupon] = Date.now();
    res.send("Coupon claimed successfully!");
});

app.get("/claimed-coupons", (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const claimedCoupons = ipClaims[userIP] ? Object.keys(ipClaims[userIP]) : [];
    res.json({ claimedCoupons });
});

// Export the handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
