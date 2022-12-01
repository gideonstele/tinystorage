module.exports = {
  root: true,
  extends: ['custom'],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      "files": ["./scripts/**/*"],
      parserOptions: {
        project: "./scripts/tsconfig.json",
      },
    }
  ]
}
