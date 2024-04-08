
const fetchCustomers = require("../../utils/fetchCustomers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const initStripe = require("../../utils/stripe");

const register = async (req, res) => {
  const { name, email, password } = req.body;
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
  };

  //add new customer to stripe
  const stripe = initStripe();
  const addCustomer = await stripe.customers.create({
    name: stripeCustomer.name,
    email: stripeCustomer.email,
  });

  const customerId = addCustomer.id;

//   req.session.customer = { id: customerId, name, email, password: hashedPassword };

  //spara till js-filen
  const newCustomer = {
    id: customerId,
    name,
    email,
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