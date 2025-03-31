module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-deprecated-destroyed-lifecycle': 'off',
    'vue/no-deprecated-dollar-scopedslots-api': 'off',
    'vue/multi-word-component-names': 'off'
  }
} 