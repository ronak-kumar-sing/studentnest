import { createContext, useContext, useState, useEffect } from 'react'

const SavedRoomsContext = createContext()

export const useSavedRooms = () => {
  const context = useContext(SavedRoomsContext)
  if (!context) {
    throw new Error('useSavedRooms must be used within a SavedRoomsProvider')
  }
  return context
}

export const SavedRoomsProvider = ({ children }) => {
  const [savedRooms, setSavedRooms] = useState([])
  const [toastMessage, setToastMessage] = useState(null)

  // Load saved rooms from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedRooms')
    if (saved) {
      try {
        setSavedRooms(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse saved rooms:', error)
        setSavedRooms([])
      }
    }
  }, [])

  // Save to localStorage whenever savedRooms changes
  useEffect(() => {
    localStorage.setItem('savedRooms', JSON.stringify(savedRooms))
  }, [savedRooms])

  const saveRoom = (room) => {
    setSavedRooms(prev => {
      if (prev.find(r => r.id === room.id)) {
        setToastMessage({ type: 'info', message: 'Room already saved!' })
        return prev // Room already saved
      }
      setToastMessage({ type: 'success', message: 'Room saved successfully!' })
      return [...prev, { ...room, savedAt: new Date().toISOString() }]
    })
  }

  const unsaveRoom = (roomId) => {
    setSavedRooms(prev => {
      const filtered = prev.filter(room => room.id !== roomId)
      if (filtered.length !== prev.length) {
        setToastMessage({ type: 'success', message: 'Room removed from saved list!' })
      }
      return filtered
    })
  }

  const isRoomSaved = (roomId) => {
    return savedRooms.some(room => room.id === roomId)
  }

  const toggleSaveRoom = (room) => {
    if (isRoomSaved(room.id)) {
      unsaveRoom(room.id)
    } else {
      saveRoom(room)
    }
  }

  const clearAllSavedRooms = () => {
    setSavedRooms([])
    setToastMessage({ type: 'success', message: 'All saved rooms cleared!' })
  }

  const value = {
    savedRooms,
    saveRoom,
    unsaveRoom,
    isRoomSaved,
    toggleSaveRoom,
    clearAllSavedRooms,
    toastMessage,
    setToastMessage
  }

  return (
    <SavedRoomsContext.Provider value={value}>
      {children}
    </SavedRoomsContext.Provider>
  )
}

export default SavedRoomsContext
