module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:@tanstack/query/recommended'],
  rules: {
    'react-hooks/immutability': 'error',
    'react-hooks/purity': 'error',
    'react-hooks/set-state-in-render': 'error',
    'react-hooks/set-state-in-effect': 'error',
    'react-hooks/preserve-manual-memoization': 'error',
    'react-hooks/static-components': 'error',
    'react-hooks/refs': 'error',
    'react-hooks/globals': 'error',
  },
};
