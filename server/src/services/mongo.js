const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.once('error', () => {
    console.log('MongoDB error : ', error);
});

async function connectMongoDB() {
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
};

async function disconnectMongoDB() {
    await mongoose.disconnect();
};

module.exports = {
    connectMongoDB,
    disconnectMongoDB,
}