const fs = require("fs").promises;

const getOrders = async (req, res) => {
  try {
    const data = await fs.readFile("././data/orders.json", "utf8");
    res.status(200).json(JSON.parse(data));
    console.log(data)
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getOrders };
