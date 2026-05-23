## 🏢 Employee KYC System

A secure, production-ready React application for collecting and managing employee KYC (Know Your Customer) data including Aadhaar verification and linked mobile numbers.

### ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete employee records
- 🔐 **Data Security** - Aadhaar and mobile masking for sensitive information
- 👁️ **Toggle Visibility** - Reveal sensitive data only when needed
- ✓ **Form Validation** - Comprehensive validation with error messages
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS for a professional look
- 📋 **Compliance Ready** - Includes UIDAI and Indian data privacy guidelines

### 🚀 Quick Start

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/laxmanmane7304-art/owner.git
cd owner

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open automatically at `http://localhost:3000`

### 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 🗂️ Project Structure

```
owner/
├── index.html                 # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Root component
    ├── index.css            # Global styles
    └── components/
        └── EmployeeKYCApp.jsx # Main KYC component
```

### 🔐 Security Features

- **Data Masking**: Aadhaar shows only last 4 digits, Mobile shows first 2 & last 2 digits
- **Form Validation**:
  - Aadhaar: Exactly 12 digits
  - Mobile: 10 digits starting with 6-9
  - Name & Family Name: Non-empty
  - Address: Required field

- **UIDAI Compliance**:
  - Aadhaar data is masked in all displays
  - Consent collection recommended
  - Guidelines included in the UI

### 📋 Data Fields

| Field | Format | Example |
|-------|--------|---------|
| Employee Name | String (max 100) | Rahul Sharma |
| Family Name | String (max 100) | Sharma |
| Aadhaar | 12 Digits | 123456789012 |
| Mobile | 10 Digits (6-9...) | 9876543210 |
| Address | Text | 123 Main St, Mumbai |

### 🎯 Usage

1. **Add Employee**: Fill the form with employee details and click "Add"
2. **View Employees**: See all added employees in the table below
3. **Toggle Sensitive Data**: Click the eye icon to show/hide masked data
4. **Edit Employee**: Click "Edit" button to modify any record
5. **Delete Employee**: Click "Delete" to remove an employee (with confirmation)

### 💻 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Programming language

### 📚 Best Practices Implemented

- ✅ Form validation before submission
- ✅ Error handling and user feedback
- ✅ Responsive design principles
- ✅ Component-based architecture
- ✅ State management with React hooks
- ✅ Security-first data masking
- ✅ Accessibility considerations
- ✅ Clean, maintainable code

### 🔧 Customization

#### Change Port
Edit `vite.config.js`:
```javascript
server: {
  port: 5000, // Change to desired port
}
```

#### Modify Styling
Edit `src/index.css` or modify Tailwind classes in components

#### Add Database
Integrate with backend APIs in the form submission handler

### ⚖️ Compliance Notes

- **UIDAI Compliance**: Follows Unique Identification Authority of India guidelines
- **Data Privacy**: Implements Indian data privacy best practices
- **Security**: Recommendations for production deployment included

### 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
npm run dev -- --port 3001
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build failing?**
```bash
npm run build -- --force
```

### 📝 License

This project is open source and available under the MIT License.

### 👤 Author

Created by laxmanmane7304-art

### 📞 Support

For issues and questions, please create an issue in the repository.

---

**Last Updated**: May 2026
**Version**: 1.0.0
