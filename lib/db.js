const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.NEXT_PUBLIC_local");
}

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!process.env.NEXT_PUBLIC_NODE_ENV === "development") {
  let globalWithMongoClientPromise = global;
  if (globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

module.exports = clientPromise;
