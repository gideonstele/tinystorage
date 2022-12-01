module.exports = {
  '**/*.ts': () => ['pnpm run -r typecheck', 'pnpm run -r lint:fix'],
}
