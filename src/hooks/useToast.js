import { useCallback } from 'react'
import { useNotification } from '../contexts/NotificationContext'

export const useToast = () => {
  const { showToast: showNotificationToast } = useNotification()

  const showToast = useCallback((options) => {
    // Support both string message and object options
    if (typeof options === 'string') {
      showNotificationToast({
        message: options,
        type: 'info'
      })
    } else {
      showNotificationToast(options)
    }
  }, [showNotificationToast])

  // Legacy support for the old API
  const showSuccess = useCallback((message, duration = 3000) => {
    showNotificationToast({
      message,
      type: 'success',
      duration
    })
  }, [showNotificationToast])

  const showError = useCallback((message, duration = 3000) => {
    showNotificationToast({
      message,
      type: 'error',
      duration
    })
  }, [showNotificationToast])

  const showInfo = useCallback((message, duration = 3000) => {
    showNotificationToast({
      message,
      type: 'info',
      duration
    })
  }, [showNotificationToast])

  const showWarning = useCallback((message, duration = 3000) => {
    showNotificationToast({
      message,
      type: 'warning',
      duration
    })
  }, [showNotificationToast])

  // Legacy component for backwards compatibility
  const ToastComponent = () => null

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    ToastComponent
  }
}
