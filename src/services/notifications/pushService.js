// Push Service - DISABLED FOR CONTENT WORK
// All methods are disabled to prevent Service Worker registration errors

class PushService {
  constructor() {
    this.isEnabled = false;
    console.log('🚫 Push Service initialized in disabled mode');
  }

  async subscribe() {
    console.log('🚫 Push service subscribe disabled for content work');
    return null;
  }

  async unsubscribe() {
    console.log('🚫 Push service unsubscribe disabled for content work');
    return true;
  }

  async showNotification(title, options = {}) {
    console.log('🚫 Push notification disabled for content work:', title);
    return false;
  }

  async requestPermission() {
    console.log('🚫 Push permission request disabled for content work');
    return 'denied';
  }

  async getSubscription() {
    console.log('🚫 Push subscription check disabled for content work');
    return null;
  }

  isSupported() {
    return false; // Always return false in disabled mode
  }
}

// Create singleton instance
const pushService = new PushService();

// Export both named and default
export { pushService };
export default pushService;
