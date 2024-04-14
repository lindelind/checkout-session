
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

interface OrderData {
  servicePoint: any;
  products: number | string,
  quantity: number,
  id: string;
  description: string,
  price: {
    unit_amount: number;
  };

  total: number;
  orderNumber: string;
  date: Date;
  customerName: string;
  customerEmail: string;
}

interface ServicePoint {
  servicePointId: string;
  name: string;
  deliveryAddress: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
  };
}