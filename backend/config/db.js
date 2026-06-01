const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB povezan: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Greška pri povezivanju sa bazom: ${error.message}`);
    process.exit(1); // Prekida rad aplikacije ako povezivanje ne uspe
  }
};

module.exports = connectDB;