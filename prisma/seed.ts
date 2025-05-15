import { type Prisma } from '@prisma/generated/client.ts'
import { createPassword, createUser, getUserImages } from '@tests/db.utils'
import { prisma } from '@/utils/db.server.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🔑 Upserted permissions...')
	const entities: Prisma.PermissionActionEntityAccessCompoundUniqueInput['entity'][] =
		['user']
	const actions: Prisma.PermissionActionEntityAccessCompoundUniqueInput['action'][] =
		['create', 'read', 'update', 'delete']
	const accesses: Prisma.PermissionActionEntityAccessCompoundUniqueInput['access'][] =
		['own', 'any'] as const

	let permissionsToUpsert = []
	for (const entity of entities) {
		for (const action of actions) {
			for (const access of accesses) {
				permissionsToUpsert.push({ entity, action, access })
			}
		}
	}
	await prisma.$transaction(
		permissionsToUpsert.map((permission) =>
			prisma.permission.upsert({
				where: {
					action_entity_access: permission,
				},
				update: {},
				create: permission,
			}),
		),
	)

	console.timeEnd('🔑 Upserted permissions...')

	console.time('👑 Upserted roles...')
	await prisma.role.upsert({
		where: {
			name: 'admin',
		},
		update: {},
		create: {
			name: 'admin',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'any' },
				}),
			},
		},
	})
	await prisma.role.upsert({
		where: {
			name: 'user',
		},
		update: {},
		create: {
			name: 'user',
			permissions: {
				connect: await prisma.permission.findMany({
					select: { id: true },
					where: { access: 'own' },
				}),
			},
		},
	})
	console.timeEnd('👑 Upserted roles...')

	const totalUsers = 57
	console.time(`👤 Upserted ${totalUsers} users...`)
	const userImages = await getUserImages()

	for (let index = 0; index < totalUsers; index++) {
		const userData = createUser()
		await prisma.user.upsert({
			where: {
				username: userData.username,
			},
			update: {},
			create: {
				...userData,
				password: { create: createPassword(userData.username) },
				roles: { connect: { name: 'user' } },
			},
			select: { id: true },
		})
	}
	console.timeEnd(`👤 Upserted ${totalUsers} users...`)

	console.time('👑 Upserted admin user "admin"')
	const adminUser = await prisma.user.upsert({
		where: {
			username: 'admin',
		},
		update: {},
		create: {
			username: 'admin',
			email: 'vazmer@gmail.com',
			name: 'Bojan Vazmer',
			password: { create: createPassword('admin1234') },
			roles: { connect: [{ name: 'admin' }, { name: 'user' }] },
		},
		select: { id: true },
	})

	// Upload admin user profile image
	const adminUserImage = userImages[1]
	if (adminUserImage) {
		await prisma.userImage.upsert({
			where: {
				userId: adminUser.id,
				objectKey: adminUserImage.objectKey,
			},
			update: {},
			create: {
				userId: adminUser.id,
				objectKey: adminUserImage.objectKey,
			},
		})
	}

	console.timeEnd('👑 Upserted admin user "admin"')

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

// we're ok to import from the test directory in this file
/*
eslint
	no-restricted-imports: "off",
*/
