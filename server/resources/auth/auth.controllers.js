
const fetchCustomers = require("../../utils/fetchCustomers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const initStripe = require("../../utils/stripe");

const register = async (req, res) => {
  const { name, email, password, street, streetNumber, postalCode, city } = req.body;
  //kolla så användare inte redan finns
  const customers = await fetchCustomers();
  const customerAlreadyExists = customers.find((c) => c.email === email);

  if (customerAlreadyExists) {
    return res.status(400).json("Customer already exists");
  }

  //kryptera lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  const stripeCustomer = {
    name,
    email,
    address: {
      street,
      streetNumber,
      postalCode,
      city,
    },
  };

  //add new customer to stripe
  const stripe = initStripe();
  const addCustomer = await stripe.customers.create({
    name: stripeCustomer.name,
    email: stripeCustomer.email,
    address: {
    line1: stripeCustomer.address.street,
    line2: stripeCustomer.address.streetNumber,
    postal_code: stripeCustomer.address.postalCode,
    city: stripeCustomer.address.city
    }
  });

  const customerId = addCustomer.id;

  //spara till js-filen
  const newCustomer = {
    id: customerId,
    name,
    email,
    street,
    streetNumber,
    postalCode,
    city,
    password: hashedPassword,
  };

  customers.push(newCustomer);
  await fs.writeFile("./data/customers.json", JSON.stringify(customers, null, 2));

  //skicka tillbaka ett svar

  res.status(201).json(newCustomer.email);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customers = await fetchCustomers();
  const customerExists = customers.find((c) => c.email === email);

  //kolla så lösenordet stämmer och att användaren finns

  if (!customerExists || !(await bcrypt.compare(password, customerExists.password))) {
    return res.status(400).json("Wrong customer or password");
  }
  //Skapa en session
  req.session.customer = customerExists;

  //skicka tillbaka ett svar
  res.status(200).json(customerExists);
  console.log(req.session.customer);
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json("Successfully logged out");
};

const authorize = (req, res) => {
  if (!req.session.customer) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session.customer);
};

module.exports = { register, login, logout, authorize };