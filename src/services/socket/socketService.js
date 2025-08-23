import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.connectionStatus = 'disconnected';
    this.listeners = new Map();

    // Log that socket is disabled
    console.log('🚫 Socket Service initialized in DISABLED mode for content work');
  }

  connect(userId, userType) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket connection disabled for content work');
    this.connectionStatus = 'disconnected'; // Keep disconnected status
    return false; // Return false to indicate no connection
  }

  disconnect() {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket disconnect disabled for content work');
    this.connectionStatus = 'disconnected';
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('� Socket emit disabled for content work:', event, data);
    // Skip all socket emissions and mock responses
  }

  trigger(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  handleMockServerResponses(event, data) {
    // Simulate server responses for demo purposes
    switch (event) {
      case 'sendMessage':
        setTimeout(() => {
          const response = {
            ...data,
            id: `msg_${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: 'sent'
          };
          this.trigger('messageStatusUpdate', {
            id: response.id,
            status: 'delivered'
          });
        }, 500);
        break;

      case 'startTyping':
        // Simulate other user typing response
        setTimeout(() => {
          this.trigger('userTyping', {
            chatId: data.chatId,
            userId: 'mock_user',
            userName: 'Mock User',
            isTyping: true
          });
        }, 1000);
        break;

      case 'markAsRead':
        this.trigger('messageStatusUpdate', {
          id: data.messageId,
          status: 'read'
        });
        break;

      default:
        break;
    }
  }

  // Message methods
  async sendMessage({ chatId, recipientId, content, type = 'text' }) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket sendMessage disabled for content work');

    // Return immediate mock response
    return {
      chatId,
      recipientId,
      content,
      type,
      timestamp: new Date().toISOString(),
      id: `msg_${Date.now()}`,
      status: 'sent'
    };
  }

  startTyping(chatId, recipientId) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket startTyping disabled for content work');
  }

  stopTyping(chatId, recipientId) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket stopTyping disabled for content work');
  }

  markAsRead(messageId) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket markAsRead disabled for content work');
  }

  joinChat(chatId) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket joinChat disabled for content work');
  }

  leaveChat(chatId) {
    // SOCKET DISABLED FOR CONTENT WORK
    console.log('🚫 Socket leaveChat disabled for content work');
  }

  // Connection status
  getConnectionStatus() {
    return 'disconnected'; // Always return disconnected
  }

  isConnected() {
    return false; // Always return false when disabled
  }
}

// Create singleton instance
export const socketService = new SocketService();
export default socketService;
