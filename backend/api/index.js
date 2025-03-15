const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

const allowedOrigins = [
    "https://coupon-distribution-gules.vercel.app",
    "http://localhost:3000", // ✅ Allow localhost for local testing
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );
  

app.use(express.json());
app.set("trust proxy", true);

let ipClaims = {};

const getClientIP = (req) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  console.log(`Client IP: ${ip}`); // Log the IP for debugging
  return ip;
};

// 🔹 Handle Coupon Claim
app.post("/claim", (req, res) => {
  console.log("Received claim request:", req.body);

  const userIP = getClientIP(req);

  if (!req.body?.coupon) {
    console.error("Error: Invalid coupon.");
    return res.status(400).json({ error: "Invalid coupon." });
  }

  const { coupon } = req.body;
  ipClaims[userIP] = ipClaims[userIP] || {};

  if (ipClaims[userIP][coupon]) {
    console.warn(`User ${userIP} already claimed ${coupon}`);
    return res.status(400).json({ error: "You have already claimed this coupon." });
  }

  ipClaims[userIP][coupon] = Date.now();
  console.log(`Coupon ${coupon} claimed by ${userIP}`);
  return res.json({ message: "Coupon claimed successfully!" });
});

// 🔹 Fetch Claimed Coupons
app.get("/claimed-coupons", (req, res) => {
  const userIP = getClientIP(req);
  console.log(`Fetching claimed coupons for ${userIP}`);

  return res.json({ claimedCoupons: Object.keys(ipClaims[userIP] || {}) });
});

// ✅ Run Express Locally
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.handler = serverless(app);
