import fs from 'fs-extra'
import path from 'node:path'
import { RollupOptions, Plugin } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import sourceMaps from 'rollup-plugin-sourcemaps'

const isDev = process.env.BUILD !== 'production'

const fileResolve = (p: string) => path.resolve(__dirname, p)

const pkg = fs.readJSONSync(fileResolve('../package.json'), {
  encoding: 'utf8',
})

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const inputPath = fileResolve('../src/index.ts')

const tsPathPlugin = typescriptPaths({
  preserveExtensions: true,
  tsConfigPath: '../tsconfig.json',
})

const esbuildPlugin = esbuild({
  minify: !isDev,
  tsconfig: '../tsconfig.json',
})

const plugins: Plugin[] = [
  nodeResolve({ extensions: ['.js', '.ts', '.json'] }),
  commonjs(),
  replace({
    preventAssignment: true,
    __VERSION__: JSON.stringify(pkg.version),
  }),
  tsPathPlugin,
]

const cjsOption: RollupOptions = {
  input: [inputPath],
  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  external,
  plugins: [...plugins, esbuildPlugin],
}

const esmOptions: RollupOptions = {
  input: [inputPath],
  output: {
    file: pkg.module,
    format: 'esm',
    exports: 'named',
    sourcemap: true,
  },
  external,
  plugins: [...plugins, esbuildPlugin],
}

const dtsOptions: RollupOptions = {
  input: [inputPath],
  output: {
    file: pkg.types,
  },
  plugins: [
    ...plugins,
    dts({
      compilerOptions: {
        sourceMap: false,
      },
    }),
  ],
}

const umdOption: RollupOptions = {
  input: [inputPath],
  plugins: [...plugins, esbuildPlugin, sourceMaps()],
  output: [
    {
      file: pkg.unpkg,
      format: 'umd',
      globals: {},
      name: 'tinystore',
    },
  ],
}

export default () =>
  [cjsOption, esmOptions, umdOption, dtsOptions] as RollupOptions[]
