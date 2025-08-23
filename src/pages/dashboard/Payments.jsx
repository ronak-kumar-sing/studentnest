import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Banknote,
  Smartphone,
  RefreshCw,
  Eye,
  MoreHorizontal
} from 'lucide-react'

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [filteredPayments, setFilteredPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [stats, setStats] = useState({})

  // Mock data
  const mockPayments = [
    {
      id: 'PAY001',
      studentName: 'Rahul Kumar',
      roomTitle: 'Single Room A1 - Andheri',
      amount: 18000,
      type: 'Monthly Rent',
      paymentMethod: 'UPI',
      status: 'completed',
      transactionId: 'TXN123456789',
      date: '2025-08-20T10:30:00Z',
      dueDate: '2025-08-25T00:00:00Z',
      lateFee: 0,
      receiptUrl: '/receipts/PAY001.pdf'
    },
    {
      id: 'PAY002',
      studentName: 'Priya Singh',
      roomTitle: 'Double Room B3 - Bandra',
      amount: 50000,
      type: 'Security Deposit',
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      transactionId: 'TXN123456790',
      date: '2025-08-19T14:15:00Z',
      dueDate: '2025-08-19T00:00:00Z',
      lateFee: 0,
      receiptUrl: '/receipts/PAY002.pdf'
    },
    {
      id: 'PAY003',
      studentName: 'Amit Patel',
      roomTitle: 'Single Room C2 - Powai',
      amount: 22000,
      type: 'Monthly Rent',
      paymentMethod: 'Credit Card',
      status: 'pending',
      transactionId: null,
      date: null,
      dueDate: '2025-08-22T00:00:00Z',
      lateFee: 200,
      receiptUrl: null
    },
    {
      id: 'PAY004',
      studentName: 'Sneha Sharma',
      roomTitle: 'Double Room D1 - Juhu',
      amount: 25000,
      type: 'Monthly Rent',
      paymentMethod: 'UPI',
      status: 'failed',
      transactionId: 'TXN123456791',
      date: '2025-08-18T09:45:00Z',
      dueDate: '2025-08-18T00:00:00Z',
      lateFee: 500,
      receiptUrl: null
    },
    {
      id: 'PAY005',
      studentName: 'Karan Verma',
      roomTitle: 'Shared Room E2 - Santacruz',
      amount: 12000,
      type: 'Monthly Rent',
      paymentMethod: 'Wallet',
      status: 'completed',
      transactionId: 'TXN123456792',
      date: '2025-08-17T16:20:00Z',
      dueDate: '2025-08-20T00:00:00Z',
      lateFee: 0,
      receiptUrl: '/receipts/PAY005.pdf'
    }
  ]

  const mockStats = {
    totalRevenue: 127000,
    pendingAmount: 47200,
    completedPayments: 15,
    pendingPayments: 3,
    monthlyGrowth: 12.5,
    averagePayment: 21400
  }

  useEffect(() => {
    setPayments(mockPayments)
    setFilteredPayments(mockPayments)
    setStats(mockStats)
  }, [])

  useEffect(() => {
    let filtered = payments

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.roomTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter)
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date()
      const daysAgo = {
        '7days': 7,
        '30days': 30,
        '90days': 90
      }[dateRange]

      if (daysAgo) {
        const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(payment =>
          payment.date && new Date(payment.date) >= cutoffDate
        )
      }
    }

    setFilteredPayments(filtered)
  }, [payments, searchTerm, statusFilter, dateRange])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-zinc-100 text-zinc-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      case 'processing':
        return <RefreshCw className="w-4 h-4" />
      default:
        return null
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return <Smartphone className="w-4 h-4" />
      case 'credit card':
      case 'debit card':
        return <CreditCard className="w-4 h-4" />
      case 'bank transfer':
        return <Banknote className="w-4 h-4" />
      case 'wallet':
        return <Smartphone className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not paid'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const exportPayments = () => {
    // Mock export functionality
    console.log('Exporting payments...', filteredPayments)
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white/70" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Payment Management</h1>
                <p className="text-white/70">Track and manage all payments</p>
              </div>
            </div>
            <button
              onClick={exportPayments}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-zinc-900">
                  ₹{(stats.totalRevenue / 1000).toFixed(0)}K
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{stats.monthlyGrowth}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600 mb-1">Pending Amount</p>
                <p className="text-2xl font-bold text-zinc-900">
                  ₹{(stats.pendingAmount / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-orange-600 mt-2">
                  {stats.pendingPayments} payments due
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-zinc-900">{stats.completedPayments}</p>
                <p className="text-sm text-green-600 mt-2">This month</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-600 mb-1">Average Payment</p>
                <p className="text-2xl font-bold text-zinc-900">
                  ₹{(stats.averagePayment / 1000).toFixed(1)}K
                </p>
                <p className="text-sm text-zinc-600 mt-2">Per transaction</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by student name, room, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="processing">Processing</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Room</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Payment Method</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-zinc-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-zinc-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-zinc-900">{payment.studentName}</p>
                        <p className="text-sm text-zinc-600">{payment.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-900">{payment.roomTitle}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-zinc-900">
                          ₹{payment.amount.toLocaleString()}
                        </p>
                        {payment.lateFee > 0 && (
                          <p className="text-sm text-red-600">
                            +₹{payment.lateFee} late fee
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {payment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="text-sm text-zinc-900">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-zinc-900">{formatDate(payment.date)}</p>
                        <p className="text-xs text-zinc-500">
                          Due: {formatDate(payment.dueDate)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {payment.receiptUrl && (
                          <button
                            className="p-1 hover:bg-zinc-200 rounded transition-colors"
                            title="View Receipt"
                          >
                            <Eye className="w-4 h-4 text-zinc-600" />
                          </button>
                        )}
                        <button
                          className="p-1 hover:bg-zinc-200 rounded transition-colors"
                          title="More Options"
                        >
                          <MoreHorizontal className="w-4 h-4 text-zinc-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">No payments found</h3>
              <p className="text-zinc-600">
                {searchTerm || statusFilter !== 'all' || dateRange !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No payment records yet'}
              </p>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {filteredPayments.slice(0, 5).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">{payment.studentName}</p>
                      <p className="text-sm text-zinc-600">{payment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-zinc-900">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-zinc-600">{formatDate(payment.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {['UPI', 'Bank Transfer', 'Credit Card', 'Wallet'].map((method) => {
                const count = filteredPayments.filter(p => p.paymentMethod === method && p.status === 'completed').length
                const percentage = filteredPayments.length > 0 ? (count / filteredPayments.filter(p => p.status === 'completed').length) * 100 : 0

                return (
                  <div key={method} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getPaymentMethodIcon(method)}
                      <span className="text-zinc-900">{method}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-zinc-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-zinc-600 w-12 text-right">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
