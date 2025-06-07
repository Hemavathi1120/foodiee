import { database } from '../config/firebase';
import { ref, push, set, onValue, DataSnapshot, remove } from 'firebase/database';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: number;
}

export const storeContactMessage = async (message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
  const messageRef = ref(database, 'contact-messages');
  const newMessageRef = push(messageRef);
  
  const newMessage: ContactMessage = {
    ...message,
    status: 'unread',
    createdAt: Date.now()
  };

  await set(newMessageRef, newMessage);
  return { ...newMessage, id: newMessageRef.key };
};

export const subscribeToContactMessages = (callback: (messages: ContactMessage[]) => void) => {
  const messagesRef = ref(database, 'contact-messages');
  
  const unsubscribe = onValue(messagesRef, (snapshot: DataSnapshot) => {
    const messages: ContactMessage[] = [];
    snapshot.forEach((childSnapshot: DataSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(messages.sort((a, b) => b.createdAt - a.createdAt));
  });

  return unsubscribe;
};

export const updateMessageStatus = async (messageId: string, status: ContactMessage['status']) => {
  const messageRef = ref(database, `contact-messages/${messageId}/status`);
  await set(messageRef, status);
};

export const deleteMessage = async (messageId: string) => {
  const messageRef = ref(database, `contact-messages/${messageId}`);
  await remove(messageRef);
};
