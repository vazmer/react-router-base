import path from 'path'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterDevTools } from 'react-router-devtools'
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
		sourcemap: 'hidden',
	},
	ssr: {
		noExternal: ['remix-i18next'],
	},
	server: {
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
	plugins: [
		envOnlyMacros(),
		reactRouterDevTools(),
		reactRouter(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './app'),
			'@prisma/generated': path.resolve(__dirname, './prisma/generated'),
			'@svg': path.resolve(__dirname, './other/svg-icons'),
			'@tests': path.resolve(__dirname, './tests'),
		},
	},
})
