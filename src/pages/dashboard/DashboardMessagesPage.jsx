import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import MessageSection from '../../components/dashboard/MessageSection'

const DashboardMessagesPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link
              to="/dashboard"
              className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Messages Overview</h1>
              <p className="text-white/70 mt-1">Manage all your property-related conversations in one place.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MessageSection />
        </motion.div>

        {/* Quick Link to Full Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Need the Full Chat Experience?</h3>
            <p className="text-white/70 mb-4">
              Access the complete messaging interface with real-time chat, file sharing, and advanced features.
            </p>
            <Link
              to="/messages"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              Open Full Messages App
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardMessagesPage
