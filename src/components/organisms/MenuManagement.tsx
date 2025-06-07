import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useToast } from '@/hooks/use-toast';
import { useMenu } from '../../hooks/useMenu';

const MenuManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  console.log('MenuManagement: Current menu items:', menuItems.length);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'starter',
    dietary: [] as string[],
    image: '',
    availability: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('MenuManagement: Form submitted with data:', formData);
    
    if (editingItem) {
      updateMenuItem(editingItem.id, {
        ...formData,
        price: Number(formData.price)
      });
      toast({
        title: "Item Updated",
        description: "Menu item has been successfully updated",
      });
      setEditingItem(null);
    } else {
      const newItem = addMenuItem({
        ...formData,
        price: Number(formData.price)
      });
      console.log('MenuManagement: Added new item:', newItem);
      toast({
        title: "Item Added",
        description: "New menu item has been added successfully",
      });
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'starter',
      dietary: [],
      image: '',
      availability: true
    });
    setShowAddForm(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      dietary: item.dietary,
      image: item.image,
      availability: item.availability
    });
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    deleteMenuItem(id);
    toast({
      title: "Item Deleted",
      description: "Menu item has been removed",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif text-white">Menu Management</h2>
        <Button onClick={() => setShowAddForm(true)}>
          Add New Item
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="starter">Starter</option>
                <option value="main">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <Button type="submit">
                {editingItem ? 'Update Item' : 'Add Item'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                <span className="text-amber-400 font-bold">${item.price}</span>
              </div>
              <p className="text-gray-400 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-amber-500 text-black px-2 py-1 rounded-full text-xs">
                  {item.category}
                </span>
                {item.dietary.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
