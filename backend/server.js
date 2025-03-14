const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3001" })); // Allow frontend
app.use(express.json());

// Trust proxy to get correct IP
app.set("trust proxy", true);

let ipClaims = {}; // Store claimed coupons per user IP

// ✅ Show claimed coupons on the webpage (http://localhost:3000/claim) + log in console
app.get("/claim", (req, res) => {
    let allClaims = [];
    
    for (const ip in ipClaims) {
        for (const coupon in ipClaims[ip]) {
            allClaims.push({ 
                ip, 
                coupon, 
                claimedAt: new Date(ipClaims[ip][coupon]).toLocaleString() 
            });
        }
    }

    console.log("📋 All Claimed Coupons:", allClaims); // Log in console

    // Generate an HTML page
    let html = `
        <h1>Claimed Coupons</h1>
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

// ✅ Claim a coupon
app.post("/claim", (req, res) => {
    console.log("📥 Received POST request to /claim", req.body);

    const userIP = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("🌐 User IP:", userIP);

    if (!req.body || !req.body.coupon) {
        console.error("🚨 Error: Missing coupon in request body!");
        return res.status(400).send("Invalid coupon.");
    }

    const { coupon } = req.body;

    if (!ipClaims[userIP]) {
        ipClaims[userIP] = {};
    }

    if (ipClaims[userIP][coupon]) {
        console.warn("⚠️ Coupon already claimed:", coupon);
        return res.status(400).send("You have already claimed this coupon.");
    }

    ipClaims[userIP][coupon] = Date.now();
    console.log("✅ Coupon claimed successfully:", coupon);
    res.send("Coupon claimed successfully!");
});

// ✅ Fetch claimed coupons as JSON (for API usage)
app.get("/claimed-coupons", (req, res) => {
    const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const claimedCoupons = ipClaims[userIP] ? Object.keys(ipClaims[userIP]) : [];
    res.json({ claimedCoupons });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
