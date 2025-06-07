import { MenuItem } from './menuService';

export type OrderItem = {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
};

export type PreOrder = {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  pickupDate: string;
  pickupTime: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
};

type OrderSubscriber = (orders: PreOrder[]) => void;

class OrderService {
  private orders: PreOrder[] = [];
  private subscribers: OrderSubscriber[] = [];
  private readonly STORAGE_KEY = 'restaurant_preorders';

  constructor() {
    this.loadOrders();
  }

  private loadOrders() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.orders = JSON.parse(stored).map((order: PreOrder) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt)
      }));
    }
    this.notifySubscribers();
  }

  private saveOrders() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.orders));
    this.notifySubscribers();
  }

  subscribe(callback: OrderSubscriber) {
    this.subscribers.push(callback);
    callback([...this.orders]);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback([...this.orders]));
  }

  createOrder(order: Omit<PreOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
    const newOrder: PreOrder = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(newOrder);
    this.saveOrders();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: PreOrder['status']) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      this.saveOrders();
      return order;
    }
    return null;
  }
}

export const orderService = new OrderService();
