
import { useState, useEffect } from 'react';
import { menuService, MenuItem } from '../services/menuService';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    console.log('useMenu: Setting up subscription');
    const unsubscribe = menuService.subscribe((items) => {
      console.log('useMenu: Received menu items update:', items.length);
      setMenuItems(items);
    });
    return unsubscribe;
  }, []);

  return {
    menuItems,
    addMenuItem: (item: Omit<MenuItem, 'id'>) => {
      console.log('useMenu: Adding menu item via hook');
      return menuService.addMenuItem(item);
    },
    updateMenuItem: (id: number, updates: Partial<MenuItem>) => {
      console.log('useMenu: Updating menu item via hook');
      return menuService.updateMenuItem(id, updates);
    },
    deleteMenuItem: (id: number) => {
      console.log('useMenu: Deleting menu item via hook');
      return menuService.deleteMenuItem(id);
    }
  };
};
