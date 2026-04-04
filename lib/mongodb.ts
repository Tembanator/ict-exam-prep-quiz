import mongoose, { Mongoose } from "mongoose";
const dns = require("dns");
// Force Node to use Google DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// --- Type Declaration for Global Object ---
// This tells TypeScript what structure to expect on `global.mongoose`
declare global {
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined; // Use `var` for global scope and allow `undefined` initially
}
// ------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// ⚠️ Note the type assertion `as any` or a slightly safer approach below
let cached = global.mongoose;

if (!cached) {
  // Initialize if not present
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) {
    // Use non-null assertion since we've checked/initialized
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Make sure to use `mongoose.connect` with `Mongoose` import
    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  cached!.conn = await cached!.promise;
  console.log("Connected to database!!!");
  return cached!.conn;
}

export default dbConnect;
