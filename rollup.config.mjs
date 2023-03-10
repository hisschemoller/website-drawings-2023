import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/main.ts',
	output: {
		file: 'public/bundle.js',
		format: 'cjs',
	},
  plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		typescript(),
		commonjs(),
		nodeResolve({ preferBuiltins: false }),
	],
};
