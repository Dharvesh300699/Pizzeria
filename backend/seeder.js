const dotenv = require("dotenv");
const User = require("./models/userModel");
const Pizza = require("./models/pizzaModel");
const users = require("./data/users");
const pizzas = require("./data/pizzas");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Pizza.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePizzas = pizzas.map((pizza) => {
      return { ...pizza, user: adminUser };
    });

    await Pizza.insertMany(samplePizzas);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Pizza.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
