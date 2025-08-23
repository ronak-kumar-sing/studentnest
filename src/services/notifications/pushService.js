class PushService {
  constructor() {
    this.subscription = null;
    this.vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgYeQqMr_QMvRrMJZNfr-TBUjwBjGUZZUc6k0ZUIQl8VE';
  }

  // Check if push notifications are supported
  isSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported()) {
      throw new Error('Push notifications are not supported');
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  // Register service worker
  async registerServiceWorker() {
    if (!this.isSupported()) {
      throw new Error('Service workers are not supported');
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  }

  // Subscribe to push notifications
  async subscribe() {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Push notification permission denied');
      }

      const registration = await this.registerServiceWorker();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      this.subscription = subscription;
      console.log('Push subscription successful:', subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      throw error;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe() {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
        this.subscription = null;
        console.log('Push subscription cancelled');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Push unsubscribe failed:', error);
      throw error;
    }
  }

  // Show notification
  async showNotification(title, options = {}) {
    try {
      if (!this.isSupported()) {
        // Fallback to browser notification
        new Notification(title, options);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        ...options,
        icon: options.icon || '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        actions: [
          {
            action: 'view',
            title: 'View',
            icon: '/icons/view.png'
          },
          {
            action: 'close',
            title: 'Close',
            icon: '/icons/close.png'
          }
        ]
      });
    } catch (error) {
      console.error('Show notification failed:', error);

      // Fallback to simple notification
      if (Notification.permission === 'granted') {
        new Notification(title, options);
      }
    }
  }

  // Convert VAPID key
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Get current subscription
  getSubscription() {
    return this.subscription;
  }
}

// Create singleton instance
export const pushService = new PushService();
export default pushService;
