
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
  image: string;
  availability: boolean;
};

type MenuSubscriber = (items: MenuItem[]) => void;

class MenuService {
  private menuItems: MenuItem[] = [];
  private subscribers: MenuSubscriber[] = [];
  private readonly STORAGE_KEY = 'restaurant_menu_items';

  constructor() {
    this.loadMenuItems();
  }

  private getDefaultMenuItems(): MenuItem[] {
    return [
      {
        id: 1,
        name: "Seared Wagyu Tenderloin",
        description: "Premium A5 Wagyu with truffle reduction and seasonal vegetables",
        price: 125,
        category: "main",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["gluten-free"],
        availability: true
      },
      {
        id: 2,
        name: "Mediterranean Sea Bass",
        description: "Fresh catch with olive tapenade, roasted tomatoes, and herb oil",
        price: 85,
        category: "main",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["pescatarian", "gluten-free"],
        availability: true
      },
      {
        id: 3,
        name: "Truffle Risotto",
        description: "Creamy arborio rice with black truffle shavings and parmesan",
        price: 65,
        category: "starter",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegetarian"],
        availability: true
      },
      {
        id: 4,
        name: "Chocolate Soufflé",
        description: "Dark chocolate soufflé with vanilla bean ice cream and gold leaf",
        price: 45,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegetarian"],
        availability: true
      },
      {
        id: 5,
        name: "Oysters Rockefeller",
        description: "Fresh Blue Point oysters with spinach, herbs, and hollandaise",
        price: 35,
        category: "starter",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["pescatarian", "gluten-free"],
        availability: true
      },
      {
        id: 6,
        name: "Vintage Wine Selection",
        description: "Curated selection of premium wines from our cellar",
        price: 25,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegan"],
        availability: true
      },
      {
        id: 7,
        name: "Lobster Bisque",
        description: "Rich and creamy lobster bisque with cognac and fresh herbs",
        price: 28,
        category: "starter",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["pescatarian"],
        availability: true
      },
      {
        id: 8,
        name: "Duck Confit",
        description: "Slow-cooked duck leg with cherry gastrique and roasted potatoes",
        price: 95,
        category: "main",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["gluten-free"],
        availability: true
      },
      {
        id: 9,
        name: "Seared Scallops",
        description: "Pan-seared scallops with cauliflower purée and pancetta",
        price: 75,
        category: "main",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["pescatarian", "gluten-free"],
        availability: true
      },
      {
        id: 10,
        name: "Beef Tartare",
        description: "Hand-cut prime beef with quail egg and traditional accompaniments",
        price: 42,
        category: "starter",
        image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["gluten-free"],
        availability: true
      },
      {
        id: 11,
        name: "Tiramisu",
        description: "Classic Italian dessert with espresso-soaked ladyfingers",
        price: 18,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegetarian"],
        availability: true
      },
      {
        id: 12,
        name: "Crème Brûlée",
        description: "Vanilla bean custard with caramelized sugar crust",
        price: 22,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegetarian", "gluten-free"],
        availability: true
      },
      {
        id: 13,
        name: "Craft Cocktails",
        description: "Artisanal cocktails crafted by our master mixologist",
        price: 18,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegan"],
        availability: true
      },
      {
        id: 14,
        name: "Fresh Artisan Coffee",
        description: "Single-origin coffee beans roasted to perfection",
        price: 8,
        category: "drinks",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["vegan"],
        availability: true
      },
      {
        id: 15,
        name: "Lamb Rack",
        description: "Herb-crusted rack of lamb with rosemary jus and ratatouille",
        price: 110,
        category: "main",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        dietary: ["gluten-free"],
        availability: true
      }
    ];
  }

  private loadMenuItems() {
    try {
      const storedItems = localStorage.getItem(this.STORAGE_KEY);
      if (storedItems) {
        this.menuItems = JSON.parse(storedItems);
        console.log('MenuService: Loaded menu items from localStorage:', this.menuItems.length);
      } else {
        this.menuItems = this.getDefaultMenuItems();
        this.saveMenuItems();
        console.log('MenuService: Initialized with default menu items:', this.menuItems.length);
      }
    } catch (error) {
      console.error('MenuService: Error loading menu items from localStorage:', error);
      this.menuItems = this.getDefaultMenuItems();
    }
  }

  private saveMenuItems() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.menuItems));
      console.log('MenuService: Saved menu items to localStorage:', this.menuItems.length);
    } catch (error) {
      console.error('MenuService: Error saving menu items to localStorage:', error);
    }
  }

  subscribe(callback: MenuSubscriber) {
    console.log('MenuService: New subscriber added');
    this.subscribers.push(callback);
    // Immediately call with current data
    callback([...this.menuItems]);
    
    // Return unsubscribe function
    return () => {
      console.log('MenuService: Subscriber removed');
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    console.log('MenuService: Notifying subscribers, total:', this.subscribers.length);
    console.log('MenuService: Current menu items count:', this.menuItems.length);
    this.subscribers.forEach(callback => callback([...this.menuItems]));
  }

  getMenuItems(): MenuItem[] {
    return [...this.menuItems];
  }

  addMenuItem(item: Omit<MenuItem, 'id'>) {
    const newItem = {
      ...item,
      id: Date.now()
    };
    console.log('MenuService: Adding new item:', newItem);
    this.menuItems.push(newItem);
    this.saveMenuItems();
    this.notifySubscribers();
    return newItem;
  }

  updateMenuItem(id: number, updates: Partial<MenuItem>) {
    const index = this.menuItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.menuItems[index] = { ...this.menuItems[index], ...updates };
      console.log('MenuService: Updated item:', this.menuItems[index]);
      this.saveMenuItems();
      this.notifySubscribers();
      return this.menuItems[index];
    }
    return null;
  }

  deleteMenuItem(id: number) {
    const beforeLength = this.menuItems.length;
    this.menuItems = this.menuItems.filter(item => item.id !== id);
    console.log('MenuService: Deleted item, items before:', beforeLength, 'after:', this.menuItems.length);
    this.saveMenuItems();
    this.notifySubscribers();
  }
}

export const menuService = new MenuService();
export type { MenuItem };
