module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    describe: true,
    expect: true,
    it: true,
    jest: true
  },
  env: {
   browser: true,
  },
  rules: {
   indent: 0,
   'no-tabs': 0,
   'eol-last': ['error', 'always'],
   'no-underscore-dangle': 0,
   'no-console': 0,
   'import/no-cycle': "off",
   'import/prefer-default-export': "off",
   'react/jsx-indent': 0,
   'react/jsx-indent-props': 0,
   'react/jsx-filename-extension': 0,
   'react/forbid-prop-types': 0,
   'react/jsx-props-no-spreading': "off",
   'react/prop-types': 0,
   'react/require-default-props': 0,
   "@typescript-eslint/explicit-function-return-type": "off",
   "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": true
      }
    ],
    "import/extensions": [
      "error",
      "always",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never"
      }
    ]
  },
  settings: {
    'import/extensions': [".js",".jsx",".ts",".tsx"],
    'import/parsers': {
      '@typescript-eslint/parser': [".ts",".tsx"]
     },
    'import/resolver': {
      'node': {
        'extensions': [".js",".jsx",".ts",".tsx"]
      }
    }
  }
};
