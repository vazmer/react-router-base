import path from 'path'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'

const MODE = process.env.NODE_ENV

export default defineConfig({
	build: {
		target: 'es2022',
		cssMinify: MODE === 'production',
		rollupOptions: {
			external: [/node:.*/, 'fsevents'],
		},
		sourcemap: true,
	},
	server: {
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
	plugins: [envOnlyMacros(), reactRouter(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './app'),
			'@svg': path.resolve(__dirname, './other/svg-icons'),
			'@tests': path.resolve(__dirname, './tests'),
		},
	},
})
