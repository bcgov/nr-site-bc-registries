module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'standard',
    // Must be last: disables every ESLint stylistic rule (semi, quotes,
    // indent, comma-dangle, ...) that conflicts with .prettierrc, so `lint`
    // and `format:check` (run back-to-back in CI) don't fight each other.
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  settings: {
    // Matches tsconfig.json's baseUrl: "./", which is how TypeScript itself
    // resolves bare imports like 'utils/constants' — without this, the
    // import/no-unresolved rule doesn't know where to look for them.
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.']
      }
    }
  },
  rules: {
    // NestJS DI relies on TypeScript parameter properties
    // (`constructor(private readonly x: X) {}`), which the base rule
    // doesn't recognize and flags as an empty/useless constructor.
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    // Off entirely: TypeORM entity/DTO properties mirror snake_case DB
    // column names (e.g. site_id, address_1), and the `properties: 'never'`
    // escape hatch doesn't recognize TS class field declarations anyway.
    camelcase: 'off',
    // Off: several services bolt ad-hoc properties onto typed entities at
    // runtime (e.g. entry['qna'] on a Srprofil) specifically to bypass
    // TypeScript's structural typing. The dot-notation autofix rewrites
    // these to entry.qna, which then fails to compile — tsc has no 'qna'
    // property on Srprofil, even though the rule considers the rewrite safe.
    'dot-notation': 'off'
  }
}
