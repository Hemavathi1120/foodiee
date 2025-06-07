
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useToast } from '@/hooks/use-toast';

const MessageManagement = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: '1',
      name: 'Emma Thompson',
      email: 'emma@example.com',
      subject: 'Catering Inquiry',
      message: 'Hi, I would like to inquire about catering services for a corporate event of 50 people. Could you please provide more details about your packages?',
      status: 'unread',
      createdAt: new Date('2024-01-15T16:30:00')
    },
    {
      id: '2',
      name: 'David Chen',
      email: 'david@example.com',
      subject: 'Compliment',
      message: 'I had dinner at your restaurant last week and it was absolutely amazing! The wagyu tenderloin was perfectly cooked. Thank you for a wonderful experience.',
      status: 'read',
      createdAt: new Date('2024-01-14T14:20:00')
    },
    {
      id: '3',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      subject: 'Private Dining',
      message: 'Do you have private dining rooms available for a birthday celebration? We would need space for about 12 people on February 10th.',
      status: 'replied',
      createdAt: new Date('2024-01-13T10:15:00')
    }
  ]);

  const [replyModal, setReplyModal] = useState<{ isOpen: boolean; messageId: string }>({
    isOpen: false,
    messageId: ''
  });

  const updateMessageStatus = (id: string, status: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    ));
    
    if (status === 'replied') {
      toast({
        title: "Reply Sent",
        description: "Your reply has been sent successfully",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500/20 text-red-400';
      case 'read': return 'bg-yellow-500/20 text-yellow-400';
      case 'replied': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleReply = (messageId: string) => {
    updateMessageStatus(messageId, 'replied');
    setReplyModal({ isOpen: false, messageId: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-white">Message Management</h2>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {message.subject}
                </h3>
                <p className="text-gray-400">{message.name} • {message.email}</p>
                <p className="text-gray-500 text-sm">
                  {message.createdAt.toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(message.status)}`}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-gray-300 leading-relaxed">{message.message}</p>
            </div>

            <div className="flex gap-2">
              {message.status === 'unread' && (
                <Button 
                  size="sm" 
                  onClick={() => updateMessageStatus(message.id, 'read')}
                >
                  Mark as Read
                </Button>
              )}
              {message.status !== 'replied' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setReplyModal({ isOpen: true, messageId: message.id })}
                >
                  Reply
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Reply to Message</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleReply(replyModal.messageId);
            }}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Reply</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Type your reply here..."
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Send Reply</Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setReplyModal({ isOpen: false, messageId: '' })}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManagement;
