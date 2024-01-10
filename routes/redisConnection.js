const redis = require("redis");
const client = redis.createClient({
    socket: {
        port:  process.env.REDIS_PORT,
        host:  process.env.REDIS_HOST,
    }
});

(async () => {
    await client.connect();
})();

console.log("Attempting to connect to redis");
client.on('connect', () => {
    console.log('Redis Connected!');
});

// Log any error that may occur to the console
client.on("error", (err) => {
    console.log(`Redis Error:${err}`);
});

module.exports = client;