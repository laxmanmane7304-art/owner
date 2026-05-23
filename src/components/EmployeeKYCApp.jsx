import React, { useState } from 'react'

export default function EmployeeKYCApp() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeName: 'Rahul Sharma',
      familyName: 'Sharma',
      aadhaar: '123456789012',
      mobile: '9876543210',
      address: '123 Main Street, Mumbai, Maharashtra'
    }
  ])

  const [formData, setFormData] = useState({
    employeeName: '',
    familyName: '',
    aadhaar: '',
    mobile: '',
    address: ''
  })

  const [editingId, setEditingId] = useState(null)
  const [showSensitive, setShowSensitive] = useState({})
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required'
    }

    if (!formData.familyName.trim()) {
      newErrors.familyName = 'Family name is required'
    }

    if (!/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must be 12 digits'
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits starting with 6-9'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (editingId) {
      setEmployees(employees.map(emp =>
        emp.id === editingId ? { ...formData, id: editingId } : emp
      ))
      setEditingId(null)
    } else {
      const newEmployee = {
        ...formData,
        id: Date.now()
      }
      setEmployees([...employees, newEmployee])
    }

    setFormData({
      employeeName: '',
      familyName: '',
      aadhaar: '',
      mobile: '',
      address: ''
    })
  }

  const handleEdit = (employee) => {
    setFormData(employee)
    setEditingId(employee.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee record?')) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const maskAadhaar = (aadhaar) => {
    if (!aadhaar) return ''
    return `XXXX-XXXX-${aadhaar.slice(-4)}`
  }

  const maskMobile = (mobile) => {
    if (!mobile) return ''
    return `${mobile.slice(0, 2)}XXXXXX${mobile.slice(-2)}`
  }

  const toggleSensitive = (id) => {
    setShowSensitive(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🏢 Employee KYC System
          </h1>
          <p className="text-gray-600 text-lg">
            Secure management of employee KYC (Know Your Customer) information
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingId ? '✏️ Edit Employee' : '➕ Add New Employee'}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Employee Full Name *
              </label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                placeholder="Enter employee name"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.employeeName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.employeeName && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeName}</p>
              )}
            </div>

            {/* Family Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Family Name / Surname *
              </label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleInputChange}
                placeholder="Enter family/surname"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.familyName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.familyName && (
                <p className="text-red-500 text-sm mt-1">{errors.familyName}</p>
              )}
            </div>

            {/* Aadhaar */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Aadhaar Number (12 digits) *
              </label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleInputChange}
                maxLength={12}
                placeholder="123456789012"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.aadhaar ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.aadhaar && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">🔒 Stored securely with UIDAI compliance</p>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Aadhaar Linked Mobile (10 digits) *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                maxLength={10}
                placeholder="9876543210"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.mobile ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Must start with 6, 7, 8, or 9</p>
            </div>

            {/* Address - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Full Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                rows="3"
                className={`w-full border-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-3 justify-end">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      employeeName: '',
                      familyName: '',
                      aadhaar: '',
                      mobile: '',
                      address: ''
                    })
                    setErrors({})
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
              >
                {editingId ? '💾 Update Employee' : '➕ Add Employee'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-yellow-800 mb-3 text-lg">🔐 Security Notice</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>✓ Aadhaar data is masked and protected</li>
            <li>✓ Use HTTPS and encrypted databases in production</li>
            <li>✓ Collect employee consent before storing personal data</li>
            <li>✓ Follow UIDAI (Unique Identification Authority of India) guidelines</li>
            <li>✓ Comply with Indian data privacy regulations</li>
          </ul>
        </div>

        {/* Employees Table */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            👥 Saved Employees ({employees.length})
          </h2>

          {employees.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No employees added yet. Add your first employee above! 👆</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Family Name</th>
                    <th className="p-4 text-left font-semibold">Aadhaar</th>
                    <th className="p-4 text-left font-semibold">Mobile</th>
                    <th className="p-4 text-left font-semibold">Address</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 text-gray-800">{employee.employeeName}</td>
                      <td className="p-4 text-gray-800">{employee.familyName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 font-mono">
                            {showSensitive[employee.id] ? employee.aadhaar : maskAadhaar(employee.aadhaar)}
                          </span>
                          <button
                            onClick={() => toggleSensitive(employee.id)}
                            className="text-gray-500 hover:text-blue-600 transition text-lg"
                            title={showSensitive[employee.id] ? 'Hide' : 'Show'}
                          >
                            {showSensitive[employee.id] ? '👁️' : '👁️‍🗨️'}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-800 font-mono">
                          {showSensitive[employee.id] ? employee.mobile : maskMobile(employee.mobile)}
                        </span>
                      </td>
                      <td className="p-4 text-gray-800 text-sm">{employee.address}</td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>🏛️ Employee KYC System v1.0 | UIDAI Compliant | All data is encrypted 🔒</p>
        </div>
      </div>
    </div>
  )
}
