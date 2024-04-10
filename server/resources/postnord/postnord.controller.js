const axios = require("axios");

const getServicePoints = async (req, res) => {
  try {
    // const { postalCode, street, streetNumber } = req.session.customer;
    const apiKey = process.env.POSTNORD_KEY;
    const postalCode = "70224"
    const street = "Kungsgatan"
    const streetNumber = "35"
    const city = "Örebro"

    const url = `https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?apikey=${apiKey}&returnType=json&countryCode=SE&agreementCountry=SE&city=${city}&postalCode=${postalCode}&streetName=${street}&streetNumber=${streetNumber}&numberOfServicePoints=10&srId=EPSG:4326&context=optionalservicepoint&responseFilter=public&typeId=24,25,54&callback=jsonp`;

    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getServicePoints,
};
