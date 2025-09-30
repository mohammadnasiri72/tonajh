// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y'
  ],
  rules: {
    // 🔴 خطاهای سختگیرانه
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/react-in-jsx-scope': 'error',
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'no-debugger': 'error',
    
    // ⚠️ قوانین سختگیرانه اضافی
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': 'error',
    'no-duplicate-imports': 'error',
    
    // تنظیمات React
    'react/prop-types': 'error',
    'react/jsx-key': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};