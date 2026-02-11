// frontend/src/components/common/PasswordInput.jsx
import { useState } from 'react'

const PasswordInput = ({ 
  value, 
  onChange, 
  name = "password",
  label = "Password",
  showStrength = true,
  required = true 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState([])

  const validatePassword = (password) => {
    const checks = []
    
    if (password.length < 8) {
      checks.push("At least 8 characters")
    }
    if (!/[A-Z]/.test(password)) {
      checks.push("One uppercase letter (A-Z)")
    }
    if (!/[a-z]/.test(password)) {
      checks.push("One lowercase letter (a-z)")
    }
    if (!/\d/.test(password)) {
      checks.push("One number (0-9)")
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/]/.test(password)) {
      checks.push("One special character (!@#$%^&* etc.)")
    }
    if (password.length > 72) {
      checks.push("Maximum 72 characters")
    }

    setErrors(checks)
    return checks.length === 0
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    if (showStrength) {
      validatePassword(newValue)
    }
    onChange(e)
  }

  const getStrengthColor = () => {
    const strength = 6 - errors.length
    if (strength <= 2) return 'text-red-600'
    if (strength <= 4) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getStrengthText = () => {
    const strength = 6 - errors.length
    if (strength === 0) return 'Very Weak'
    if (strength <= 2) return 'Weak'
    if (strength <= 4) return 'Medium'
    if (strength === 5) return 'Strong'
    return 'Very Strong'
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500">Strength:</span>
            <span className={`text-xs font-medium ${getStrengthColor()}`}>
              {getStrengthText()}
            </span>
          </div>
          
          {errors.length > 0 && (
            <div className="text-xs text-gray-600 space-y-0.5">
              <p className="font-medium">Required:</p>
              {errors.map((error, idx) => (
                <p key={idx} className="text-red-600">• {error}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PasswordInput