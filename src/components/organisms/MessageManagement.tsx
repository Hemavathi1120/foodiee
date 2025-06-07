import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { useToast } from '@/hooks/use-toast';
import { 
  ContactMessage, 
  subscribeToContactMessages, 
  updateMessageStatus, 
  deleteMessage 
} from '../../services/realtimeService';

const MessageManagement = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [replyModal, setReplyModal] = useState<{ isOpen: boolean; messageId: string }>({
    isOpen: false,
    messageId: ''
  });

  useEffect(() => {
    const unsubscribe = subscribeToContactMessages((updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id: string, status: ContactMessage['status']) => {
    try {
      await updateMessageStatus(id, status);
      toast({
        title: "Status Updated",
        description: `Message marked as ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
      toast({
        title: "Message Deleted",
        description: "Message has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
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
    handleUpdateStatus(messageId, 'replied');
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
                  onClick={() => handleUpdateStatus(message.id, 'read')}
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
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleDelete(message.id)}
              >
                Delete
              </Button>
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
