
interface RegisterData {
    name: string,
    email: string,
    password: string,
    street: string, 
    streetNumber: string,
    postalCode: string, 
    city: string
}

interface LoginData {
  email: string;
  password: string;
}
interface customerData {
  name: string;
  id: string;
  email: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
}

interface AuthData {
  isLoggedIn: boolean;
  logout?: () => void;
}

interface AuthValues<T> {
  isLoggedIn: boolean;
  customer: T | null;
  authorize: () => Promise<void>;
  logout: () => Promise<void>;
}
