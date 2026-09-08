
const mongoose = require('mongoose');

// Set strictQuery to avoid deprecation warnings
mongoose.set('strictQuery', true);

// Use environment variable if available, fallback to local Mongo
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

// Database name
const DB_NAME = process.env.DB_NAME || "stayhealthybeta1";

const connectToMongo = async (retryCount) => {
  const MAX_RETRIES = 3;
  const count = retryCount ?? 0;

  try {
    await mongoose.connect(mongoURI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.info(`✅ Connected to MongoDB: ${DB_NAME}`);
    return;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);

    const nextRetryCount = count + 1;
    if (nextRetryCount >= MAX_RETRIES) {
      throw new Error("Unable to connect to Mongo after retries!");
    }

    console.info(`🔄 Retrying connection... attempt ${nextRetryCount}`);
    return await connectToMongo(nextRetryCount);
  }
};

module.exports = connectToMongo;
