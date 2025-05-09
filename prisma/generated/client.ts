/**
 * Client
 */

import * as path from 'node:path'
import * as process from 'node:process'
import { fileURLToPath } from 'node:url'
import * as runtime from '@prisma/client/runtime/library'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

/**
 * Model User
 *
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserImage
 *
 */
export type UserImage =
	runtime.Types.Result.DefaultSelection<Prisma.$UserImagePayload>
/**
 * Model Password
 *
 */
export type Password =
	runtime.Types.Result.DefaultSelection<Prisma.$PasswordPayload>
/**
 * Model Session
 *
 */
export type Session =
	runtime.Types.Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Permission
 *
 */
export type Permission =
	runtime.Types.Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model Role
 *
 */
export type Role = runtime.Types.Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Verification
 *
 */
export type Verification =
	runtime.Types.Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Connection
 *
 */
export type Connection =
	runtime.Types.Result.DefaultSelection<Prisma.$ConnectionPayload>
/**
 * Model Passkey
 *
 */
export type Passkey =
	runtime.Types.Result.DefaultSelection<Prisma.$PasskeyPayload>

/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
	generator: {
		name: 'client',
		provider: {
			fromEnvVar: null,
			value: 'prisma-client',
		},
		output: {
			value:
				'/Users/vazmer/WebstormProjects/react-router-base/prisma/generated',
			fromEnvVar: null,
		},
		config: {
			moduleFormat: 'esm',
			engineType: 'library',
		},
		binaryTargets: [
			{
				fromEnvVar: null,
				value: 'darwin-arm64',
				native: true,
			},
		],
		previewFeatures: ['typedSql'],
		sourceFilePath:
			'/Users/vazmer/WebstormProjects/react-router-base/prisma/schema.prisma',
		isCustomOutput: true,
	},
	relativePath: '..',
	clientVersion: '6.6.0',
	engineVersion: 'f676762280b54cd07c770017ed3711ddde35f37a',
	datasourceNames: ['db'],
	activeProvider: 'postgresql',
	postinstall: false,
	inlineDatasources: {
		db: {
			url: {
				fromEnvVar: 'DATABASE_URL',
				value: null,
			},
		},
	},
	inlineSchema:
		'generator client {\n  provider        = "prisma-client"\n  output          = "generated"\n  moduleFormat    = "esm"\n  previewFeatures = ["typedSql"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id          String       @id @default(cuid())\n  email       String       @unique\n  username    String       @unique\n  name        String?\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  connections Connection[]\n  passkey     Passkey[]\n  password    Password?\n  sessions    Session[]\n  image       UserImage?\n  roles       Role[]       @relation("RoleToUser")\n}\n\nmodel UserImage {\n  id        String   @id @default(cuid())\n  altText   String?\n  objectKey String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  userId    String   @unique\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel Password {\n  hash          String\n  userId        String  @unique\n  requiredReset Boolean @default(false)\n  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel Session {\n  id             String   @id @default(cuid())\n  expirationDate DateTime\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  userId         String\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n}\n\nmodel Permission {\n  id          String   @id @default(cuid())\n  action      String\n  entity      String\n  access      String\n  description String   @default("")\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n  roles       Role[]   @relation("PermissionToRole")\n\n  @@unique([action, entity, access])\n}\n\nmodel Role {\n  id          String       @id @default(cuid())\n  name        String       @unique\n  description String       @default("")\n  createdAt   DateTime     @default(now())\n  updatedAt   DateTime     @updatedAt\n  permissions Permission[] @relation("PermissionToRole")\n  users       User[]       @relation("RoleToUser")\n}\n\nmodel Verification {\n  id        String    @id @default(cuid())\n  createdAt DateTime  @default(now())\n  /// The type of verification, e.g. "email" or "phone"\n  type      String\n  /// The thing we\'re trying to verify, e.g. a user\'s email or phone number\n  target    String\n  /// The secret key used to generate the otp\n  secret    String\n  /// The algorithm used to generate the otp\n  algorithm String\n  /// The number of digits in the otp\n  digits    Int\n  /// The number of seconds the otp is valid for\n  period    Int\n  /// The valid characters for the otp\n  charSet   String\n  /// When it\'s safe to delete this verification\n  expiresAt DateTime?\n\n  @@unique([target, type])\n}\n\nmodel Connection {\n  id           String   @id @default(cuid())\n  providerName String\n  providerId   String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n  userId       String\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([providerName, providerId])\n}\n\nmodel Passkey {\n  id             String   @id\n  aaguid         String\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  publicKey      Bytes\n  userId         String\n  webauthnUserId String\n  counter        BigInt\n  deviceType     String\n  backedUp       Boolean\n  transports     String?\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n}\n',
	inlineSchemaHash:
		'ec371b86ec864202604f3480a0ef296843041dddc78f4c2bcbf7fabfce2fb961',
	copyEngine: true,
	runtimeDataModel: {
		models: {},
		enums: {},
		types: {},
	},
	dirname: '',
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse(
	'{"models":{"User":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"connections","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Connection","nativeType":null,"relationName":"ConnectionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"passkey","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Passkey","nativeType":null,"relationName":"PasskeyToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Password","nativeType":null,"relationName":"PasswordToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"sessions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Session","nativeType":null,"relationName":"SessionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"UserImage","nativeType":null,"relationName":"UserToUserImage","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"roles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","nativeType":null,"relationName":"RoleToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"UserImage":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"altText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"objectKey","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserToUserImage","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Password":{"dbName":null,"schema":null,"fields":[{"name":"hash","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"requiredReset","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"PasswordToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Session":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"expirationDate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"SessionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Permission":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"action","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"entity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"access","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"roles","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","nativeType":null,"relationName":"PermissionToRole","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["action","entity","access"]],"uniqueIndexes":[{"name":null,"fields":["action","entity","access"]}],"isGenerated":false},"Role":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":"","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"permissions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Permission","nativeType":null,"relationName":"PermissionToRole","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"users","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"RoleToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Verification":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The type of verification, e.g. \\"email\\" or \\"phone\\""},{"name":"target","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The thing we\'re trying to verify, e.g. a user\'s email or phone number"},{"name":"secret","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The secret key used to generate the otp"},{"name":"algorithm","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The algorithm used to generate the otp"},{"name":"digits","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The number of digits in the otp"},{"name":"period","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The number of seconds the otp is valid for"},{"name":"charSet","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"The valid characters for the otp"},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false,"documentation":"When it\'s safe to delete this verification"}],"primaryKey":null,"uniqueFields":[["target","type"]],"uniqueIndexes":[{"name":null,"fields":["target","type"]}],"isGenerated":false},"Connection":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"cuid","args":[1]},"isGenerated":false,"isUpdatedAt":false},{"name":"providerName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"providerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ConnectionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["providerName","providerId"]],"uniqueIndexes":[{"name":null,"fields":["providerName","providerId"]}],"isGenerated":false},"Passkey":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"aaguid","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"publicKey","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Bytes","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"webauthnUserId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"counter","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BigInt","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"deviceType","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"backedUp","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"transports","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"PasskeyToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}',
) as runtime.GetPrismaClientConfig['runtimeDataModel']
config.engineWasm = undefined
config.compilerWasm = undefined

// file annotations for bundling tools to include these files
path.join(__dirname, 'libquery_engine-darwin-arm64.dylib.node')
path.join(
	process.cwd(),
	'prisma/generated/libquery_engine-darwin-arm64.dylib.node',
)
// file annotations for bundling tools to include these files
path.join(__dirname, 'schema.prisma')
path.join(process.cwd(), 'prisma/generated/schema.prisma')

interface PrismaClientConstructor {
	/**
	 * ## Prisma Client
	 *
	 * Type-safe database client for TypeScript
	 * @example
	 * ```
	 * const prisma = new PrismaClient()
	 * // Fetch zero or more Users
	 * const users = await prisma.user.findMany()
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
	 */
	new <
		ClientOptions extends
			Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
		U = 'log' extends keyof ClientOptions
			? ClientOptions['log'] extends Array<
					Prisma.LogLevel | Prisma.LogDefinition
				>
				? Prisma.GetEvents<ClientOptions['log']>
				: never
			: never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	>(
		options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
	): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
	ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
	U = 'log' extends keyof ClientOptions
		? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
			? Prisma.GetEvents<ClientOptions['log']>
			: never
		: never,
	ExtArgs extends
		runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
> {
	[K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

	$on<V extends U>(
		eventType: V,
		callback: (
			event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
		) => void,
	): PrismaClient

	/**
	 * Connect with the database
	 */
	$connect(): runtime.Types.Utils.JsPromise<void>

	/**
	 * Disconnect from the database
	 */
	$disconnect(): runtime.Types.Utils.JsPromise<void>

	/**
	 * Add a middleware
	 * @deprecated since 4.16.0. For new code, prefer client extensions instead.
	 * @see https://pris.ly/d/extensions
	 */
	$use(cb: Prisma.Middleware): void

	/**
	 * Executes a prepared raw query and returns the number of affected rows.
	 * @example
	 * ```
	 * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$executeRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<number>

	/**
	 * Executes a raw query and returns the number of affected rows.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$executeRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<number>

	/**
	 * Performs a prepared raw query and returns the `SELECT` data.
	 * @example
	 * ```
	 * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$queryRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<T>

	/**
	 * Performs a raw query and returns the `SELECT` data.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
	 */
	$queryRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<T>

	/**
	 * Executes a typed SQL query and returns a typed result
	 * @example
	 * ```
	 * import { myQuery } from '@prisma/client/sql'
	 *
	 * const result = await prisma.$queryRawTyped(myQuery())
	 * ```
	 */
	$queryRawTyped<T>(
		typedSql: runtime.TypedSql<unknown[], T>,
	): Prisma.PrismaPromise<T[]>

	/**
	 * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
	 * @example
	 * ```
	 * const [george, bob, alice] = await prisma.$transaction([
	 *   prisma.user.create({ data: { name: 'George' } }),
	 *   prisma.user.create({ data: { name: 'Bob' } }),
	 *   prisma.user.create({ data: { name: 'Alice' } }),
	 * ])
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
	 */
	$transaction<P extends Prisma.PrismaPromise<any>[]>(
		arg: [...P],
		options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
	): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

	$transaction<R>(
		fn: (
			prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
		) => runtime.Types.Utils.JsPromise<R>,
		options?: {
			maxWait?: number
			timeout?: number
			isolationLevel?: Prisma.TransactionIsolationLevel
		},
	): runtime.Types.Utils.JsPromise<R>

	$extends: runtime.Types.Extensions.ExtendsHook<
		'extends',
		Prisma.TypeMapCb<ClientOptions>,
		ExtArgs,
		runtime.Types.Utils.Call<
			Prisma.TypeMapCb<ClientOptions>,
			{
				extArgs: ExtArgs
			}
		>
	>

	/**
	 * `prisma.user`: Exposes CRUD operations for the **User** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Users
	 * const users = await prisma.user.findMany()
	 * ```
	 */
	get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.userImage`: Exposes CRUD operations for the **UserImage** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more UserImages
	 * const userImages = await prisma.userImage.findMany()
	 * ```
	 */
	get userImage(): Prisma.UserImageDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.password`: Exposes CRUD operations for the **Password** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Passwords
	 * const passwords = await prisma.password.findMany()
	 * ```
	 */
	get password(): Prisma.PasswordDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.session`: Exposes CRUD operations for the **Session** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Sessions
	 * const sessions = await prisma.session.findMany()
	 * ```
	 */
	get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Permissions
	 * const permissions = await prisma.permission.findMany()
	 * ```
	 */
	get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.role`: Exposes CRUD operations for the **Role** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Roles
	 * const roles = await prisma.role.findMany()
	 * ```
	 */
	get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Verifications
	 * const verifications = await prisma.verification.findMany()
	 * ```
	 */
	get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.connection`: Exposes CRUD operations for the **Connection** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Connections
	 * const connections = await prisma.connection.findMany()
	 * ```
	 */
	get connection(): Prisma.ConnectionDelegate<ExtArgs, ClientOptions>

	/**
	 * `prisma.passkey`: Exposes CRUD operations for the **Passkey** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Passkeys
	 * const passkeys = await prisma.passkey.findMany()
	 * ```
	 */
	get passkey(): Prisma.PasskeyDelegate<ExtArgs, ClientOptions>
}

export const PrismaClient = runtime.getPrismaClient(
	config,
) as unknown as PrismaClientConstructor

export namespace Prisma {
	export type DMMF = typeof runtime.DMMF

	export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

	/**
	 * Validator
	 */
	export const validator = runtime.Public.validator

	/**
	 * Prisma Errors
	 */

	export const PrismaClientKnownRequestError =
		runtime.PrismaClientKnownRequestError
	export type PrismaClientKnownRequestError =
		runtime.PrismaClientKnownRequestError

	export const PrismaClientUnknownRequestError =
		runtime.PrismaClientUnknownRequestError
	export type PrismaClientUnknownRequestError =
		runtime.PrismaClientUnknownRequestError

	export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
	export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

	export const PrismaClientInitializationError =
		runtime.PrismaClientInitializationError
	export type PrismaClientInitializationError =
		runtime.PrismaClientInitializationError

	export const PrismaClientValidationError = runtime.PrismaClientValidationError
	export type PrismaClientValidationError = runtime.PrismaClientValidationError

	/**
	 * Re-export of sql-template-tag
	 */
	export const sql = runtime.sqltag
	export const empty = runtime.empty
	export const join = runtime.join
	export const raw = runtime.raw
	export const Sql = runtime.Sql
	export type Sql = runtime.Sql

	/**
	 * Decimal.js
	 */
	export const Decimal = runtime.Decimal
	export type Decimal = runtime.Decimal

	export type DecimalJsLike = runtime.DecimalJsLike

	/**
	 * Metrics
	 */
	export type Metrics = runtime.Metrics
	export type Metric<T> = runtime.Metric<T>
	export type MetricHistogram = runtime.MetricHistogram
	export type MetricHistogramBucket = runtime.MetricHistogramBucket

	/**
	 * Extensions
	 */
	export type Extension = runtime.Types.Extensions.UserArgs
	export const getExtensionContext = runtime.Extensions.getExtensionContext
	export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<
		T,
		F
	>
	export type Payload<
		T,
		F extends runtime.Operation = never,
	> = runtime.Types.Public.Payload<T, F>
	export type Result<
		T,
		A,
		F extends runtime.Operation,
	> = runtime.Types.Public.Result<T, A, F>
	export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

	export type PrismaVersion = {
		client: string
		engine: string
	}

	/**
	 * Prisma Client JS version: 6.6.0
	 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
	 */
	export const prismaVersion: PrismaVersion = {
		client: '6.6.0',
		engine: 'f676762280b54cd07c770017ed3711ddde35f37a',
	}

	/**
	 * Utility Types
	 */

	export type JsonObject = runtime.JsonObject
	export type JsonArray = runtime.JsonArray
	export type JsonValue = runtime.JsonValue
	export type InputJsonObject = runtime.InputJsonObject
	export type InputJsonArray = runtime.InputJsonArray
	export type InputJsonValue = runtime.InputJsonValue

	export const NullTypes = {
		DbNull: runtime.objectEnumValues.classes.DbNull as new (
			secret: never,
		) => typeof runtime.objectEnumValues.instances.DbNull,
		JsonNull: runtime.objectEnumValues.classes.JsonNull as new (
			secret: never,
		) => typeof runtime.objectEnumValues.instances.JsonNull,
		AnyNull: runtime.objectEnumValues.classes.AnyNull as new (
			secret: never,
		) => typeof runtime.objectEnumValues.instances.AnyNull,
	}

	/**
	 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const DbNull = runtime.objectEnumValues.instances.DbNull

	/**
	 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const JsonNull = runtime.objectEnumValues.instances.JsonNull

	/**
	 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const AnyNull = runtime.objectEnumValues.instances.AnyNull

	type SelectAndInclude = {
		select: any
		include: any
	}

	type SelectAndOmit = {
		select: any
		omit: any
	}

	/**
	 * From T, pick a set of properties whose keys are in the union K
	 */
	type Prisma__Pick<T, K extends keyof T> = {
		[P in K]: T[P]
	}

	export type Enumerable<T> = T | Array<T>

	/**
	 * Subset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
	 */
	export type Subset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	}

	/**
	 * SelectSubset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
	 * Additionally, it validates, if both select and include are present. If the case, it errors.
	 */
	export type SelectSubset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	} & (T extends SelectAndInclude
		? 'Please either choose `select` or `include`.'
		: T extends SelectAndOmit
			? 'Please either choose `select` or `omit`.'
			: {})

	/**
	 * Subset + Intersection
	 * @desc From `T` pick properties that exist in `U` and intersect `K`
	 */
	export type SubsetIntersection<T, U, K> = {
		[key in keyof T]: key extends keyof U ? T[key] : never
	} & K

	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

	/**
	 * XOR is needed to have a real mutually exclusive union type
	 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
	 */
	type XOR<T, U> = T extends object
		? U extends object
			? (Without<T, U> & U) | (Without<U, T> & T)
			: U
		: T

	/**
	 * Is T a Record?
	 */
	type IsObject<T extends any> =
		T extends Array<any>
			? False
			: T extends Date
				? False
				: T extends Uint8Array
					? False
					: T extends BigInt
						? False
						: T extends object
							? True
							: False

	/**
	 * If it's T[], return T
	 */
	export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

	/**
	 * From ts-toolbelt
	 */

	type __Either<O extends object, K extends Key> = Omit<O, K> &
		{
			// Merge all but K
			[P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
		}[K]

	type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

	type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

	type _Either<O extends object, K extends Key, strict extends Boolean> = {
		1: EitherStrict<O, K>
		0: EitherLoose<O, K>
	}[strict]

	type Either<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = O extends unknown ? _Either<O, K, strict> : never

	export type Union = any

	type PatchUndefined<O extends object, O1 extends object> = {
		[K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
	} & {}

	/** Helper Types for "Merge" **/
	export type IntersectOf<U extends Union> = (
		U extends unknown ? (k: U) => void : never
	) extends (k: infer I) => void
		? I
		: never

	export type Overwrite<O extends object, O1 extends object> = {
		[K in keyof O]: K extends keyof O1 ? O1[K] : O[K]
	} & {}

	type _Merge<U extends object> = IntersectOf<
		Overwrite<
			U,
			{
				[K in keyof U]-?: At<U, K>
			}
		>
	>

	type Key = string | number | symbol
	type AtStrict<O extends object, K extends Key> = O[K & keyof O]
	type AtLoose<O extends object, K extends Key> = O extends unknown
		? AtStrict<O, K>
		: never
	export type At<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = {
		1: AtStrict<O, K>
		0: AtLoose<O, K>
	}[strict]

	export type ComputeRaw<A extends any> = A extends Function
		? A
		: {
				[K in keyof A]: A[K]
			} & {}

	export type OptionalFlat<O> = {
		[K in keyof O]?: O[K]
	} & {}

	type _Record<K extends keyof any, T> = {
		[P in K]: T
	}

	// cause typescript not to expand types and preserve names
	type NoExpand<T> = T extends unknown ? T : never

	// this type assumes the passed object is entirely optional
	export type AtLeast<O extends object, K extends string> = NoExpand<
		O extends unknown
			?
					| (K extends keyof O ? { [P in K]: O[P] } & O : O)
					| ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
			: never
	>

	type _Strict<U, _U = U> = U extends unknown
		? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
		: never

	export type Strict<U extends object> = ComputeRaw<_Strict<U>>
	/** End Helper Types for "Merge" **/

	export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>

	export type Boolean = True | False

	export type True = 1

	export type False = 0

	export type Not<B extends Boolean> = {
		0: 1
		1: 0
	}[B]

	export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
		? 0 // anything `never` is false
		: A1 extends A2
			? 1
			: 0

	export type Has<U extends Union, U1 extends Union> = Not<
		Extends<Exclude<U1, U>, U1>
	>

	export type Or<B1 extends Boolean, B2 extends Boolean> = {
		0: {
			0: 0
			1: 1
		}
		1: {
			0: 1
			1: 1
		}
	}[B1][B2]

	export type Keys<U extends Union> = U extends unknown ? keyof U : never

	export type GetScalarType<T, O> = O extends object
		? {
				[P in keyof T]: P extends keyof O ? O[P] : never
			}
		: never

	type FieldPaths<
		T,
		U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
	> = IsObject<T> extends True ? U : T

	type GetHavingFields<T> = {
		[K in keyof T]: Or<
			Or<Extends<'OR', K>, Extends<'AND', K>>,
			Extends<'NOT', K>
		> extends True
			? // infer is only needed to not hit TS limit
				// based on the brilliant idea of Pierre-Antoine Mills
				// https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
				T[K] extends infer TK
				? GetHavingFields<
						UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
					>
				: never
			: {} extends FieldPaths<T[K]>
				? never
				: K
	}[keyof T]

	/**
	 * Convert tuple to union
	 */
	type _TupleToUnion<T> = T extends (infer E)[] ? E : never
	type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
	type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

	/**
	 * Like `Pick`, but additionally can also accept an array of keys
	 */
	type PickEnumerable<
		T,
		K extends Enumerable<keyof T> | keyof T,
	> = Prisma__Pick<T, MaybeTupleToUnion<K>>

	/**
	 * Exclude all keys with underscores
	 */
	type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
		? never
		: T

	export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

	type FieldRefInputType<Model, FieldType> = Model extends never
		? never
		: FieldRef<Model, FieldType>

	export const ModelName = {
		User: 'User',
		UserImage: 'UserImage',
		Password: 'Password',
		Session: 'Session',
		Permission: 'Permission',
		Role: 'Role',
		Verification: 'Verification',
		Connection: 'Connection',
		Passkey: 'Passkey',
	} as const

	export type ModelName = (typeof ModelName)[keyof typeof ModelName]

	export type Datasources = {
		db?: Datasource
	}

	export interface TypeMapCb<ClientOptions = {}>
		extends runtime.Types.Utils.Fn<
			{ extArgs: runtime.Types.Extensions.InternalArgs },
			runtime.Types.Utils.Record<string, any>
		> {
		returns: Prisma.TypeMap<
			this['params']['extArgs'],
			ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
		>
	}

	export type TypeMap<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> = {
		globalOmitOptions: {
			omit: GlobalOmitOptions
		}
		meta: {
			modelProps:
				| 'user'
				| 'userImage'
				| 'password'
				| 'session'
				| 'permission'
				| 'role'
				| 'verification'
				| 'connection'
				| 'passkey'
			txIsolationLevel: Prisma.TransactionIsolationLevel
		}
		model: {
			User: {
				payload: Prisma.$UserPayload<ExtArgs>
				fields: Prisma.UserFieldRefs
				operations: {
					findUnique: {
						args: Prisma.UserFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					findFirst: {
						args: Prisma.UserFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					findMany: {
						args: Prisma.UserFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					create: {
						args: Prisma.UserCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					createMany: {
						args: Prisma.UserCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					delete: {
						args: Prisma.UserDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					update: {
						args: Prisma.UserUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					deleteMany: {
						args: Prisma.UserDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.UserUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
					}
					upsert: {
						args: Prisma.UserUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
					}
					aggregate: {
						args: Prisma.UserAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateUser>
					}
					groupBy: {
						args: Prisma.UserGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<UserGroupByOutputType>[]
					}
					count: {
						args: Prisma.UserCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<UserCountAggregateOutputType>
							| number
					}
				}
			}
			UserImage: {
				payload: Prisma.$UserImagePayload<ExtArgs>
				fields: Prisma.UserImageFieldRefs
				operations: {
					findUnique: {
						args: Prisma.UserImageFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.UserImageFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					findFirst: {
						args: Prisma.UserImageFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.UserImageFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					findMany: {
						args: Prisma.UserImageFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>[]
					}
					create: {
						args: Prisma.UserImageCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					createMany: {
						args: Prisma.UserImageCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.UserImageCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>[]
					}
					delete: {
						args: Prisma.UserImageDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					update: {
						args: Prisma.UserImageUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					deleteMany: {
						args: Prisma.UserImageDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.UserImageUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.UserImageUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>[]
					}
					upsert: {
						args: Prisma.UserImageUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$UserImagePayload>
					}
					aggregate: {
						args: Prisma.UserImageAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateUserImage>
					}
					groupBy: {
						args: Prisma.UserImageGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<UserImageGroupByOutputType>[]
					}
					count: {
						args: Prisma.UserImageCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<UserImageCountAggregateOutputType>
							| number
					}
				}
			}
			Password: {
				payload: Prisma.$PasswordPayload<ExtArgs>
				fields: Prisma.PasswordFieldRefs
				operations: {
					findUnique: {
						args: Prisma.PasswordFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.PasswordFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					findFirst: {
						args: Prisma.PasswordFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.PasswordFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					findMany: {
						args: Prisma.PasswordFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>[]
					}
					create: {
						args: Prisma.PasswordCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					createMany: {
						args: Prisma.PasswordCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.PasswordCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>[]
					}
					delete: {
						args: Prisma.PasswordDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					update: {
						args: Prisma.PasswordUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					deleteMany: {
						args: Prisma.PasswordDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.PasswordUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.PasswordUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>[]
					}
					upsert: {
						args: Prisma.PasswordUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordPayload>
					}
					aggregate: {
						args: Prisma.PasswordAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregatePassword>
					}
					groupBy: {
						args: Prisma.PasswordGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<PasswordGroupByOutputType>[]
					}
					count: {
						args: Prisma.PasswordCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<PasswordCountAggregateOutputType>
							| number
					}
				}
			}
			Session: {
				payload: Prisma.$SessionPayload<ExtArgs>
				fields: Prisma.SessionFieldRefs
				operations: {
					findUnique: {
						args: Prisma.SessionFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					findFirst: {
						args: Prisma.SessionFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					findMany: {
						args: Prisma.SessionFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[]
					}
					create: {
						args: Prisma.SessionCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					createMany: {
						args: Prisma.SessionCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[]
					}
					delete: {
						args: Prisma.SessionDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					update: {
						args: Prisma.SessionUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					deleteMany: {
						args: Prisma.SessionDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.SessionUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[]
					}
					upsert: {
						args: Prisma.SessionUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>
					}
					aggregate: {
						args: Prisma.SessionAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateSession>
					}
					groupBy: {
						args: Prisma.SessionGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<SessionGroupByOutputType>[]
					}
					count: {
						args: Prisma.SessionCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<SessionCountAggregateOutputType>
							| number
					}
				}
			}
			Permission: {
				payload: Prisma.$PermissionPayload<ExtArgs>
				fields: Prisma.PermissionFieldRefs
				operations: {
					findUnique: {
						args: Prisma.PermissionFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					findFirst: {
						args: Prisma.PermissionFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					findMany: {
						args: Prisma.PermissionFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[]
					}
					create: {
						args: Prisma.PermissionCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					createMany: {
						args: Prisma.PermissionCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[]
					}
					delete: {
						args: Prisma.PermissionDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					update: {
						args: Prisma.PermissionUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					deleteMany: {
						args: Prisma.PermissionDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.PermissionUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>[]
					}
					upsert: {
						args: Prisma.PermissionUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PermissionPayload>
					}
					aggregate: {
						args: Prisma.PermissionAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregatePermission>
					}
					groupBy: {
						args: Prisma.PermissionGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<PermissionGroupByOutputType>[]
					}
					count: {
						args: Prisma.PermissionCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<PermissionCountAggregateOutputType>
							| number
					}
				}
			}
			Role: {
				payload: Prisma.$RolePayload<ExtArgs>
				fields: Prisma.RoleFieldRefs
				operations: {
					findUnique: {
						args: Prisma.RoleFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					findFirst: {
						args: Prisma.RoleFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					findMany: {
						args: Prisma.RoleFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[]
					}
					create: {
						args: Prisma.RoleCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					createMany: {
						args: Prisma.RoleCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[]
					}
					delete: {
						args: Prisma.RoleDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					update: {
						args: Prisma.RoleUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					deleteMany: {
						args: Prisma.RoleDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.RoleUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>[]
					}
					upsert: {
						args: Prisma.RoleUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$RolePayload>
					}
					aggregate: {
						args: Prisma.RoleAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateRole>
					}
					groupBy: {
						args: Prisma.RoleGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<RoleGroupByOutputType>[]
					}
					count: {
						args: Prisma.RoleCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<RoleCountAggregateOutputType>
							| number
					}
				}
			}
			Verification: {
				payload: Prisma.$VerificationPayload<ExtArgs>
				fields: Prisma.VerificationFieldRefs
				operations: {
					findUnique: {
						args: Prisma.VerificationFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					findFirst: {
						args: Prisma.VerificationFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					findMany: {
						args: Prisma.VerificationFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[]
					}
					create: {
						args: Prisma.VerificationCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					createMany: {
						args: Prisma.VerificationCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[]
					}
					delete: {
						args: Prisma.VerificationDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					update: {
						args: Prisma.VerificationUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					deleteMany: {
						args: Prisma.VerificationDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.VerificationUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[]
					}
					upsert: {
						args: Prisma.VerificationUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>
					}
					aggregate: {
						args: Prisma.VerificationAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateVerification>
					}
					groupBy: {
						args: Prisma.VerificationGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<VerificationGroupByOutputType>[]
					}
					count: {
						args: Prisma.VerificationCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<VerificationCountAggregateOutputType>
							| number
					}
				}
			}
			Connection: {
				payload: Prisma.$ConnectionPayload<ExtArgs>
				fields: Prisma.ConnectionFieldRefs
				operations: {
					findUnique: {
						args: Prisma.ConnectionFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.ConnectionFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					findFirst: {
						args: Prisma.ConnectionFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.ConnectionFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					findMany: {
						args: Prisma.ConnectionFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
					}
					create: {
						args: Prisma.ConnectionCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					createMany: {
						args: Prisma.ConnectionCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.ConnectionCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
					}
					delete: {
						args: Prisma.ConnectionDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					update: {
						args: Prisma.ConnectionUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					deleteMany: {
						args: Prisma.ConnectionDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.ConnectionUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.ConnectionUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
					}
					upsert: {
						args: Prisma.ConnectionUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$ConnectionPayload>
					}
					aggregate: {
						args: Prisma.ConnectionAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregateConnection>
					}
					groupBy: {
						args: Prisma.ConnectionGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<ConnectionGroupByOutputType>[]
					}
					count: {
						args: Prisma.ConnectionCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<ConnectionCountAggregateOutputType>
							| number
					}
				}
			}
			Passkey: {
				payload: Prisma.$PasskeyPayload<ExtArgs>
				fields: Prisma.PasskeyFieldRefs
				operations: {
					findUnique: {
						args: Prisma.PasskeyFindUniqueArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload> | null
					}
					findUniqueOrThrow: {
						args: Prisma.PasskeyFindUniqueOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					findFirst: {
						args: Prisma.PasskeyFindFirstArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload> | null
					}
					findFirstOrThrow: {
						args: Prisma.PasskeyFindFirstOrThrowArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					findMany: {
						args: Prisma.PasskeyFindManyArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>[]
					}
					create: {
						args: Prisma.PasskeyCreateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					createMany: {
						args: Prisma.PasskeyCreateManyArgs<ExtArgs>
						result: BatchPayload
					}
					createManyAndReturn: {
						args: Prisma.PasskeyCreateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>[]
					}
					delete: {
						args: Prisma.PasskeyDeleteArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					update: {
						args: Prisma.PasskeyUpdateArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					deleteMany: {
						args: Prisma.PasskeyDeleteManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateMany: {
						args: Prisma.PasskeyUpdateManyArgs<ExtArgs>
						result: BatchPayload
					}
					updateManyAndReturn: {
						args: Prisma.PasskeyUpdateManyAndReturnArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>[]
					}
					upsert: {
						args: Prisma.PasskeyUpsertArgs<ExtArgs>
						result: runtime.Types.Utils.PayloadToResult<Prisma.$PasskeyPayload>
					}
					aggregate: {
						args: Prisma.PasskeyAggregateArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<AggregatePasskey>
					}
					groupBy: {
						args: Prisma.PasskeyGroupByArgs<ExtArgs>
						result: runtime.Types.Utils.Optional<PasskeyGroupByOutputType>[]
					}
					count: {
						args: Prisma.PasskeyCountArgs<ExtArgs>
						result:
							| runtime.Types.Utils.Optional<PasskeyCountAggregateOutputType>
							| number
					}
				}
			}
		}
	} & {
		other: {
			payload: any
			operations: {
				$executeRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
					result: any
				}
				$executeRawUnsafe: {
					args: [query: string, ...values: any[]]
					result: any
				}
				$queryRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]]
					result: any
				}
				$queryRawUnsafe: {
					args: [query: string, ...values: any[]]
					result: any
				}
				$queryRawTyped: {
					args: runtime.UnknownTypedSql
					result: Prisma.JsonObject
				}
			}
		}
	}
	export const defineExtension = runtime.Extensions
		.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<
		'define',
		Prisma.TypeMapCb,
		runtime.Types.Extensions.DefaultArgs
	>
	export type DefaultPrismaClient = PrismaClient
	export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
	export interface PrismaClientOptions {
		/**
		 * Overwrites the datasource url from your schema.prisma file
		 */
		datasources?: Datasources
		/**
		 * Overwrites the datasource url from your schema.prisma file
		 */
		datasourceUrl?: string
		/**
		 * @default "colorless"
		 */
		errorFormat?: ErrorFormat
		/**
		 * @example
		 * ```
		 * // Defaults to stdout
		 * log: ['query', 'info', 'warn', 'error']
		 *
		 * // Emit as events
		 * log: [
		 *   { emit: 'stdout', level: 'query' },
		 *   { emit: 'stdout', level: 'info' },
		 *   { emit: 'stdout', level: 'warn' }
		 *   { emit: 'stdout', level: 'error' }
		 * ]
		 * ```
		 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
		 */
		log?: (LogLevel | LogDefinition)[]
		/**
		 * The default values for transactionOptions
		 * maxWait ?= 2000
		 * timeout ?= 5000
		 */
		transactionOptions?: {
			maxWait?: number
			timeout?: number
			isolationLevel?: Prisma.TransactionIsolationLevel
		}
		/**
		 * Global configuration for omitting model fields by default.
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   omit: {
		 *     user: {
		 *       password: true
		 *     }
		 *   }
		 * })
		 * ```
		 */
		omit?: Prisma.GlobalOmitConfig
	}
	export type GlobalOmitConfig = {
		user?: UserOmit
		userImage?: UserImageOmit
		password?: PasswordOmit
		session?: SessionOmit
		permission?: PermissionOmit
		role?: RoleOmit
		verification?: VerificationOmit
		connection?: ConnectionOmit
		passkey?: PasskeyOmit
	}

	/* Types for Logging */
	export type LogLevel = 'info' | 'query' | 'warn' | 'error'
	export type LogDefinition = {
		level: LogLevel
		emit: 'stdout' | 'event'
	}

	export type GetLogType<T extends LogLevel | LogDefinition> =
		T extends LogDefinition
			? T['emit'] extends 'event'
				? T['level']
				: never
			: never
	export type GetEvents<T extends any> =
		T extends Array<LogLevel | LogDefinition>
			?
					| GetLogType<T[0]>
					| GetLogType<T[1]>
					| GetLogType<T[2]>
					| GetLogType<T[3]>
			: never

	export type QueryEvent = {
		timestamp: Date
		query: string
		params: string
		duration: number
		target: string
	}

	export type LogEvent = {
		timestamp: Date
		message: string
		target: string
	}
	/* End Types for Logging */

	export type PrismaAction =
		| 'findUnique'
		| 'findUniqueOrThrow'
		| 'findMany'
		| 'findFirst'
		| 'findFirstOrThrow'
		| 'create'
		| 'createMany'
		| 'createManyAndReturn'
		| 'update'
		| 'updateMany'
		| 'updateManyAndReturn'
		| 'upsert'
		| 'delete'
		| 'deleteMany'
		| 'executeRaw'
		| 'queryRaw'
		| 'aggregate'
		| 'count'
		| 'runCommandRaw'
		| 'findRaw'
		| 'groupBy'

	/**
	 * These options are being passed into the middleware as "params"
	 */
	export type MiddlewareParams = {
		model?: ModelName
		action: PrismaAction
		args: any
		dataPath: string[]
		runInTransaction: boolean
	}

	/**
	 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
	 */
	export type Middleware<T = any> = (
		params: MiddlewareParams,
		next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
	) => runtime.Types.Utils.JsPromise<T>

	/**
	 * `PrismaClient` proxy available in interactive transactions.
	 */
	export type TransactionClient = Omit<
		Prisma.DefaultPrismaClient,
		runtime.ITXClientDenyList
	>

	export type Datasource = {
		url?: string
	}

	/**
	 * Count Types
	 */

	/**
	 * Count Type UserCountOutputType
	 */

	export type UserCountOutputType = {
		connections: number
		passkey: number
		sessions: number
		roles: number
	}

	export type UserCountOutputTypeSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		connections?: boolean | UserCountOutputTypeCountConnectionsArgs
		passkey?: boolean | UserCountOutputTypeCountPasskeyArgs
		sessions?: boolean | UserCountOutputTypeCountSessionsArgs
		roles?: boolean | UserCountOutputTypeCountRolesArgs
	}

	// Custom InputTypes
	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserCountOutputType
		 */
		select?: UserCountOutputTypeSelect<ExtArgs> | null
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountConnectionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: ConnectionWhereInput
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountPasskeyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: PasskeyWhereInput
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountSessionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: SessionWhereInput
	}

	/**
	 * UserCountOutputType without action
	 */
	export type UserCountOutputTypeCountRolesArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: RoleWhereInput
	}

	/**
	 * Count Type PermissionCountOutputType
	 */

	export type PermissionCountOutputType = {
		roles: number
	}

	export type PermissionCountOutputTypeSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		roles?: boolean | PermissionCountOutputTypeCountRolesArgs
	}

	// Custom InputTypes
	/**
	 * PermissionCountOutputType without action
	 */
	export type PermissionCountOutputTypeDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the PermissionCountOutputType
		 */
		select?: PermissionCountOutputTypeSelect<ExtArgs> | null
	}

	/**
	 * PermissionCountOutputType without action
	 */
	export type PermissionCountOutputTypeCountRolesArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: RoleWhereInput
	}

	/**
	 * Count Type RoleCountOutputType
	 */

	export type RoleCountOutputType = {
		permissions: number
		users: number
	}

	export type RoleCountOutputTypeSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
		users?: boolean | RoleCountOutputTypeCountUsersArgs
	}

	// Custom InputTypes
	/**
	 * RoleCountOutputType without action
	 */
	export type RoleCountOutputTypeDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the RoleCountOutputType
		 */
		select?: RoleCountOutputTypeSelect<ExtArgs> | null
	}

	/**
	 * RoleCountOutputType without action
	 */
	export type RoleCountOutputTypeCountPermissionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: PermissionWhereInput
	}

	/**
	 * RoleCountOutputType without action
	 */
	export type RoleCountOutputTypeCountUsersArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: UserWhereInput
	}

	/**
	 * Models
	 */

	/**
	 * Model User
	 */

	export type AggregateUser = {
		_count: UserCountAggregateOutputType | null
		_min: UserMinAggregateOutputType | null
		_max: UserMaxAggregateOutputType | null
	}

	export type UserMinAggregateOutputType = {
		id: string | null
		email: string | null
		username: string | null
		name: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type UserMaxAggregateOutputType = {
		id: string | null
		email: string | null
		username: string | null
		name: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type UserCountAggregateOutputType = {
		id: number
		email: number
		username: number
		name: number
		createdAt: number
		updatedAt: number
		_all: number
	}

	export type UserMinAggregateInputType = {
		id?: true
		email?: true
		username?: true
		name?: true
		createdAt?: true
		updatedAt?: true
	}

	export type UserMaxAggregateInputType = {
		id?: true
		email?: true
		username?: true
		name?: true
		createdAt?: true
		updatedAt?: true
	}

	export type UserCountAggregateInputType = {
		id?: true
		email?: true
		username?: true
		name?: true
		createdAt?: true
		updatedAt?: true
		_all?: true
	}

	export type UserAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which User to aggregate.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Users
		 **/
		_count?: true | UserCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: UserMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: UserMaxAggregateInputType
	}

	export type GetUserAggregateType<T extends UserAggregateArgs> = {
		[P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateUser[P]>
			: GetScalarType<T[P], AggregateUser[P]>
	}

	export type UserGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: UserWhereInput
		orderBy?:
			| UserOrderByWithAggregationInput
			| UserOrderByWithAggregationInput[]
		by: UserScalarFieldEnum[] | UserScalarFieldEnum
		having?: UserScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: UserCountAggregateInputType | true
		_min?: UserMinAggregateInputType
		_max?: UserMaxAggregateInputType
	}

	export type UserGroupByOutputType = {
		id: string
		email: string
		username: string
		name: string | null
		createdAt: Date
		updatedAt: Date
		_count: UserCountAggregateOutputType | null
		_min: UserMinAggregateOutputType | null
		_max: UserMaxAggregateOutputType | null
	}

	type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<UserGroupByOutputType, T['by']> & {
				[P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], UserGroupByOutputType[P]>
					: GetScalarType<T[P], UserGroupByOutputType[P]>
			}
		>
	>

	export type UserSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			email?: boolean
			username?: boolean
			name?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			connections?: boolean | User$connectionsArgs<ExtArgs>
			passkey?: boolean | User$passkeyArgs<ExtArgs>
			password?: boolean | User$passwordArgs<ExtArgs>
			sessions?: boolean | User$sessionsArgs<ExtArgs>
			image?: boolean | User$imageArgs<ExtArgs>
			roles?: boolean | User$rolesArgs<ExtArgs>
			_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['user']
	>

	export type UserSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			email?: boolean
			username?: boolean
			name?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['user']
	>

	export type UserSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			email?: boolean
			username?: boolean
			name?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['user']
	>

	export type UserSelectScalar = {
		id?: boolean
		email?: boolean
		username?: boolean
		name?: boolean
		createdAt?: boolean
		updatedAt?: boolean
	}

	export type UserOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'id' | 'email' | 'username' | 'name' | 'createdAt' | 'updatedAt',
		ExtArgs['result']['user']
	>
	export type UserInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		connections?: boolean | User$connectionsArgs<ExtArgs>
		passkey?: boolean | User$passkeyArgs<ExtArgs>
		password?: boolean | User$passwordArgs<ExtArgs>
		sessions?: boolean | User$sessionsArgs<ExtArgs>
		image?: boolean | User$imageArgs<ExtArgs>
		roles?: boolean | User$rolesArgs<ExtArgs>
		_count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
	}
	export type UserIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}
	export type UserIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}

	export type $UserPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'User'
		objects: {
			connections: Prisma.$ConnectionPayload<ExtArgs>[]
			passkey: Prisma.$PasskeyPayload<ExtArgs>[]
			password: Prisma.$PasswordPayload<ExtArgs> | null
			sessions: Prisma.$SessionPayload<ExtArgs>[]
			image: Prisma.$UserImagePayload<ExtArgs> | null
			roles: Prisma.$RolePayload<ExtArgs>[]
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				email: string
				username: string
				name: string | null
				createdAt: Date
				updatedAt: Date
			},
			ExtArgs['result']['user']
		>
		composites: {}
	}

	export type UserGetPayload<
		S extends boolean | null | undefined | UserDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>

	export type UserCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: UserCountAggregateInputType | true
	}

	export interface UserDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['User']
			meta: { name: 'User' }
		}
		/**
		 * Find zero or one User that matches the filter.
		 * @param {UserFindUniqueArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends UserFindUniqueArgs>(
			args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one User that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
			args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first User that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends UserFindFirstArgs>(
			args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first User that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
		 * @example
		 * // Get one User
		 * const user = await prisma.user.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
			args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Users that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Users
		 * const users = await prisma.user.findMany()
		 *
		 * // Get first 10 Users
		 * const users = await prisma.user.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends UserFindManyArgs>(
			args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a User.
		 * @param {UserCreateArgs} args - Arguments to create a User.
		 * @example
		 * // Create one User
		 * const User = await prisma.user.create({
		 *   data: {
		 *     // ... data to create a User
		 *   }
		 * })
		 *
		 */
		create<T extends UserCreateArgs>(
			args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Users.
		 * @param {UserCreateManyArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends UserCreateManyArgs>(
			args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Users and returns the data saved in the database.
		 * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
		 * @example
		 * // Create many Users
		 * const user = await prisma.user.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
			args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a User.
		 * @param {UserDeleteArgs} args - Arguments to delete one User.
		 * @example
		 * // Delete one User
		 * const User = await prisma.user.delete({
		 *   where: {
		 *     // ... filter to delete one User
		 *   }
		 * })
		 *
		 */
		delete<T extends UserDeleteArgs>(
			args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one User.
		 * @param {UserUpdateArgs} args - Arguments to update one User.
		 * @example
		 * // Update one User
		 * const user = await prisma.user.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends UserUpdateArgs>(
			args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Users.
		 * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
		 * @example
		 * // Delete a few Users
		 * const { count } = await prisma.user.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends UserDeleteManyArgs>(
			args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends UserUpdateManyArgs>(
			args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Users and returns the data updated in the database.
		 * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
		 * @example
		 * // Update many Users
		 * const user = await prisma.user.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Users and only return the `id`
		 * const userWithIdOnly = await prisma.user.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
			args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one User.
		 * @param {UserUpsertArgs} args - Arguments to update or create a User.
		 * @example
		 * // Update or create a User
		 * const user = await prisma.user.upsert({
		 *   create: {
		 *     // ... data to create a User
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the User we want to update
		 *   }
		 * })
		 */
		upsert<T extends UserUpsertArgs>(
			args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
		): Prisma__UserClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Users.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserCountArgs} args - Arguments to filter Users to count.
		 * @example
		 * // Count the number of Users
		 * const count = await prisma.user.count({
		 *   where: {
		 *     // ... the filter for the Users we want to count
		 *   }
		 * })
		 **/
		count<T extends UserCountArgs>(
			args?: Subset<T, UserCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], UserCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends UserAggregateArgs>(
			args: Subset<T, UserAggregateArgs>,
		): Prisma.PrismaPromise<GetUserAggregateType<T>>

		/**
		 * Group by User.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends UserGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: UserGroupByArgs['orderBy'] }
				: { orderBy?: UserGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetUserGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the User model
		 */
		readonly fields: UserFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for User.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__UserClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		connections<T extends User$connectionsArgs<ExtArgs> = {}>(
			args?: Subset<T, User$connectionsArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$ConnectionPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		passkey<T extends User$passkeyArgs<ExtArgs> = {}>(
			args?: Subset<T, User$passkeyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$PasskeyPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		password<T extends User$passwordArgs<ExtArgs> = {}>(
			args?: Subset<T, User$passwordArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>
		sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
			args?: Subset<T, User$sessionsArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$SessionPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		image<T extends User$imageArgs<ExtArgs> = {}>(
			args?: Subset<T, User$imageArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>
		roles<T extends User$rolesArgs<ExtArgs> = {}>(
			args?: Subset<T, User$rolesArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$RolePayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the User model
	 */
	export interface UserFieldRefs {
		readonly id: FieldRef<'User', 'String'>
		readonly email: FieldRef<'User', 'String'>
		readonly username: FieldRef<'User', 'String'>
		readonly name: FieldRef<'User', 'String'>
		readonly createdAt: FieldRef<'User', 'DateTime'>
		readonly updatedAt: FieldRef<'User', 'DateTime'>
	}

	// Custom InputTypes
	/**
	 * User findUnique
	 */
	export type UserFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User findUniqueOrThrow
	 */
	export type UserFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User findFirst
	 */
	export type UserFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User findFirstOrThrow
	 */
	export type UserFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which User to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Users.
		 */
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User findMany
	 */
	export type UserFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter, which Users to fetch.
		 */
		where?: UserWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Users to fetch.
		 */
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Users.
		 */
		cursor?: UserWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Users from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Users.
		 */
		skip?: number
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * User create
	 */
	export type UserCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The data needed to create a User.
		 */
		data: XOR<UserCreateInput, UserUncheckedCreateInput>
	}

	/**
	 * User createMany
	 */
	export type UserCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * User createManyAndReturn
	 */
	export type UserCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * The data used to create many Users.
		 */
		data: UserCreateManyInput | UserCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * User update
	 */
	export type UserUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The data needed to update a User.
		 */
		data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
		/**
		 * Choose, which User to update.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User updateMany
	 */
	export type UserUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to update.
		 */
		limit?: number
	}

	/**
	 * User updateManyAndReturn
	 */
	export type UserUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * The data used to update Users.
		 */
		data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
		/**
		 * Filter which Users to update
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to update.
		 */
		limit?: number
	}

	/**
	 * User upsert
	 */
	export type UserUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * The filter to search for the User to update in case it exists.
		 */
		where: UserWhereUniqueInput
		/**
		 * In case the User found by the `where` argument doesn't exist, create a new User with this data.
		 */
		create: XOR<UserCreateInput, UserUncheckedCreateInput>
		/**
		 * In case the User was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
	}

	/**
	 * User delete
	 */
	export type UserDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		/**
		 * Filter which User to delete.
		 */
		where: UserWhereUniqueInput
	}

	/**
	 * User deleteMany
	 */
	export type UserDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Users to delete
		 */
		where?: UserWhereInput
		/**
		 * Limit how many Users to delete.
		 */
		limit?: number
	}

	/**
	 * User.connections
	 */
	export type User$connectionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		where?: ConnectionWhereInput
		orderBy?:
			| ConnectionOrderByWithRelationInput
			| ConnectionOrderByWithRelationInput[]
		cursor?: ConnectionWhereUniqueInput
		take?: number
		skip?: number
		distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
	}

	/**
	 * User.passkey
	 */
	export type User$passkeyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		where?: PasskeyWhereInput
		orderBy?:
			| PasskeyOrderByWithRelationInput
			| PasskeyOrderByWithRelationInput[]
		cursor?: PasskeyWhereUniqueInput
		take?: number
		skip?: number
		distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
	}

	/**
	 * User.password
	 */
	export type User$passwordArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		where?: PasswordWhereInput
	}

	/**
	 * User.sessions
	 */
	export type User$sessionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		where?: SessionWhereInput
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[]
		cursor?: SessionWhereUniqueInput
		take?: number
		skip?: number
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
	}

	/**
	 * User.image
	 */
	export type User$imageArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		where?: UserImageWhereInput
	}

	/**
	 * User.roles
	 */
	export type User$rolesArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		where?: RoleWhereInput
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		cursor?: RoleWhereUniqueInput
		take?: number
		skip?: number
		distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
	}

	/**
	 * User without action
	 */
	export type UserDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
	}

	/**
	 * Model UserImage
	 */

	export type AggregateUserImage = {
		_count: UserImageCountAggregateOutputType | null
		_min: UserImageMinAggregateOutputType | null
		_max: UserImageMaxAggregateOutputType | null
	}

	export type UserImageMinAggregateOutputType = {
		id: string | null
		altText: string | null
		objectKey: string | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type UserImageMaxAggregateOutputType = {
		id: string | null
		altText: string | null
		objectKey: string | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type UserImageCountAggregateOutputType = {
		id: number
		altText: number
		objectKey: number
		createdAt: number
		updatedAt: number
		userId: number
		_all: number
	}

	export type UserImageMinAggregateInputType = {
		id?: true
		altText?: true
		objectKey?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type UserImageMaxAggregateInputType = {
		id?: true
		altText?: true
		objectKey?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type UserImageCountAggregateInputType = {
		id?: true
		altText?: true
		objectKey?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
		_all?: true
	}

	export type UserImageAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which UserImage to aggregate.
		 */
		where?: UserImageWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of UserImages to fetch.
		 */
		orderBy?:
			| UserImageOrderByWithRelationInput
			| UserImageOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: UserImageWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` UserImages from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` UserImages.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned UserImages
		 **/
		_count?: true | UserImageCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: UserImageMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: UserImageMaxAggregateInputType
	}

	export type GetUserImageAggregateType<T extends UserImageAggregateArgs> = {
		[P in keyof T & keyof AggregateUserImage]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateUserImage[P]>
			: GetScalarType<T[P], AggregateUserImage[P]>
	}

	export type UserImageGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: UserImageWhereInput
		orderBy?:
			| UserImageOrderByWithAggregationInput
			| UserImageOrderByWithAggregationInput[]
		by: UserImageScalarFieldEnum[] | UserImageScalarFieldEnum
		having?: UserImageScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: UserImageCountAggregateInputType | true
		_min?: UserImageMinAggregateInputType
		_max?: UserImageMaxAggregateInputType
	}

	export type UserImageGroupByOutputType = {
		id: string
		altText: string | null
		objectKey: string
		createdAt: Date
		updatedAt: Date
		userId: string
		_count: UserImageCountAggregateOutputType | null
		_min: UserImageMinAggregateOutputType | null
		_max: UserImageMaxAggregateOutputType | null
	}

	type GetUserImageGroupByPayload<T extends UserImageGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<UserImageGroupByOutputType, T['by']> & {
					[P in keyof T & keyof UserImageGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], UserImageGroupByOutputType[P]>
						: GetScalarType<T[P], UserImageGroupByOutputType[P]>
				}
			>
		>

	export type UserImageSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			altText?: boolean
			objectKey?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['userImage']
	>

	export type UserImageSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			altText?: boolean
			objectKey?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['userImage']
	>

	export type UserImageSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			altText?: boolean
			objectKey?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['userImage']
	>

	export type UserImageSelectScalar = {
		id?: boolean
		altText?: boolean
		objectKey?: boolean
		createdAt?: boolean
		updatedAt?: boolean
		userId?: boolean
	}

	export type UserImageOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'id' | 'altText' | 'objectKey' | 'createdAt' | 'updatedAt' | 'userId',
		ExtArgs['result']['userImage']
	>
	export type UserImageInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type UserImageIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type UserImageIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $UserImagePayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'UserImage'
		objects: {
			user: Prisma.$UserPayload<ExtArgs>
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				altText: string | null
				objectKey: string
				createdAt: Date
				updatedAt: Date
				userId: string
			},
			ExtArgs['result']['userImage']
		>
		composites: {}
	}

	export type UserImageGetPayload<
		S extends boolean | null | undefined | UserImageDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$UserImagePayload, S>

	export type UserImageCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<
		UserImageFindManyArgs,
		'select' | 'include' | 'distinct' | 'omit'
	> & {
		select?: UserImageCountAggregateInputType | true
	}

	export interface UserImageDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['UserImage']
			meta: { name: 'UserImage' }
		}
		/**
		 * Find zero or one UserImage that matches the filter.
		 * @param {UserImageFindUniqueArgs} args - Arguments to find a UserImage
		 * @example
		 * // Get one UserImage
		 * const userImage = await prisma.userImage.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends UserImageFindUniqueArgs>(
			args: SelectSubset<T, UserImageFindUniqueArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one UserImage that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {UserImageFindUniqueOrThrowArgs} args - Arguments to find a UserImage
		 * @example
		 * // Get one UserImage
		 * const userImage = await prisma.userImage.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends UserImageFindUniqueOrThrowArgs>(
			args: SelectSubset<T, UserImageFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first UserImage that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageFindFirstArgs} args - Arguments to find a UserImage
		 * @example
		 * // Get one UserImage
		 * const userImage = await prisma.userImage.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends UserImageFindFirstArgs>(
			args?: SelectSubset<T, UserImageFindFirstArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first UserImage that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageFindFirstOrThrowArgs} args - Arguments to find a UserImage
		 * @example
		 * // Get one UserImage
		 * const userImage = await prisma.userImage.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends UserImageFindFirstOrThrowArgs>(
			args?: SelectSubset<T, UserImageFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more UserImages that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all UserImages
		 * const userImages = await prisma.userImage.findMany()
		 *
		 * // Get first 10 UserImages
		 * const userImages = await prisma.userImage.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const userImageWithIdOnly = await prisma.userImage.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends UserImageFindManyArgs>(
			args?: SelectSubset<T, UserImageFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a UserImage.
		 * @param {UserImageCreateArgs} args - Arguments to create a UserImage.
		 * @example
		 * // Create one UserImage
		 * const UserImage = await prisma.userImage.create({
		 *   data: {
		 *     // ... data to create a UserImage
		 *   }
		 * })
		 *
		 */
		create<T extends UserImageCreateArgs>(
			args: SelectSubset<T, UserImageCreateArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many UserImages.
		 * @param {UserImageCreateManyArgs} args - Arguments to create many UserImages.
		 * @example
		 * // Create many UserImages
		 * const userImage = await prisma.userImage.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends UserImageCreateManyArgs>(
			args?: SelectSubset<T, UserImageCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many UserImages and returns the data saved in the database.
		 * @param {UserImageCreateManyAndReturnArgs} args - Arguments to create many UserImages.
		 * @example
		 * // Create many UserImages
		 * const userImage = await prisma.userImage.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many UserImages and only return the `id`
		 * const userImageWithIdOnly = await prisma.userImage.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends UserImageCreateManyAndReturnArgs>(
			args?: SelectSubset<T, UserImageCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a UserImage.
		 * @param {UserImageDeleteArgs} args - Arguments to delete one UserImage.
		 * @example
		 * // Delete one UserImage
		 * const UserImage = await prisma.userImage.delete({
		 *   where: {
		 *     // ... filter to delete one UserImage
		 *   }
		 * })
		 *
		 */
		delete<T extends UserImageDeleteArgs>(
			args: SelectSubset<T, UserImageDeleteArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one UserImage.
		 * @param {UserImageUpdateArgs} args - Arguments to update one UserImage.
		 * @example
		 * // Update one UserImage
		 * const userImage = await prisma.userImage.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends UserImageUpdateArgs>(
			args: SelectSubset<T, UserImageUpdateArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more UserImages.
		 * @param {UserImageDeleteManyArgs} args - Arguments to filter UserImages to delete.
		 * @example
		 * // Delete a few UserImages
		 * const { count } = await prisma.userImage.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends UserImageDeleteManyArgs>(
			args?: SelectSubset<T, UserImageDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more UserImages.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many UserImages
		 * const userImage = await prisma.userImage.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends UserImageUpdateManyArgs>(
			args: SelectSubset<T, UserImageUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more UserImages and returns the data updated in the database.
		 * @param {UserImageUpdateManyAndReturnArgs} args - Arguments to update many UserImages.
		 * @example
		 * // Update many UserImages
		 * const userImage = await prisma.userImage.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more UserImages and only return the `id`
		 * const userImageWithIdOnly = await prisma.userImage.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends UserImageUpdateManyAndReturnArgs>(
			args: SelectSubset<T, UserImageUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one UserImage.
		 * @param {UserImageUpsertArgs} args - Arguments to update or create a UserImage.
		 * @example
		 * // Update or create a UserImage
		 * const userImage = await prisma.userImage.upsert({
		 *   create: {
		 *     // ... data to create a UserImage
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the UserImage we want to update
		 *   }
		 * })
		 */
		upsert<T extends UserImageUpsertArgs>(
			args: SelectSubset<T, UserImageUpsertArgs<ExtArgs>>,
		): Prisma__UserImageClient<
			runtime.Types.Result.GetResult<
				Prisma.$UserImagePayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of UserImages.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageCountArgs} args - Arguments to filter UserImages to count.
		 * @example
		 * // Count the number of UserImages
		 * const count = await prisma.userImage.count({
		 *   where: {
		 *     // ... the filter for the UserImages we want to count
		 *   }
		 * })
		 **/
		count<T extends UserImageCountArgs>(
			args?: Subset<T, UserImageCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], UserImageCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a UserImage.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends UserImageAggregateArgs>(
			args: Subset<T, UserImageAggregateArgs>,
		): Prisma.PrismaPromise<GetUserImageAggregateType<T>>

		/**
		 * Group by UserImage.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {UserImageGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends UserImageGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: UserImageGroupByArgs['orderBy'] }
				: { orderBy?: UserImageGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, UserImageGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetUserImageGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the UserImage model
		 */
		readonly fields: UserImageFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for UserImage.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__UserImageClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the UserImage model
	 */
	export interface UserImageFieldRefs {
		readonly id: FieldRef<'UserImage', 'String'>
		readonly altText: FieldRef<'UserImage', 'String'>
		readonly objectKey: FieldRef<'UserImage', 'String'>
		readonly createdAt: FieldRef<'UserImage', 'DateTime'>
		readonly updatedAt: FieldRef<'UserImage', 'DateTime'>
		readonly userId: FieldRef<'UserImage', 'String'>
	}

	// Custom InputTypes
	/**
	 * UserImage findUnique
	 */
	export type UserImageFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter, which UserImage to fetch.
		 */
		where: UserImageWhereUniqueInput
	}

	/**
	 * UserImage findUniqueOrThrow
	 */
	export type UserImageFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter, which UserImage to fetch.
		 */
		where: UserImageWhereUniqueInput
	}

	/**
	 * UserImage findFirst
	 */
	export type UserImageFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter, which UserImage to fetch.
		 */
		where?: UserImageWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of UserImages to fetch.
		 */
		orderBy?:
			| UserImageOrderByWithRelationInput
			| UserImageOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for UserImages.
		 */
		cursor?: UserImageWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` UserImages from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` UserImages.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of UserImages.
		 */
		distinct?: UserImageScalarFieldEnum | UserImageScalarFieldEnum[]
	}

	/**
	 * UserImage findFirstOrThrow
	 */
	export type UserImageFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter, which UserImage to fetch.
		 */
		where?: UserImageWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of UserImages to fetch.
		 */
		orderBy?:
			| UserImageOrderByWithRelationInput
			| UserImageOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for UserImages.
		 */
		cursor?: UserImageWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` UserImages from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` UserImages.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of UserImages.
		 */
		distinct?: UserImageScalarFieldEnum | UserImageScalarFieldEnum[]
	}

	/**
	 * UserImage findMany
	 */
	export type UserImageFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter, which UserImages to fetch.
		 */
		where?: UserImageWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of UserImages to fetch.
		 */
		orderBy?:
			| UserImageOrderByWithRelationInput
			| UserImageOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing UserImages.
		 */
		cursor?: UserImageWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` UserImages from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` UserImages.
		 */
		skip?: number
		distinct?: UserImageScalarFieldEnum | UserImageScalarFieldEnum[]
	}

	/**
	 * UserImage create
	 */
	export type UserImageCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * The data needed to create a UserImage.
		 */
		data: XOR<UserImageCreateInput, UserImageUncheckedCreateInput>
	}

	/**
	 * UserImage createMany
	 */
	export type UserImageCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many UserImages.
		 */
		data: UserImageCreateManyInput | UserImageCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * UserImage createManyAndReturn
	 */
	export type UserImageCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * The data used to create many UserImages.
		 */
		data: UserImageCreateManyInput | UserImageCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * UserImage update
	 */
	export type UserImageUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * The data needed to update a UserImage.
		 */
		data: XOR<UserImageUpdateInput, UserImageUncheckedUpdateInput>
		/**
		 * Choose, which UserImage to update.
		 */
		where: UserImageWhereUniqueInput
	}

	/**
	 * UserImage updateMany
	 */
	export type UserImageUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update UserImages.
		 */
		data: XOR<
			UserImageUpdateManyMutationInput,
			UserImageUncheckedUpdateManyInput
		>
		/**
		 * Filter which UserImages to update
		 */
		where?: UserImageWhereInput
		/**
		 * Limit how many UserImages to update.
		 */
		limit?: number
	}

	/**
	 * UserImage updateManyAndReturn
	 */
	export type UserImageUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * The data used to update UserImages.
		 */
		data: XOR<
			UserImageUpdateManyMutationInput,
			UserImageUncheckedUpdateManyInput
		>
		/**
		 * Filter which UserImages to update
		 */
		where?: UserImageWhereInput
		/**
		 * Limit how many UserImages to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * UserImage upsert
	 */
	export type UserImageUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * The filter to search for the UserImage to update in case it exists.
		 */
		where: UserImageWhereUniqueInput
		/**
		 * In case the UserImage found by the `where` argument doesn't exist, create a new UserImage with this data.
		 */
		create: XOR<UserImageCreateInput, UserImageUncheckedCreateInput>
		/**
		 * In case the UserImage was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<UserImageUpdateInput, UserImageUncheckedUpdateInput>
	}

	/**
	 * UserImage delete
	 */
	export type UserImageDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
		/**
		 * Filter which UserImage to delete.
		 */
		where: UserImageWhereUniqueInput
	}

	/**
	 * UserImage deleteMany
	 */
	export type UserImageDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which UserImages to delete
		 */
		where?: UserImageWhereInput
		/**
		 * Limit how many UserImages to delete.
		 */
		limit?: number
	}

	/**
	 * UserImage without action
	 */
	export type UserImageDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the UserImage
		 */
		select?: UserImageSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the UserImage
		 */
		omit?: UserImageOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserImageInclude<ExtArgs> | null
	}

	/**
	 * Model Password
	 */

	export type AggregatePassword = {
		_count: PasswordCountAggregateOutputType | null
		_min: PasswordMinAggregateOutputType | null
		_max: PasswordMaxAggregateOutputType | null
	}

	export type PasswordMinAggregateOutputType = {
		hash: string | null
		userId: string | null
		requiredReset: boolean | null
	}

	export type PasswordMaxAggregateOutputType = {
		hash: string | null
		userId: string | null
		requiredReset: boolean | null
	}

	export type PasswordCountAggregateOutputType = {
		hash: number
		userId: number
		requiredReset: number
		_all: number
	}

	export type PasswordMinAggregateInputType = {
		hash?: true
		userId?: true
		requiredReset?: true
	}

	export type PasswordMaxAggregateInputType = {
		hash?: true
		userId?: true
		requiredReset?: true
	}

	export type PasswordCountAggregateInputType = {
		hash?: true
		userId?: true
		requiredReset?: true
		_all?: true
	}

	export type PasswordAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Password to aggregate.
		 */
		where?: PasswordWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passwords to fetch.
		 */
		orderBy?:
			| PasswordOrderByWithRelationInput
			| PasswordOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: PasswordWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passwords from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passwords.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Passwords
		 **/
		_count?: true | PasswordCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: PasswordMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: PasswordMaxAggregateInputType
	}

	export type GetPasswordAggregateType<T extends PasswordAggregateArgs> = {
		[P in keyof T & keyof AggregatePassword]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregatePassword[P]>
			: GetScalarType<T[P], AggregatePassword[P]>
	}

	export type PasswordGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: PasswordWhereInput
		orderBy?:
			| PasswordOrderByWithAggregationInput
			| PasswordOrderByWithAggregationInput[]
		by: PasswordScalarFieldEnum[] | PasswordScalarFieldEnum
		having?: PasswordScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: PasswordCountAggregateInputType | true
		_min?: PasswordMinAggregateInputType
		_max?: PasswordMaxAggregateInputType
	}

	export type PasswordGroupByOutputType = {
		hash: string
		userId: string
		requiredReset: boolean
		_count: PasswordCountAggregateOutputType | null
		_min: PasswordMinAggregateOutputType | null
		_max: PasswordMaxAggregateOutputType | null
	}

	type GetPasswordGroupByPayload<T extends PasswordGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<PasswordGroupByOutputType, T['by']> & {
					[P in keyof T & keyof PasswordGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], PasswordGroupByOutputType[P]>
						: GetScalarType<T[P], PasswordGroupByOutputType[P]>
				}
			>
		>

	export type PasswordSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			hash?: boolean
			userId?: boolean
			requiredReset?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['password']
	>

	export type PasswordSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			hash?: boolean
			userId?: boolean
			requiredReset?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['password']
	>

	export type PasswordSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			hash?: boolean
			userId?: boolean
			requiredReset?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['password']
	>

	export type PasswordSelectScalar = {
		hash?: boolean
		userId?: boolean
		requiredReset?: boolean
	}

	export type PasswordOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'hash' | 'userId' | 'requiredReset',
		ExtArgs['result']['password']
	>
	export type PasswordInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type PasswordIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type PasswordIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $PasswordPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Password'
		objects: {
			user: Prisma.$UserPayload<ExtArgs>
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				hash: string
				userId: string
				requiredReset: boolean
			},
			ExtArgs['result']['password']
		>
		composites: {}
	}

	export type PasswordGetPayload<
		S extends boolean | null | undefined | PasswordDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$PasswordPayload, S>

	export type PasswordCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<PasswordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: PasswordCountAggregateInputType | true
	}

	export interface PasswordDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Password']
			meta: { name: 'Password' }
		}
		/**
		 * Find zero or one Password that matches the filter.
		 * @param {PasswordFindUniqueArgs} args - Arguments to find a Password
		 * @example
		 * // Get one Password
		 * const password = await prisma.password.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends PasswordFindUniqueArgs>(
			args: SelectSubset<T, PasswordFindUniqueArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Password that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {PasswordFindUniqueOrThrowArgs} args - Arguments to find a Password
		 * @example
		 * // Get one Password
		 * const password = await prisma.password.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends PasswordFindUniqueOrThrowArgs>(
			args: SelectSubset<T, PasswordFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Password that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordFindFirstArgs} args - Arguments to find a Password
		 * @example
		 * // Get one Password
		 * const password = await prisma.password.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends PasswordFindFirstArgs>(
			args?: SelectSubset<T, PasswordFindFirstArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Password that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordFindFirstOrThrowArgs} args - Arguments to find a Password
		 * @example
		 * // Get one Password
		 * const password = await prisma.password.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends PasswordFindFirstOrThrowArgs>(
			args?: SelectSubset<T, PasswordFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Passwords that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Passwords
		 * const passwords = await prisma.password.findMany()
		 *
		 * // Get first 10 Passwords
		 * const passwords = await prisma.password.findMany({ take: 10 })
		 *
		 * // Only select the `hash`
		 * const passwordWithHashOnly = await prisma.password.findMany({ select: { hash: true } })
		 *
		 */
		findMany<T extends PasswordFindManyArgs>(
			args?: SelectSubset<T, PasswordFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Password.
		 * @param {PasswordCreateArgs} args - Arguments to create a Password.
		 * @example
		 * // Create one Password
		 * const Password = await prisma.password.create({
		 *   data: {
		 *     // ... data to create a Password
		 *   }
		 * })
		 *
		 */
		create<T extends PasswordCreateArgs>(
			args: SelectSubset<T, PasswordCreateArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Passwords.
		 * @param {PasswordCreateManyArgs} args - Arguments to create many Passwords.
		 * @example
		 * // Create many Passwords
		 * const password = await prisma.password.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends PasswordCreateManyArgs>(
			args?: SelectSubset<T, PasswordCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Passwords and returns the data saved in the database.
		 * @param {PasswordCreateManyAndReturnArgs} args - Arguments to create many Passwords.
		 * @example
		 * // Create many Passwords
		 * const password = await prisma.password.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Passwords and only return the `hash`
		 * const passwordWithHashOnly = await prisma.password.createManyAndReturn({
		 *   select: { hash: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends PasswordCreateManyAndReturnArgs>(
			args?: SelectSubset<T, PasswordCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Password.
		 * @param {PasswordDeleteArgs} args - Arguments to delete one Password.
		 * @example
		 * // Delete one Password
		 * const Password = await prisma.password.delete({
		 *   where: {
		 *     // ... filter to delete one Password
		 *   }
		 * })
		 *
		 */
		delete<T extends PasswordDeleteArgs>(
			args: SelectSubset<T, PasswordDeleteArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Password.
		 * @param {PasswordUpdateArgs} args - Arguments to update one Password.
		 * @example
		 * // Update one Password
		 * const password = await prisma.password.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends PasswordUpdateArgs>(
			args: SelectSubset<T, PasswordUpdateArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Passwords.
		 * @param {PasswordDeleteManyArgs} args - Arguments to filter Passwords to delete.
		 * @example
		 * // Delete a few Passwords
		 * const { count } = await prisma.password.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends PasswordDeleteManyArgs>(
			args?: SelectSubset<T, PasswordDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Passwords.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Passwords
		 * const password = await prisma.password.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends PasswordUpdateManyArgs>(
			args: SelectSubset<T, PasswordUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Passwords and returns the data updated in the database.
		 * @param {PasswordUpdateManyAndReturnArgs} args - Arguments to update many Passwords.
		 * @example
		 * // Update many Passwords
		 * const password = await prisma.password.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Passwords and only return the `hash`
		 * const passwordWithHashOnly = await prisma.password.updateManyAndReturn({
		 *   select: { hash: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends PasswordUpdateManyAndReturnArgs>(
			args: SelectSubset<T, PasswordUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Password.
		 * @param {PasswordUpsertArgs} args - Arguments to update or create a Password.
		 * @example
		 * // Update or create a Password
		 * const password = await prisma.password.upsert({
		 *   create: {
		 *     // ... data to create a Password
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Password we want to update
		 *   }
		 * })
		 */
		upsert<T extends PasswordUpsertArgs>(
			args: SelectSubset<T, PasswordUpsertArgs<ExtArgs>>,
		): Prisma__PasswordClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasswordPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Passwords.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordCountArgs} args - Arguments to filter Passwords to count.
		 * @example
		 * // Count the number of Passwords
		 * const count = await prisma.password.count({
		 *   where: {
		 *     // ... the filter for the Passwords we want to count
		 *   }
		 * })
		 **/
		count<T extends PasswordCountArgs>(
			args?: Subset<T, PasswordCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], PasswordCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Password.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends PasswordAggregateArgs>(
			args: Subset<T, PasswordAggregateArgs>,
		): Prisma.PrismaPromise<GetPasswordAggregateType<T>>

		/**
		 * Group by Password.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasswordGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends PasswordGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: PasswordGroupByArgs['orderBy'] }
				: { orderBy?: PasswordGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, PasswordGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetPasswordGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Password model
		 */
		readonly fields: PasswordFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Password.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__PasswordClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Password model
	 */
	export interface PasswordFieldRefs {
		readonly hash: FieldRef<'Password', 'String'>
		readonly userId: FieldRef<'Password', 'String'>
		readonly requiredReset: FieldRef<'Password', 'Boolean'>
	}

	// Custom InputTypes
	/**
	 * Password findUnique
	 */
	export type PasswordFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter, which Password to fetch.
		 */
		where: PasswordWhereUniqueInput
	}

	/**
	 * Password findUniqueOrThrow
	 */
	export type PasswordFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter, which Password to fetch.
		 */
		where: PasswordWhereUniqueInput
	}

	/**
	 * Password findFirst
	 */
	export type PasswordFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter, which Password to fetch.
		 */
		where?: PasswordWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passwords to fetch.
		 */
		orderBy?:
			| PasswordOrderByWithRelationInput
			| PasswordOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Passwords.
		 */
		cursor?: PasswordWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passwords from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passwords.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Passwords.
		 */
		distinct?: PasswordScalarFieldEnum | PasswordScalarFieldEnum[]
	}

	/**
	 * Password findFirstOrThrow
	 */
	export type PasswordFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter, which Password to fetch.
		 */
		where?: PasswordWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passwords to fetch.
		 */
		orderBy?:
			| PasswordOrderByWithRelationInput
			| PasswordOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Passwords.
		 */
		cursor?: PasswordWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passwords from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passwords.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Passwords.
		 */
		distinct?: PasswordScalarFieldEnum | PasswordScalarFieldEnum[]
	}

	/**
	 * Password findMany
	 */
	export type PasswordFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter, which Passwords to fetch.
		 */
		where?: PasswordWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passwords to fetch.
		 */
		orderBy?:
			| PasswordOrderByWithRelationInput
			| PasswordOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Passwords.
		 */
		cursor?: PasswordWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passwords from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passwords.
		 */
		skip?: number
		distinct?: PasswordScalarFieldEnum | PasswordScalarFieldEnum[]
	}

	/**
	 * Password create
	 */
	export type PasswordCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * The data needed to create a Password.
		 */
		data: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
	}

	/**
	 * Password createMany
	 */
	export type PasswordCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Passwords.
		 */
		data: PasswordCreateManyInput | PasswordCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Password createManyAndReturn
	 */
	export type PasswordCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * The data used to create many Passwords.
		 */
		data: PasswordCreateManyInput | PasswordCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Password update
	 */
	export type PasswordUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * The data needed to update a Password.
		 */
		data: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
		/**
		 * Choose, which Password to update.
		 */
		where: PasswordWhereUniqueInput
	}

	/**
	 * Password updateMany
	 */
	export type PasswordUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Passwords.
		 */
		data: XOR<PasswordUpdateManyMutationInput, PasswordUncheckedUpdateManyInput>
		/**
		 * Filter which Passwords to update
		 */
		where?: PasswordWhereInput
		/**
		 * Limit how many Passwords to update.
		 */
		limit?: number
	}

	/**
	 * Password updateManyAndReturn
	 */
	export type PasswordUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * The data used to update Passwords.
		 */
		data: XOR<PasswordUpdateManyMutationInput, PasswordUncheckedUpdateManyInput>
		/**
		 * Filter which Passwords to update
		 */
		where?: PasswordWhereInput
		/**
		 * Limit how many Passwords to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Password upsert
	 */
	export type PasswordUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * The filter to search for the Password to update in case it exists.
		 */
		where: PasswordWhereUniqueInput
		/**
		 * In case the Password found by the `where` argument doesn't exist, create a new Password with this data.
		 */
		create: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
		/**
		 * In case the Password was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
	}

	/**
	 * Password delete
	 */
	export type PasswordDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
		/**
		 * Filter which Password to delete.
		 */
		where: PasswordWhereUniqueInput
	}

	/**
	 * Password deleteMany
	 */
	export type PasswordDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Passwords to delete
		 */
		where?: PasswordWhereInput
		/**
		 * Limit how many Passwords to delete.
		 */
		limit?: number
	}

	/**
	 * Password without action
	 */
	export type PasswordDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Password
		 */
		select?: PasswordSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Password
		 */
		omit?: PasswordOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasswordInclude<ExtArgs> | null
	}

	/**
	 * Model Session
	 */

	export type AggregateSession = {
		_count: SessionCountAggregateOutputType | null
		_min: SessionMinAggregateOutputType | null
		_max: SessionMaxAggregateOutputType | null
	}

	export type SessionMinAggregateOutputType = {
		id: string | null
		expirationDate: Date | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type SessionMaxAggregateOutputType = {
		id: string | null
		expirationDate: Date | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type SessionCountAggregateOutputType = {
		id: number
		expirationDate: number
		createdAt: number
		updatedAt: number
		userId: number
		_all: number
	}

	export type SessionMinAggregateInputType = {
		id?: true
		expirationDate?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type SessionMaxAggregateInputType = {
		id?: true
		expirationDate?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type SessionCountAggregateInputType = {
		id?: true
		expirationDate?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
		_all?: true
	}

	export type SessionAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Session to aggregate.
		 */
		where?: SessionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: SessionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Sessions
		 **/
		_count?: true | SessionCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: SessionMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: SessionMaxAggregateInputType
	}

	export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
		[P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateSession[P]>
			: GetScalarType<T[P], AggregateSession[P]>
	}

	export type SessionGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: SessionWhereInput
		orderBy?:
			| SessionOrderByWithAggregationInput
			| SessionOrderByWithAggregationInput[]
		by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
		having?: SessionScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: SessionCountAggregateInputType | true
		_min?: SessionMinAggregateInputType
		_max?: SessionMaxAggregateInputType
	}

	export type SessionGroupByOutputType = {
		id: string
		expirationDate: Date
		createdAt: Date
		updatedAt: Date
		userId: string
		_count: SessionCountAggregateOutputType | null
		_min: SessionMinAggregateOutputType | null
		_max: SessionMaxAggregateOutputType | null
	}

	type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<SessionGroupByOutputType, T['by']> & {
					[P in keyof T & keyof SessionGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], SessionGroupByOutputType[P]>
						: GetScalarType<T[P], SessionGroupByOutputType[P]>
				}
			>
		>

	export type SessionSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			expirationDate?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['session']
	>

	export type SessionSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			expirationDate?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['session']
	>

	export type SessionSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			expirationDate?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['session']
	>

	export type SessionSelectScalar = {
		id?: boolean
		expirationDate?: boolean
		createdAt?: boolean
		updatedAt?: boolean
		userId?: boolean
	}

	export type SessionOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'id' | 'expirationDate' | 'createdAt' | 'updatedAt' | 'userId',
		ExtArgs['result']['session']
	>
	export type SessionInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type SessionIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type SessionIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $SessionPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Session'
		objects: {
			user: Prisma.$UserPayload<ExtArgs>
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				expirationDate: Date
				createdAt: Date
				updatedAt: Date
				userId: string
			},
			ExtArgs['result']['session']
		>
		composites: {}
	}

	export type SessionGetPayload<
		S extends boolean | null | undefined | SessionDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$SessionPayload, S>

	export type SessionCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: SessionCountAggregateInputType | true
	}

	export interface SessionDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Session']
			meta: { name: 'Session' }
		}
		/**
		 * Find zero or one Session that matches the filter.
		 * @param {SessionFindUniqueArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends SessionFindUniqueArgs>(
			args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Session that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
			args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Session that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindFirstArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends SessionFindFirstArgs>(
			args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Session that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
		 * @example
		 * // Get one Session
		 * const session = await prisma.session.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
			args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Sessions that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Sessions
		 * const sessions = await prisma.session.findMany()
		 *
		 * // Get first 10 Sessions
		 * const sessions = await prisma.session.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends SessionFindManyArgs>(
			args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Session.
		 * @param {SessionCreateArgs} args - Arguments to create a Session.
		 * @example
		 * // Create one Session
		 * const Session = await prisma.session.create({
		 *   data: {
		 *     // ... data to create a Session
		 *   }
		 * })
		 *
		 */
		create<T extends SessionCreateArgs>(
			args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Sessions.
		 * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
		 * @example
		 * // Create many Sessions
		 * const session = await prisma.session.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends SessionCreateManyArgs>(
			args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Sessions and returns the data saved in the database.
		 * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
		 * @example
		 * // Create many Sessions
		 * const session = await prisma.session.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Sessions and only return the `id`
		 * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
			args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Session.
		 * @param {SessionDeleteArgs} args - Arguments to delete one Session.
		 * @example
		 * // Delete one Session
		 * const Session = await prisma.session.delete({
		 *   where: {
		 *     // ... filter to delete one Session
		 *   }
		 * })
		 *
		 */
		delete<T extends SessionDeleteArgs>(
			args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Session.
		 * @param {SessionUpdateArgs} args - Arguments to update one Session.
		 * @example
		 * // Update one Session
		 * const session = await prisma.session.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends SessionUpdateArgs>(
			args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Sessions.
		 * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
		 * @example
		 * // Delete a few Sessions
		 * const { count } = await prisma.session.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends SessionDeleteManyArgs>(
			args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Sessions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Sessions
		 * const session = await prisma.session.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends SessionUpdateManyArgs>(
			args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Sessions and returns the data updated in the database.
		 * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
		 * @example
		 * // Update many Sessions
		 * const session = await prisma.session.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Sessions and only return the `id`
		 * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
			args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Session.
		 * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
		 * @example
		 * // Update or create a Session
		 * const session = await prisma.session.upsert({
		 *   create: {
		 *     // ... data to create a Session
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Session we want to update
		 *   }
		 * })
		 */
		upsert<T extends SessionUpsertArgs>(
			args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
		): Prisma__SessionClient<
			runtime.Types.Result.GetResult<
				Prisma.$SessionPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Sessions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
		 * @example
		 * // Count the number of Sessions
		 * const count = await prisma.session.count({
		 *   where: {
		 *     // ... the filter for the Sessions we want to count
		 *   }
		 * })
		 **/
		count<T extends SessionCountArgs>(
			args?: Subset<T, SessionCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], SessionCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Session.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends SessionAggregateArgs>(
			args: Subset<T, SessionAggregateArgs>,
		): Prisma.PrismaPromise<GetSessionAggregateType<T>>

		/**
		 * Group by Session.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {SessionGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends SessionGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: SessionGroupByArgs['orderBy'] }
				: { orderBy?: SessionGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetSessionGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Session model
		 */
		readonly fields: SessionFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Session.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__SessionClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Session model
	 */
	export interface SessionFieldRefs {
		readonly id: FieldRef<'Session', 'String'>
		readonly expirationDate: FieldRef<'Session', 'DateTime'>
		readonly createdAt: FieldRef<'Session', 'DateTime'>
		readonly updatedAt: FieldRef<'Session', 'DateTime'>
		readonly userId: FieldRef<'Session', 'String'>
	}

	// Custom InputTypes
	/**
	 * Session findUnique
	 */
	export type SessionFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter, which Session to fetch.
		 */
		where: SessionWhereUniqueInput
	}

	/**
	 * Session findUniqueOrThrow
	 */
	export type SessionFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter, which Session to fetch.
		 */
		where: SessionWhereUniqueInput
	}

	/**
	 * Session findFirst
	 */
	export type SessionFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter, which Session to fetch.
		 */
		where?: SessionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Sessions.
		 */
		cursor?: SessionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Sessions.
		 */
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
	}

	/**
	 * Session findFirstOrThrow
	 */
	export type SessionFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter, which Session to fetch.
		 */
		where?: SessionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Sessions.
		 */
		cursor?: SessionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Sessions.
		 */
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
	}

	/**
	 * Session findMany
	 */
	export type SessionFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter, which Sessions to fetch.
		 */
		where?: SessionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Sessions to fetch.
		 */
		orderBy?:
			| SessionOrderByWithRelationInput
			| SessionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Sessions.
		 */
		cursor?: SessionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Sessions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Sessions.
		 */
		skip?: number
		distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
	}

	/**
	 * Session create
	 */
	export type SessionCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * The data needed to create a Session.
		 */
		data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
	}

	/**
	 * Session createMany
	 */
	export type SessionCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Sessions.
		 */
		data: SessionCreateManyInput | SessionCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Session createManyAndReturn
	 */
	export type SessionCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * The data used to create many Sessions.
		 */
		data: SessionCreateManyInput | SessionCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Session update
	 */
	export type SessionUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * The data needed to update a Session.
		 */
		data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
		/**
		 * Choose, which Session to update.
		 */
		where: SessionWhereUniqueInput
	}

	/**
	 * Session updateMany
	 */
	export type SessionUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Sessions.
		 */
		data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
		/**
		 * Filter which Sessions to update
		 */
		where?: SessionWhereInput
		/**
		 * Limit how many Sessions to update.
		 */
		limit?: number
	}

	/**
	 * Session updateManyAndReturn
	 */
	export type SessionUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * The data used to update Sessions.
		 */
		data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
		/**
		 * Filter which Sessions to update
		 */
		where?: SessionWhereInput
		/**
		 * Limit how many Sessions to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Session upsert
	 */
	export type SessionUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * The filter to search for the Session to update in case it exists.
		 */
		where: SessionWhereUniqueInput
		/**
		 * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
		 */
		create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
		/**
		 * In case the Session was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
	}

	/**
	 * Session delete
	 */
	export type SessionDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
		/**
		 * Filter which Session to delete.
		 */
		where: SessionWhereUniqueInput
	}

	/**
	 * Session deleteMany
	 */
	export type SessionDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Sessions to delete
		 */
		where?: SessionWhereInput
		/**
		 * Limit how many Sessions to delete.
		 */
		limit?: number
	}

	/**
	 * Session without action
	 */
	export type SessionDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Session
		 */
		select?: SessionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Session
		 */
		omit?: SessionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: SessionInclude<ExtArgs> | null
	}

	/**
	 * Model Permission
	 */

	export type AggregatePermission = {
		_count: PermissionCountAggregateOutputType | null
		_min: PermissionMinAggregateOutputType | null
		_max: PermissionMaxAggregateOutputType | null
	}

	export type PermissionMinAggregateOutputType = {
		id: string | null
		action: string | null
		entity: string | null
		access: string | null
		description: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type PermissionMaxAggregateOutputType = {
		id: string | null
		action: string | null
		entity: string | null
		access: string | null
		description: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type PermissionCountAggregateOutputType = {
		id: number
		action: number
		entity: number
		access: number
		description: number
		createdAt: number
		updatedAt: number
		_all: number
	}

	export type PermissionMinAggregateInputType = {
		id?: true
		action?: true
		entity?: true
		access?: true
		description?: true
		createdAt?: true
		updatedAt?: true
	}

	export type PermissionMaxAggregateInputType = {
		id?: true
		action?: true
		entity?: true
		access?: true
		description?: true
		createdAt?: true
		updatedAt?: true
	}

	export type PermissionCountAggregateInputType = {
		id?: true
		action?: true
		entity?: true
		access?: true
		description?: true
		createdAt?: true
		updatedAt?: true
		_all?: true
	}

	export type PermissionAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Permission to aggregate.
		 */
		where?: PermissionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Permissions to fetch.
		 */
		orderBy?:
			| PermissionOrderByWithRelationInput
			| PermissionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: PermissionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Permissions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Permissions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Permissions
		 **/
		_count?: true | PermissionCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: PermissionMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: PermissionMaxAggregateInputType
	}

	export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
		[P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregatePermission[P]>
			: GetScalarType<T[P], AggregatePermission[P]>
	}

	export type PermissionGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: PermissionWhereInput
		orderBy?:
			| PermissionOrderByWithAggregationInput
			| PermissionOrderByWithAggregationInput[]
		by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
		having?: PermissionScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: PermissionCountAggregateInputType | true
		_min?: PermissionMinAggregateInputType
		_max?: PermissionMaxAggregateInputType
	}

	export type PermissionGroupByOutputType = {
		id: string
		action: string
		entity: string
		access: string
		description: string
		createdAt: Date
		updatedAt: Date
		_count: PermissionCountAggregateOutputType | null
		_min: PermissionMinAggregateOutputType | null
		_max: PermissionMaxAggregateOutputType | null
	}

	type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<PermissionGroupByOutputType, T['by']> & {
					[P in keyof T & keyof PermissionGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], PermissionGroupByOutputType[P]>
						: GetScalarType<T[P], PermissionGroupByOutputType[P]>
				}
			>
		>

	export type PermissionSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			action?: boolean
			entity?: boolean
			access?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			roles?: boolean | Permission$rolesArgs<ExtArgs>
			_count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['permission']
	>

	export type PermissionSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			action?: boolean
			entity?: boolean
			access?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['permission']
	>

	export type PermissionSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			action?: boolean
			entity?: boolean
			access?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['permission']
	>

	export type PermissionSelectScalar = {
		id?: boolean
		action?: boolean
		entity?: boolean
		access?: boolean
		description?: boolean
		createdAt?: boolean
		updatedAt?: boolean
	}

	export type PermissionOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		| 'id'
		| 'action'
		| 'entity'
		| 'access'
		| 'description'
		| 'createdAt'
		| 'updatedAt',
		ExtArgs['result']['permission']
	>
	export type PermissionInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		roles?: boolean | Permission$rolesArgs<ExtArgs>
		_count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
	}
	export type PermissionIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}
	export type PermissionIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}

	export type $PermissionPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Permission'
		objects: {
			roles: Prisma.$RolePayload<ExtArgs>[]
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				action: string
				entity: string
				access: string
				description: string
				createdAt: Date
				updatedAt: Date
			},
			ExtArgs['result']['permission']
		>
		composites: {}
	}

	export type PermissionGetPayload<
		S extends boolean | null | undefined | PermissionDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$PermissionPayload, S>

	export type PermissionCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<
		PermissionFindManyArgs,
		'select' | 'include' | 'distinct' | 'omit'
	> & {
		select?: PermissionCountAggregateInputType | true
	}

	export interface PermissionDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Permission']
			meta: { name: 'Permission' }
		}
		/**
		 * Find zero or one Permission that matches the filter.
		 * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
		 * @example
		 * // Get one Permission
		 * const permission = await prisma.permission.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends PermissionFindUniqueArgs>(
			args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
		 * @example
		 * // Get one Permission
		 * const permission = await prisma.permission.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(
			args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Permission that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
		 * @example
		 * // Get one Permission
		 * const permission = await prisma.permission.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends PermissionFindFirstArgs>(
			args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Permission that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
		 * @example
		 * // Get one Permission
		 * const permission = await prisma.permission.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(
			args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Permissions that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Permissions
		 * const permissions = await prisma.permission.findMany()
		 *
		 * // Get first 10 Permissions
		 * const permissions = await prisma.permission.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends PermissionFindManyArgs>(
			args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Permission.
		 * @param {PermissionCreateArgs} args - Arguments to create a Permission.
		 * @example
		 * // Create one Permission
		 * const Permission = await prisma.permission.create({
		 *   data: {
		 *     // ... data to create a Permission
		 *   }
		 * })
		 *
		 */
		create<T extends PermissionCreateArgs>(
			args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Permissions.
		 * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
		 * @example
		 * // Create many Permissions
		 * const permission = await prisma.permission.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends PermissionCreateManyArgs>(
			args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Permissions and returns the data saved in the database.
		 * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
		 * @example
		 * // Create many Permissions
		 * const permission = await prisma.permission.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Permissions and only return the `id`
		 * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(
			args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Permission.
		 * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
		 * @example
		 * // Delete one Permission
		 * const Permission = await prisma.permission.delete({
		 *   where: {
		 *     // ... filter to delete one Permission
		 *   }
		 * })
		 *
		 */
		delete<T extends PermissionDeleteArgs>(
			args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Permission.
		 * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
		 * @example
		 * // Update one Permission
		 * const permission = await prisma.permission.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends PermissionUpdateArgs>(
			args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Permissions.
		 * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
		 * @example
		 * // Delete a few Permissions
		 * const { count } = await prisma.permission.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends PermissionDeleteManyArgs>(
			args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Permissions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Permissions
		 * const permission = await prisma.permission.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends PermissionUpdateManyArgs>(
			args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Permissions and returns the data updated in the database.
		 * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
		 * @example
		 * // Update many Permissions
		 * const permission = await prisma.permission.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Permissions and only return the `id`
		 * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(
			args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Permission.
		 * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
		 * @example
		 * // Update or create a Permission
		 * const permission = await prisma.permission.upsert({
		 *   create: {
		 *     // ... data to create a Permission
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Permission we want to update
		 *   }
		 * })
		 */
		upsert<T extends PermissionUpsertArgs>(
			args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>,
		): Prisma__PermissionClient<
			runtime.Types.Result.GetResult<
				Prisma.$PermissionPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Permissions.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
		 * @example
		 * // Count the number of Permissions
		 * const count = await prisma.permission.count({
		 *   where: {
		 *     // ... the filter for the Permissions we want to count
		 *   }
		 * })
		 **/
		count<T extends PermissionCountArgs>(
			args?: Subset<T, PermissionCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], PermissionCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Permission.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends PermissionAggregateArgs>(
			args: Subset<T, PermissionAggregateArgs>,
		): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

		/**
		 * Group by Permission.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PermissionGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends PermissionGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: PermissionGroupByArgs['orderBy'] }
				: { orderBy?: PermissionGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetPermissionGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Permission model
		 */
		readonly fields: PermissionFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Permission.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__PermissionClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		roles<T extends Permission$rolesArgs<ExtArgs> = {}>(
			args?: Subset<T, Permission$rolesArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$RolePayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Permission model
	 */
	export interface PermissionFieldRefs {
		readonly id: FieldRef<'Permission', 'String'>
		readonly action: FieldRef<'Permission', 'String'>
		readonly entity: FieldRef<'Permission', 'String'>
		readonly access: FieldRef<'Permission', 'String'>
		readonly description: FieldRef<'Permission', 'String'>
		readonly createdAt: FieldRef<'Permission', 'DateTime'>
		readonly updatedAt: FieldRef<'Permission', 'DateTime'>
	}

	// Custom InputTypes
	/**
	 * Permission findUnique
	 */
	export type PermissionFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter, which Permission to fetch.
		 */
		where: PermissionWhereUniqueInput
	}

	/**
	 * Permission findUniqueOrThrow
	 */
	export type PermissionFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter, which Permission to fetch.
		 */
		where: PermissionWhereUniqueInput
	}

	/**
	 * Permission findFirst
	 */
	export type PermissionFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter, which Permission to fetch.
		 */
		where?: PermissionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Permissions to fetch.
		 */
		orderBy?:
			| PermissionOrderByWithRelationInput
			| PermissionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Permissions.
		 */
		cursor?: PermissionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Permissions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Permissions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Permissions.
		 */
		distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
	}

	/**
	 * Permission findFirstOrThrow
	 */
	export type PermissionFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter, which Permission to fetch.
		 */
		where?: PermissionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Permissions to fetch.
		 */
		orderBy?:
			| PermissionOrderByWithRelationInput
			| PermissionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Permissions.
		 */
		cursor?: PermissionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Permissions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Permissions.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Permissions.
		 */
		distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
	}

	/**
	 * Permission findMany
	 */
	export type PermissionFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter, which Permissions to fetch.
		 */
		where?: PermissionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Permissions to fetch.
		 */
		orderBy?:
			| PermissionOrderByWithRelationInput
			| PermissionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Permissions.
		 */
		cursor?: PermissionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Permissions from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Permissions.
		 */
		skip?: number
		distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
	}

	/**
	 * Permission create
	 */
	export type PermissionCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * The data needed to create a Permission.
		 */
		data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
	}

	/**
	 * Permission createMany
	 */
	export type PermissionCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Permissions.
		 */
		data: PermissionCreateManyInput | PermissionCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Permission createManyAndReturn
	 */
	export type PermissionCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * The data used to create many Permissions.
		 */
		data: PermissionCreateManyInput | PermissionCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Permission update
	 */
	export type PermissionUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * The data needed to update a Permission.
		 */
		data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
		/**
		 * Choose, which Permission to update.
		 */
		where: PermissionWhereUniqueInput
	}

	/**
	 * Permission updateMany
	 */
	export type PermissionUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Permissions.
		 */
		data: XOR<
			PermissionUpdateManyMutationInput,
			PermissionUncheckedUpdateManyInput
		>
		/**
		 * Filter which Permissions to update
		 */
		where?: PermissionWhereInput
		/**
		 * Limit how many Permissions to update.
		 */
		limit?: number
	}

	/**
	 * Permission updateManyAndReturn
	 */
	export type PermissionUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * The data used to update Permissions.
		 */
		data: XOR<
			PermissionUpdateManyMutationInput,
			PermissionUncheckedUpdateManyInput
		>
		/**
		 * Filter which Permissions to update
		 */
		where?: PermissionWhereInput
		/**
		 * Limit how many Permissions to update.
		 */
		limit?: number
	}

	/**
	 * Permission upsert
	 */
	export type PermissionUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * The filter to search for the Permission to update in case it exists.
		 */
		where: PermissionWhereUniqueInput
		/**
		 * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
		 */
		create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
		/**
		 * In case the Permission was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
	}

	/**
	 * Permission delete
	 */
	export type PermissionDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		/**
		 * Filter which Permission to delete.
		 */
		where: PermissionWhereUniqueInput
	}

	/**
	 * Permission deleteMany
	 */
	export type PermissionDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Permissions to delete
		 */
		where?: PermissionWhereInput
		/**
		 * Limit how many Permissions to delete.
		 */
		limit?: number
	}

	/**
	 * Permission.roles
	 */
	export type Permission$rolesArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		where?: RoleWhereInput
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		cursor?: RoleWhereUniqueInput
		take?: number
		skip?: number
		distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
	}

	/**
	 * Permission without action
	 */
	export type PermissionDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
	}

	/**
	 * Model Role
	 */

	export type AggregateRole = {
		_count: RoleCountAggregateOutputType | null
		_min: RoleMinAggregateOutputType | null
		_max: RoleMaxAggregateOutputType | null
	}

	export type RoleMinAggregateOutputType = {
		id: string | null
		name: string | null
		description: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type RoleMaxAggregateOutputType = {
		id: string | null
		name: string | null
		description: string | null
		createdAt: Date | null
		updatedAt: Date | null
	}

	export type RoleCountAggregateOutputType = {
		id: number
		name: number
		description: number
		createdAt: number
		updatedAt: number
		_all: number
	}

	export type RoleMinAggregateInputType = {
		id?: true
		name?: true
		description?: true
		createdAt?: true
		updatedAt?: true
	}

	export type RoleMaxAggregateInputType = {
		id?: true
		name?: true
		description?: true
		createdAt?: true
		updatedAt?: true
	}

	export type RoleCountAggregateInputType = {
		id?: true
		name?: true
		description?: true
		createdAt?: true
		updatedAt?: true
		_all?: true
	}

	export type RoleAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Role to aggregate.
		 */
		where?: RoleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Roles to fetch.
		 */
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: RoleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Roles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Roles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Roles
		 **/
		_count?: true | RoleCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: RoleMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: RoleMaxAggregateInputType
	}

	export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
		[P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateRole[P]>
			: GetScalarType<T[P], AggregateRole[P]>
	}

	export type RoleGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: RoleWhereInput
		orderBy?:
			| RoleOrderByWithAggregationInput
			| RoleOrderByWithAggregationInput[]
		by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
		having?: RoleScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: RoleCountAggregateInputType | true
		_min?: RoleMinAggregateInputType
		_max?: RoleMaxAggregateInputType
	}

	export type RoleGroupByOutputType = {
		id: string
		name: string
		description: string
		createdAt: Date
		updatedAt: Date
		_count: RoleCountAggregateOutputType | null
		_min: RoleMinAggregateOutputType | null
		_max: RoleMaxAggregateOutputType | null
	}

	type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<RoleGroupByOutputType, T['by']> & {
				[P in keyof T & keyof RoleGroupByOutputType]: P extends '_count'
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], RoleGroupByOutputType[P]>
					: GetScalarType<T[P], RoleGroupByOutputType[P]>
			}
		>
	>

	export type RoleSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			permissions?: boolean | Role$permissionsArgs<ExtArgs>
			users?: boolean | Role$usersArgs<ExtArgs>
			_count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['role']
	>

	export type RoleSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['role']
	>

	export type RoleSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			name?: boolean
			description?: boolean
			createdAt?: boolean
			updatedAt?: boolean
		},
		ExtArgs['result']['role']
	>

	export type RoleSelectScalar = {
		id?: boolean
		name?: boolean
		description?: boolean
		createdAt?: boolean
		updatedAt?: boolean
	}

	export type RoleOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'id' | 'name' | 'description' | 'createdAt' | 'updatedAt',
		ExtArgs['result']['role']
	>
	export type RoleInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		permissions?: boolean | Role$permissionsArgs<ExtArgs>
		users?: boolean | Role$usersArgs<ExtArgs>
		_count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
	}
	export type RoleIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}
	export type RoleIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {}

	export type $RolePayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Role'
		objects: {
			permissions: Prisma.$PermissionPayload<ExtArgs>[]
			users: Prisma.$UserPayload<ExtArgs>[]
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				name: string
				description: string
				createdAt: Date
				updatedAt: Date
			},
			ExtArgs['result']['role']
		>
		composites: {}
	}

	export type RoleGetPayload<
		S extends boolean | null | undefined | RoleDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$RolePayload, S>

	export type RoleCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: RoleCountAggregateInputType | true
	}

	export interface RoleDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Role']
			meta: { name: 'Role' }
		}
		/**
		 * Find zero or one Role that matches the filter.
		 * @param {RoleFindUniqueArgs} args - Arguments to find a Role
		 * @example
		 * // Get one Role
		 * const role = await prisma.role.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends RoleFindUniqueArgs>(
			args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Role that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
		 * @example
		 * // Get one Role
		 * const role = await prisma.role.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(
			args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Role that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleFindFirstArgs} args - Arguments to find a Role
		 * @example
		 * // Get one Role
		 * const role = await prisma.role.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends RoleFindFirstArgs>(
			args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Role that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
		 * @example
		 * // Get one Role
		 * const role = await prisma.role.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(
			args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Roles that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Roles
		 * const roles = await prisma.role.findMany()
		 *
		 * // Get first 10 Roles
		 * const roles = await prisma.role.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends RoleFindManyArgs>(
			args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Role.
		 * @param {RoleCreateArgs} args - Arguments to create a Role.
		 * @example
		 * // Create one Role
		 * const Role = await prisma.role.create({
		 *   data: {
		 *     // ... data to create a Role
		 *   }
		 * })
		 *
		 */
		create<T extends RoleCreateArgs>(
			args: SelectSubset<T, RoleCreateArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Roles.
		 * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
		 * @example
		 * // Create many Roles
		 * const role = await prisma.role.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends RoleCreateManyArgs>(
			args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Roles and returns the data saved in the database.
		 * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
		 * @example
		 * // Create many Roles
		 * const role = await prisma.role.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Roles and only return the `id`
		 * const roleWithIdOnly = await prisma.role.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(
			args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Role.
		 * @param {RoleDeleteArgs} args - Arguments to delete one Role.
		 * @example
		 * // Delete one Role
		 * const Role = await prisma.role.delete({
		 *   where: {
		 *     // ... filter to delete one Role
		 *   }
		 * })
		 *
		 */
		delete<T extends RoleDeleteArgs>(
			args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Role.
		 * @param {RoleUpdateArgs} args - Arguments to update one Role.
		 * @example
		 * // Update one Role
		 * const role = await prisma.role.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends RoleUpdateArgs>(
			args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Roles.
		 * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
		 * @example
		 * // Delete a few Roles
		 * const { count } = await prisma.role.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends RoleDeleteManyArgs>(
			args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Roles.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Roles
		 * const role = await prisma.role.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends RoleUpdateManyArgs>(
			args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Roles and returns the data updated in the database.
		 * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
		 * @example
		 * // Update many Roles
		 * const role = await prisma.role.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Roles and only return the `id`
		 * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(
			args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Role.
		 * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
		 * @example
		 * // Update or create a Role
		 * const role = await prisma.role.upsert({
		 *   create: {
		 *     // ... data to create a Role
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Role we want to update
		 *   }
		 * })
		 */
		upsert<T extends RoleUpsertArgs>(
			args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>,
		): Prisma__RoleClient<
			runtime.Types.Result.GetResult<
				Prisma.$RolePayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Roles.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleCountArgs} args - Arguments to filter Roles to count.
		 * @example
		 * // Count the number of Roles
		 * const count = await prisma.role.count({
		 *   where: {
		 *     // ... the filter for the Roles we want to count
		 *   }
		 * })
		 **/
		count<T extends RoleCountArgs>(
			args?: Subset<T, RoleCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], RoleCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Role.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends RoleAggregateArgs>(
			args: Subset<T, RoleAggregateArgs>,
		): Prisma.PrismaPromise<GetRoleAggregateType<T>>

		/**
		 * Group by Role.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {RoleGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends RoleGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: RoleGroupByArgs['orderBy'] }
				: { orderBy?: RoleGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetRoleGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Role model
		 */
		readonly fields: RoleFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Role.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__RoleClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(
			args?: Subset<T, Role$permissionsArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$PermissionPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		users<T extends Role$usersArgs<ExtArgs> = {}>(
			args?: Subset<T, Role$usersArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findMany',
					GlobalOmitOptions
			  >
			| Null
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Role model
	 */
	export interface RoleFieldRefs {
		readonly id: FieldRef<'Role', 'String'>
		readonly name: FieldRef<'Role', 'String'>
		readonly description: FieldRef<'Role', 'String'>
		readonly createdAt: FieldRef<'Role', 'DateTime'>
		readonly updatedAt: FieldRef<'Role', 'DateTime'>
	}

	// Custom InputTypes
	/**
	 * Role findUnique
	 */
	export type RoleFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter, which Role to fetch.
		 */
		where: RoleWhereUniqueInput
	}

	/**
	 * Role findUniqueOrThrow
	 */
	export type RoleFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter, which Role to fetch.
		 */
		where: RoleWhereUniqueInput
	}

	/**
	 * Role findFirst
	 */
	export type RoleFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter, which Role to fetch.
		 */
		where?: RoleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Roles to fetch.
		 */
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Roles.
		 */
		cursor?: RoleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Roles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Roles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Roles.
		 */
		distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
	}

	/**
	 * Role findFirstOrThrow
	 */
	export type RoleFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter, which Role to fetch.
		 */
		where?: RoleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Roles to fetch.
		 */
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Roles.
		 */
		cursor?: RoleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Roles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Roles.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Roles.
		 */
		distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
	}

	/**
	 * Role findMany
	 */
	export type RoleFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter, which Roles to fetch.
		 */
		where?: RoleWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Roles to fetch.
		 */
		orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Roles.
		 */
		cursor?: RoleWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Roles from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Roles.
		 */
		skip?: number
		distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
	}

	/**
	 * Role create
	 */
	export type RoleCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * The data needed to create a Role.
		 */
		data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
	}

	/**
	 * Role createMany
	 */
	export type RoleCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Roles.
		 */
		data: RoleCreateManyInput | RoleCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Role createManyAndReturn
	 */
	export type RoleCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * The data used to create many Roles.
		 */
		data: RoleCreateManyInput | RoleCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Role update
	 */
	export type RoleUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * The data needed to update a Role.
		 */
		data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
		/**
		 * Choose, which Role to update.
		 */
		where: RoleWhereUniqueInput
	}

	/**
	 * Role updateMany
	 */
	export type RoleUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Roles.
		 */
		data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
		/**
		 * Filter which Roles to update
		 */
		where?: RoleWhereInput
		/**
		 * Limit how many Roles to update.
		 */
		limit?: number
	}

	/**
	 * Role updateManyAndReturn
	 */
	export type RoleUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * The data used to update Roles.
		 */
		data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
		/**
		 * Filter which Roles to update
		 */
		where?: RoleWhereInput
		/**
		 * Limit how many Roles to update.
		 */
		limit?: number
	}

	/**
	 * Role upsert
	 */
	export type RoleUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * The filter to search for the Role to update in case it exists.
		 */
		where: RoleWhereUniqueInput
		/**
		 * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
		 */
		create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
		/**
		 * In case the Role was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
	}

	/**
	 * Role delete
	 */
	export type RoleDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
		/**
		 * Filter which Role to delete.
		 */
		where: RoleWhereUniqueInput
	}

	/**
	 * Role deleteMany
	 */
	export type RoleDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Roles to delete
		 */
		where?: RoleWhereInput
		/**
		 * Limit how many Roles to delete.
		 */
		limit?: number
	}

	/**
	 * Role.permissions
	 */
	export type Role$permissionsArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Permission
		 */
		select?: PermissionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Permission
		 */
		omit?: PermissionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PermissionInclude<ExtArgs> | null
		where?: PermissionWhereInput
		orderBy?:
			| PermissionOrderByWithRelationInput
			| PermissionOrderByWithRelationInput[]
		cursor?: PermissionWhereUniqueInput
		take?: number
		skip?: number
		distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
	}

	/**
	 * Role.users
	 */
	export type Role$usersArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the User
		 */
		select?: UserSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the User
		 */
		omit?: UserOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: UserInclude<ExtArgs> | null
		where?: UserWhereInput
		orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
		cursor?: UserWhereUniqueInput
		take?: number
		skip?: number
		distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
	}

	/**
	 * Role without action
	 */
	export type RoleDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Role
		 */
		select?: RoleSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Role
		 */
		omit?: RoleOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: RoleInclude<ExtArgs> | null
	}

	/**
	 * Model Verification
	 */

	export type AggregateVerification = {
		_count: VerificationCountAggregateOutputType | null
		_avg: VerificationAvgAggregateOutputType | null
		_sum: VerificationSumAggregateOutputType | null
		_min: VerificationMinAggregateOutputType | null
		_max: VerificationMaxAggregateOutputType | null
	}

	export type VerificationAvgAggregateOutputType = {
		digits: number | null
		period: number | null
	}

	export type VerificationSumAggregateOutputType = {
		digits: number | null
		period: number | null
	}

	export type VerificationMinAggregateOutputType = {
		id: string | null
		createdAt: Date | null
		type: string | null
		target: string | null
		secret: string | null
		algorithm: string | null
		digits: number | null
		period: number | null
		charSet: string | null
		expiresAt: Date | null
	}

	export type VerificationMaxAggregateOutputType = {
		id: string | null
		createdAt: Date | null
		type: string | null
		target: string | null
		secret: string | null
		algorithm: string | null
		digits: number | null
		period: number | null
		charSet: string | null
		expiresAt: Date | null
	}

	export type VerificationCountAggregateOutputType = {
		id: number
		createdAt: number
		type: number
		target: number
		secret: number
		algorithm: number
		digits: number
		period: number
		charSet: number
		expiresAt: number
		_all: number
	}

	export type VerificationAvgAggregateInputType = {
		digits?: true
		period?: true
	}

	export type VerificationSumAggregateInputType = {
		digits?: true
		period?: true
	}

	export type VerificationMinAggregateInputType = {
		id?: true
		createdAt?: true
		type?: true
		target?: true
		secret?: true
		algorithm?: true
		digits?: true
		period?: true
		charSet?: true
		expiresAt?: true
	}

	export type VerificationMaxAggregateInputType = {
		id?: true
		createdAt?: true
		type?: true
		target?: true
		secret?: true
		algorithm?: true
		digits?: true
		period?: true
		charSet?: true
		expiresAt?: true
	}

	export type VerificationCountAggregateInputType = {
		id?: true
		createdAt?: true
		type?: true
		target?: true
		secret?: true
		algorithm?: true
		digits?: true
		period?: true
		charSet?: true
		expiresAt?: true
		_all?: true
	}

	export type VerificationAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Verification to aggregate.
		 */
		where?: VerificationWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Verifications to fetch.
		 */
		orderBy?:
			| VerificationOrderByWithRelationInput
			| VerificationOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: VerificationWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Verifications from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Verifications.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Verifications
		 **/
		_count?: true | VerificationCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: VerificationAvgAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: VerificationSumAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: VerificationMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: VerificationMaxAggregateInputType
	}

	export type GetVerificationAggregateType<
		T extends VerificationAggregateArgs,
	> = {
		[P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateVerification[P]>
			: GetScalarType<T[P], AggregateVerification[P]>
	}

	export type VerificationGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: VerificationWhereInput
		orderBy?:
			| VerificationOrderByWithAggregationInput
			| VerificationOrderByWithAggregationInput[]
		by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
		having?: VerificationScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: VerificationCountAggregateInputType | true
		_avg?: VerificationAvgAggregateInputType
		_sum?: VerificationSumAggregateInputType
		_min?: VerificationMinAggregateInputType
		_max?: VerificationMaxAggregateInputType
	}

	export type VerificationGroupByOutputType = {
		id: string
		createdAt: Date
		type: string
		target: string
		secret: string
		algorithm: string
		digits: number
		period: number
		charSet: string
		expiresAt: Date | null
		_count: VerificationCountAggregateOutputType | null
		_avg: VerificationAvgAggregateOutputType | null
		_sum: VerificationSumAggregateOutputType | null
		_min: VerificationMinAggregateOutputType | null
		_max: VerificationMaxAggregateOutputType | null
	}

	type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<VerificationGroupByOutputType, T['by']> & {
					[P in keyof T &
						keyof VerificationGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], VerificationGroupByOutputType[P]>
						: GetScalarType<T[P], VerificationGroupByOutputType[P]>
				}
			>
		>

	export type VerificationSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			type?: boolean
			target?: boolean
			secret?: boolean
			algorithm?: boolean
			digits?: boolean
			period?: boolean
			charSet?: boolean
			expiresAt?: boolean
		},
		ExtArgs['result']['verification']
	>

	export type VerificationSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			type?: boolean
			target?: boolean
			secret?: boolean
			algorithm?: boolean
			digits?: boolean
			period?: boolean
			charSet?: boolean
			expiresAt?: boolean
		},
		ExtArgs['result']['verification']
	>

	export type VerificationSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			createdAt?: boolean
			type?: boolean
			target?: boolean
			secret?: boolean
			algorithm?: boolean
			digits?: boolean
			period?: boolean
			charSet?: boolean
			expiresAt?: boolean
		},
		ExtArgs['result']['verification']
	>

	export type VerificationSelectScalar = {
		id?: boolean
		createdAt?: boolean
		type?: boolean
		target?: boolean
		secret?: boolean
		algorithm?: boolean
		digits?: boolean
		period?: boolean
		charSet?: boolean
		expiresAt?: boolean
	}

	export type VerificationOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		| 'id'
		| 'createdAt'
		| 'type'
		| 'target'
		| 'secret'
		| 'algorithm'
		| 'digits'
		| 'period'
		| 'charSet'
		| 'expiresAt',
		ExtArgs['result']['verification']
	>

	export type $VerificationPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Verification'
		objects: {}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				createdAt: Date
				/**
				 * The type of verification, e.g. "email" or "phone"
				 */
				type: string
				/**
				 * The thing we're trying to verify, e.g. a user's email or phone number
				 */
				target: string
				/**
				 * The secret key used to generate the otp
				 */
				secret: string
				/**
				 * The algorithm used to generate the otp
				 */
				algorithm: string
				/**
				 * The number of digits in the otp
				 */
				digits: number
				/**
				 * The number of seconds the otp is valid for
				 */
				period: number
				/**
				 * The valid characters for the otp
				 */
				charSet: string
				/**
				 * When it's safe to delete this verification
				 */
				expiresAt: Date | null
			},
			ExtArgs['result']['verification']
		>
		composites: {}
	}

	export type VerificationGetPayload<
		S extends boolean | null | undefined | VerificationDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$VerificationPayload, S>

	export type VerificationCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<
		VerificationFindManyArgs,
		'select' | 'include' | 'distinct' | 'omit'
	> & {
		select?: VerificationCountAggregateInputType | true
	}

	export interface VerificationDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Verification']
			meta: { name: 'Verification' }
		}
		/**
		 * Find zero or one Verification that matches the filter.
		 * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
		 * @example
		 * // Get one Verification
		 * const verification = await prisma.verification.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends VerificationFindUniqueArgs>(
			args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
		 * @example
		 * // Get one Verification
		 * const verification = await prisma.verification.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(
			args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Verification that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
		 * @example
		 * // Get one Verification
		 * const verification = await prisma.verification.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends VerificationFindFirstArgs>(
			args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Verification that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
		 * @example
		 * // Get one Verification
		 * const verification = await prisma.verification.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(
			args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Verifications that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Verifications
		 * const verifications = await prisma.verification.findMany()
		 *
		 * // Get first 10 Verifications
		 * const verifications = await prisma.verification.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends VerificationFindManyArgs>(
			args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Verification.
		 * @param {VerificationCreateArgs} args - Arguments to create a Verification.
		 * @example
		 * // Create one Verification
		 * const Verification = await prisma.verification.create({
		 *   data: {
		 *     // ... data to create a Verification
		 *   }
		 * })
		 *
		 */
		create<T extends VerificationCreateArgs>(
			args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Verifications.
		 * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
		 * @example
		 * // Create many Verifications
		 * const verification = await prisma.verification.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends VerificationCreateManyArgs>(
			args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Verifications and returns the data saved in the database.
		 * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
		 * @example
		 * // Create many Verifications
		 * const verification = await prisma.verification.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Verifications and only return the `id`
		 * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(
			args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Verification.
		 * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
		 * @example
		 * // Delete one Verification
		 * const Verification = await prisma.verification.delete({
		 *   where: {
		 *     // ... filter to delete one Verification
		 *   }
		 * })
		 *
		 */
		delete<T extends VerificationDeleteArgs>(
			args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Verification.
		 * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
		 * @example
		 * // Update one Verification
		 * const verification = await prisma.verification.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends VerificationUpdateArgs>(
			args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Verifications.
		 * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
		 * @example
		 * // Delete a few Verifications
		 * const { count } = await prisma.verification.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends VerificationDeleteManyArgs>(
			args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Verifications.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Verifications
		 * const verification = await prisma.verification.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends VerificationUpdateManyArgs>(
			args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Verifications and returns the data updated in the database.
		 * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
		 * @example
		 * // Update many Verifications
		 * const verification = await prisma.verification.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Verifications and only return the `id`
		 * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(
			args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Verification.
		 * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
		 * @example
		 * // Update or create a Verification
		 * const verification = await prisma.verification.upsert({
		 *   create: {
		 *     // ... data to create a Verification
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Verification we want to update
		 *   }
		 * })
		 */
		upsert<T extends VerificationUpsertArgs>(
			args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>,
		): Prisma__VerificationClient<
			runtime.Types.Result.GetResult<
				Prisma.$VerificationPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Verifications.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
		 * @example
		 * // Count the number of Verifications
		 * const count = await prisma.verification.count({
		 *   where: {
		 *     // ... the filter for the Verifications we want to count
		 *   }
		 * })
		 **/
		count<T extends VerificationCountArgs>(
			args?: Subset<T, VerificationCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], VerificationCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Verification.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends VerificationAggregateArgs>(
			args: Subset<T, VerificationAggregateArgs>,
		): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

		/**
		 * Group by Verification.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {VerificationGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends VerificationGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: VerificationGroupByArgs['orderBy'] }
				: { orderBy?: VerificationGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetVerificationGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Verification model
		 */
		readonly fields: VerificationFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Verification.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__VerificationClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Verification model
	 */
	export interface VerificationFieldRefs {
		readonly id: FieldRef<'Verification', 'String'>
		readonly createdAt: FieldRef<'Verification', 'DateTime'>
		readonly type: FieldRef<'Verification', 'String'>
		readonly target: FieldRef<'Verification', 'String'>
		readonly secret: FieldRef<'Verification', 'String'>
		readonly algorithm: FieldRef<'Verification', 'String'>
		readonly digits: FieldRef<'Verification', 'Int'>
		readonly period: FieldRef<'Verification', 'Int'>
		readonly charSet: FieldRef<'Verification', 'String'>
		readonly expiresAt: FieldRef<'Verification', 'DateTime'>
	}

	// Custom InputTypes
	/**
	 * Verification findUnique
	 */
	export type VerificationFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter, which Verification to fetch.
		 */
		where: VerificationWhereUniqueInput
	}

	/**
	 * Verification findUniqueOrThrow
	 */
	export type VerificationFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter, which Verification to fetch.
		 */
		where: VerificationWhereUniqueInput
	}

	/**
	 * Verification findFirst
	 */
	export type VerificationFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter, which Verification to fetch.
		 */
		where?: VerificationWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Verifications to fetch.
		 */
		orderBy?:
			| VerificationOrderByWithRelationInput
			| VerificationOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Verifications.
		 */
		cursor?: VerificationWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Verifications from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Verifications.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Verifications.
		 */
		distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
	}

	/**
	 * Verification findFirstOrThrow
	 */
	export type VerificationFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter, which Verification to fetch.
		 */
		where?: VerificationWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Verifications to fetch.
		 */
		orderBy?:
			| VerificationOrderByWithRelationInput
			| VerificationOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Verifications.
		 */
		cursor?: VerificationWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Verifications from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Verifications.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Verifications.
		 */
		distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
	}

	/**
	 * Verification findMany
	 */
	export type VerificationFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter, which Verifications to fetch.
		 */
		where?: VerificationWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Verifications to fetch.
		 */
		orderBy?:
			| VerificationOrderByWithRelationInput
			| VerificationOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Verifications.
		 */
		cursor?: VerificationWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Verifications from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Verifications.
		 */
		skip?: number
		distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
	}

	/**
	 * Verification create
	 */
	export type VerificationCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * The data needed to create a Verification.
		 */
		data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
	}

	/**
	 * Verification createMany
	 */
	export type VerificationCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Verifications.
		 */
		data: VerificationCreateManyInput | VerificationCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Verification createManyAndReturn
	 */
	export type VerificationCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * The data used to create many Verifications.
		 */
		data: VerificationCreateManyInput | VerificationCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Verification update
	 */
	export type VerificationUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * The data needed to update a Verification.
		 */
		data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
		/**
		 * Choose, which Verification to update.
		 */
		where: VerificationWhereUniqueInput
	}

	/**
	 * Verification updateMany
	 */
	export type VerificationUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Verifications.
		 */
		data: XOR<
			VerificationUpdateManyMutationInput,
			VerificationUncheckedUpdateManyInput
		>
		/**
		 * Filter which Verifications to update
		 */
		where?: VerificationWhereInput
		/**
		 * Limit how many Verifications to update.
		 */
		limit?: number
	}

	/**
	 * Verification updateManyAndReturn
	 */
	export type VerificationUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * The data used to update Verifications.
		 */
		data: XOR<
			VerificationUpdateManyMutationInput,
			VerificationUncheckedUpdateManyInput
		>
		/**
		 * Filter which Verifications to update
		 */
		where?: VerificationWhereInput
		/**
		 * Limit how many Verifications to update.
		 */
		limit?: number
	}

	/**
	 * Verification upsert
	 */
	export type VerificationUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * The filter to search for the Verification to update in case it exists.
		 */
		where: VerificationWhereUniqueInput
		/**
		 * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
		 */
		create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
		/**
		 * In case the Verification was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
	}

	/**
	 * Verification delete
	 */
	export type VerificationDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
		/**
		 * Filter which Verification to delete.
		 */
		where: VerificationWhereUniqueInput
	}

	/**
	 * Verification deleteMany
	 */
	export type VerificationDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Verifications to delete
		 */
		where?: VerificationWhereInput
		/**
		 * Limit how many Verifications to delete.
		 */
		limit?: number
	}

	/**
	 * Verification without action
	 */
	export type VerificationDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Verification
		 */
		select?: VerificationSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Verification
		 */
		omit?: VerificationOmit<ExtArgs> | null
	}

	/**
	 * Model Connection
	 */

	export type AggregateConnection = {
		_count: ConnectionCountAggregateOutputType | null
		_min: ConnectionMinAggregateOutputType | null
		_max: ConnectionMaxAggregateOutputType | null
	}

	export type ConnectionMinAggregateOutputType = {
		id: string | null
		providerName: string | null
		providerId: string | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type ConnectionMaxAggregateOutputType = {
		id: string | null
		providerName: string | null
		providerId: string | null
		createdAt: Date | null
		updatedAt: Date | null
		userId: string | null
	}

	export type ConnectionCountAggregateOutputType = {
		id: number
		providerName: number
		providerId: number
		createdAt: number
		updatedAt: number
		userId: number
		_all: number
	}

	export type ConnectionMinAggregateInputType = {
		id?: true
		providerName?: true
		providerId?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type ConnectionMaxAggregateInputType = {
		id?: true
		providerName?: true
		providerId?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
	}

	export type ConnectionCountAggregateInputType = {
		id?: true
		providerName?: true
		providerId?: true
		createdAt?: true
		updatedAt?: true
		userId?: true
		_all?: true
	}

	export type ConnectionAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Connection to aggregate.
		 */
		where?: ConnectionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Connections to fetch.
		 */
		orderBy?:
			| ConnectionOrderByWithRelationInput
			| ConnectionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: ConnectionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Connections from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Connections.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Connections
		 **/
		_count?: true | ConnectionCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: ConnectionMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: ConnectionMaxAggregateInputType
	}

	export type GetConnectionAggregateType<T extends ConnectionAggregateArgs> = {
		[P in keyof T & keyof AggregateConnection]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateConnection[P]>
			: GetScalarType<T[P], AggregateConnection[P]>
	}

	export type ConnectionGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: ConnectionWhereInput
		orderBy?:
			| ConnectionOrderByWithAggregationInput
			| ConnectionOrderByWithAggregationInput[]
		by: ConnectionScalarFieldEnum[] | ConnectionScalarFieldEnum
		having?: ConnectionScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: ConnectionCountAggregateInputType | true
		_min?: ConnectionMinAggregateInputType
		_max?: ConnectionMaxAggregateInputType
	}

	export type ConnectionGroupByOutputType = {
		id: string
		providerName: string
		providerId: string
		createdAt: Date
		updatedAt: Date
		userId: string
		_count: ConnectionCountAggregateOutputType | null
		_min: ConnectionMinAggregateOutputType | null
		_max: ConnectionMaxAggregateOutputType | null
	}

	type GetConnectionGroupByPayload<T extends ConnectionGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<ConnectionGroupByOutputType, T['by']> & {
					[P in keyof T & keyof ConnectionGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], ConnectionGroupByOutputType[P]>
						: GetScalarType<T[P], ConnectionGroupByOutputType[P]>
				}
			>
		>

	export type ConnectionSelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			providerName?: boolean
			providerId?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['connection']
	>

	export type ConnectionSelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			providerName?: boolean
			providerId?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['connection']
	>

	export type ConnectionSelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			providerName?: boolean
			providerId?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			userId?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['connection']
	>

	export type ConnectionSelectScalar = {
		id?: boolean
		providerName?: boolean
		providerId?: boolean
		createdAt?: boolean
		updatedAt?: boolean
		userId?: boolean
	}

	export type ConnectionOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		'id' | 'providerName' | 'providerId' | 'createdAt' | 'updatedAt' | 'userId',
		ExtArgs['result']['connection']
	>
	export type ConnectionInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type ConnectionIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type ConnectionIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $ConnectionPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Connection'
		objects: {
			user: Prisma.$UserPayload<ExtArgs>
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				providerName: string
				providerId: string
				createdAt: Date
				updatedAt: Date
				userId: string
			},
			ExtArgs['result']['connection']
		>
		composites: {}
	}

	export type ConnectionGetPayload<
		S extends boolean | null | undefined | ConnectionDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$ConnectionPayload, S>

	export type ConnectionCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<
		ConnectionFindManyArgs,
		'select' | 'include' | 'distinct' | 'omit'
	> & {
		select?: ConnectionCountAggregateInputType | true
	}

	export interface ConnectionDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Connection']
			meta: { name: 'Connection' }
		}
		/**
		 * Find zero or one Connection that matches the filter.
		 * @param {ConnectionFindUniqueArgs} args - Arguments to find a Connection
		 * @example
		 * // Get one Connection
		 * const connection = await prisma.connection.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends ConnectionFindUniqueArgs>(
			args: SelectSubset<T, ConnectionFindUniqueArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Connection that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {ConnectionFindUniqueOrThrowArgs} args - Arguments to find a Connection
		 * @example
		 * // Get one Connection
		 * const connection = await prisma.connection.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends ConnectionFindUniqueOrThrowArgs>(
			args: SelectSubset<T, ConnectionFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Connection that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionFindFirstArgs} args - Arguments to find a Connection
		 * @example
		 * // Get one Connection
		 * const connection = await prisma.connection.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends ConnectionFindFirstArgs>(
			args?: SelectSubset<T, ConnectionFindFirstArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Connection that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionFindFirstOrThrowArgs} args - Arguments to find a Connection
		 * @example
		 * // Get one Connection
		 * const connection = await prisma.connection.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends ConnectionFindFirstOrThrowArgs>(
			args?: SelectSubset<T, ConnectionFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Connections that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Connections
		 * const connections = await prisma.connection.findMany()
		 *
		 * // Get first 10 Connections
		 * const connections = await prisma.connection.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const connectionWithIdOnly = await prisma.connection.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends ConnectionFindManyArgs>(
			args?: SelectSubset<T, ConnectionFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Connection.
		 * @param {ConnectionCreateArgs} args - Arguments to create a Connection.
		 * @example
		 * // Create one Connection
		 * const Connection = await prisma.connection.create({
		 *   data: {
		 *     // ... data to create a Connection
		 *   }
		 * })
		 *
		 */
		create<T extends ConnectionCreateArgs>(
			args: SelectSubset<T, ConnectionCreateArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Connections.
		 * @param {ConnectionCreateManyArgs} args - Arguments to create many Connections.
		 * @example
		 * // Create many Connections
		 * const connection = await prisma.connection.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends ConnectionCreateManyArgs>(
			args?: SelectSubset<T, ConnectionCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Connections and returns the data saved in the database.
		 * @param {ConnectionCreateManyAndReturnArgs} args - Arguments to create many Connections.
		 * @example
		 * // Create many Connections
		 * const connection = await prisma.connection.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Connections and only return the `id`
		 * const connectionWithIdOnly = await prisma.connection.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends ConnectionCreateManyAndReturnArgs>(
			args?: SelectSubset<T, ConnectionCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Connection.
		 * @param {ConnectionDeleteArgs} args - Arguments to delete one Connection.
		 * @example
		 * // Delete one Connection
		 * const Connection = await prisma.connection.delete({
		 *   where: {
		 *     // ... filter to delete one Connection
		 *   }
		 * })
		 *
		 */
		delete<T extends ConnectionDeleteArgs>(
			args: SelectSubset<T, ConnectionDeleteArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Connection.
		 * @param {ConnectionUpdateArgs} args - Arguments to update one Connection.
		 * @example
		 * // Update one Connection
		 * const connection = await prisma.connection.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends ConnectionUpdateArgs>(
			args: SelectSubset<T, ConnectionUpdateArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Connections.
		 * @param {ConnectionDeleteManyArgs} args - Arguments to filter Connections to delete.
		 * @example
		 * // Delete a few Connections
		 * const { count } = await prisma.connection.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends ConnectionDeleteManyArgs>(
			args?: SelectSubset<T, ConnectionDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Connections.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Connections
		 * const connection = await prisma.connection.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends ConnectionUpdateManyArgs>(
			args: SelectSubset<T, ConnectionUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Connections and returns the data updated in the database.
		 * @param {ConnectionUpdateManyAndReturnArgs} args - Arguments to update many Connections.
		 * @example
		 * // Update many Connections
		 * const connection = await prisma.connection.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Connections and only return the `id`
		 * const connectionWithIdOnly = await prisma.connection.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends ConnectionUpdateManyAndReturnArgs>(
			args: SelectSubset<T, ConnectionUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Connection.
		 * @param {ConnectionUpsertArgs} args - Arguments to update or create a Connection.
		 * @example
		 * // Update or create a Connection
		 * const connection = await prisma.connection.upsert({
		 *   create: {
		 *     // ... data to create a Connection
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Connection we want to update
		 *   }
		 * })
		 */
		upsert<T extends ConnectionUpsertArgs>(
			args: SelectSubset<T, ConnectionUpsertArgs<ExtArgs>>,
		): Prisma__ConnectionClient<
			runtime.Types.Result.GetResult<
				Prisma.$ConnectionPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Connections.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionCountArgs} args - Arguments to filter Connections to count.
		 * @example
		 * // Count the number of Connections
		 * const count = await prisma.connection.count({
		 *   where: {
		 *     // ... the filter for the Connections we want to count
		 *   }
		 * })
		 **/
		count<T extends ConnectionCountArgs>(
			args?: Subset<T, ConnectionCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], ConnectionCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Connection.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends ConnectionAggregateArgs>(
			args: Subset<T, ConnectionAggregateArgs>,
		): Prisma.PrismaPromise<GetConnectionAggregateType<T>>

		/**
		 * Group by Connection.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {ConnectionGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends ConnectionGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: ConnectionGroupByArgs['orderBy'] }
				: { orderBy?: ConnectionGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, ConnectionGroupByArgs, OrderByArg> &
				InputErrors,
		): {} extends InputErrors
			? GetConnectionGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Connection model
		 */
		readonly fields: ConnectionFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Connection.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__ConnectionClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Connection model
	 */
	export interface ConnectionFieldRefs {
		readonly id: FieldRef<'Connection', 'String'>
		readonly providerName: FieldRef<'Connection', 'String'>
		readonly providerId: FieldRef<'Connection', 'String'>
		readonly createdAt: FieldRef<'Connection', 'DateTime'>
		readonly updatedAt: FieldRef<'Connection', 'DateTime'>
		readonly userId: FieldRef<'Connection', 'String'>
	}

	// Custom InputTypes
	/**
	 * Connection findUnique
	 */
	export type ConnectionFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter, which Connection to fetch.
		 */
		where: ConnectionWhereUniqueInput
	}

	/**
	 * Connection findUniqueOrThrow
	 */
	export type ConnectionFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter, which Connection to fetch.
		 */
		where: ConnectionWhereUniqueInput
	}

	/**
	 * Connection findFirst
	 */
	export type ConnectionFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter, which Connection to fetch.
		 */
		where?: ConnectionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Connections to fetch.
		 */
		orderBy?:
			| ConnectionOrderByWithRelationInput
			| ConnectionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Connections.
		 */
		cursor?: ConnectionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Connections from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Connections.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Connections.
		 */
		distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
	}

	/**
	 * Connection findFirstOrThrow
	 */
	export type ConnectionFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter, which Connection to fetch.
		 */
		where?: ConnectionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Connections to fetch.
		 */
		orderBy?:
			| ConnectionOrderByWithRelationInput
			| ConnectionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Connections.
		 */
		cursor?: ConnectionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Connections from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Connections.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Connections.
		 */
		distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
	}

	/**
	 * Connection findMany
	 */
	export type ConnectionFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter, which Connections to fetch.
		 */
		where?: ConnectionWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Connections to fetch.
		 */
		orderBy?:
			| ConnectionOrderByWithRelationInput
			| ConnectionOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Connections.
		 */
		cursor?: ConnectionWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Connections from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Connections.
		 */
		skip?: number
		distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
	}

	/**
	 * Connection create
	 */
	export type ConnectionCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * The data needed to create a Connection.
		 */
		data: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
	}

	/**
	 * Connection createMany
	 */
	export type ConnectionCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Connections.
		 */
		data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Connection createManyAndReturn
	 */
	export type ConnectionCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * The data used to create many Connections.
		 */
		data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Connection update
	 */
	export type ConnectionUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * The data needed to update a Connection.
		 */
		data: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
		/**
		 * Choose, which Connection to update.
		 */
		where: ConnectionWhereUniqueInput
	}

	/**
	 * Connection updateMany
	 */
	export type ConnectionUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Connections.
		 */
		data: XOR<
			ConnectionUpdateManyMutationInput,
			ConnectionUncheckedUpdateManyInput
		>
		/**
		 * Filter which Connections to update
		 */
		where?: ConnectionWhereInput
		/**
		 * Limit how many Connections to update.
		 */
		limit?: number
	}

	/**
	 * Connection updateManyAndReturn
	 */
	export type ConnectionUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * The data used to update Connections.
		 */
		data: XOR<
			ConnectionUpdateManyMutationInput,
			ConnectionUncheckedUpdateManyInput
		>
		/**
		 * Filter which Connections to update
		 */
		where?: ConnectionWhereInput
		/**
		 * Limit how many Connections to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Connection upsert
	 */
	export type ConnectionUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * The filter to search for the Connection to update in case it exists.
		 */
		where: ConnectionWhereUniqueInput
		/**
		 * In case the Connection found by the `where` argument doesn't exist, create a new Connection with this data.
		 */
		create: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
		/**
		 * In case the Connection was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
	}

	/**
	 * Connection delete
	 */
	export type ConnectionDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
		/**
		 * Filter which Connection to delete.
		 */
		where: ConnectionWhereUniqueInput
	}

	/**
	 * Connection deleteMany
	 */
	export type ConnectionDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Connections to delete
		 */
		where?: ConnectionWhereInput
		/**
		 * Limit how many Connections to delete.
		 */
		limit?: number
	}

	/**
	 * Connection without action
	 */
	export type ConnectionDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Connection
		 */
		select?: ConnectionSelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Connection
		 */
		omit?: ConnectionOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: ConnectionInclude<ExtArgs> | null
	}

	/**
	 * Model Passkey
	 */

	export type AggregatePasskey = {
		_count: PasskeyCountAggregateOutputType | null
		_avg: PasskeyAvgAggregateOutputType | null
		_sum: PasskeySumAggregateOutputType | null
		_min: PasskeyMinAggregateOutputType | null
		_max: PasskeyMaxAggregateOutputType | null
	}

	export type PasskeyAvgAggregateOutputType = {
		counter: number | null
	}

	export type PasskeySumAggregateOutputType = {
		counter: bigint | null
	}

	export type PasskeyMinAggregateOutputType = {
		id: string | null
		aaguid: string | null
		createdAt: Date | null
		updatedAt: Date | null
		publicKey: Uint8Array | null
		userId: string | null
		webauthnUserId: string | null
		counter: bigint | null
		deviceType: string | null
		backedUp: boolean | null
		transports: string | null
	}

	export type PasskeyMaxAggregateOutputType = {
		id: string | null
		aaguid: string | null
		createdAt: Date | null
		updatedAt: Date | null
		publicKey: Uint8Array | null
		userId: string | null
		webauthnUserId: string | null
		counter: bigint | null
		deviceType: string | null
		backedUp: boolean | null
		transports: string | null
	}

	export type PasskeyCountAggregateOutputType = {
		id: number
		aaguid: number
		createdAt: number
		updatedAt: number
		publicKey: number
		userId: number
		webauthnUserId: number
		counter: number
		deviceType: number
		backedUp: number
		transports: number
		_all: number
	}

	export type PasskeyAvgAggregateInputType = {
		counter?: true
	}

	export type PasskeySumAggregateInputType = {
		counter?: true
	}

	export type PasskeyMinAggregateInputType = {
		id?: true
		aaguid?: true
		createdAt?: true
		updatedAt?: true
		publicKey?: true
		userId?: true
		webauthnUserId?: true
		counter?: true
		deviceType?: true
		backedUp?: true
		transports?: true
	}

	export type PasskeyMaxAggregateInputType = {
		id?: true
		aaguid?: true
		createdAt?: true
		updatedAt?: true
		publicKey?: true
		userId?: true
		webauthnUserId?: true
		counter?: true
		deviceType?: true
		backedUp?: true
		transports?: true
	}

	export type PasskeyCountAggregateInputType = {
		id?: true
		aaguid?: true
		createdAt?: true
		updatedAt?: true
		publicKey?: true
		userId?: true
		webauthnUserId?: true
		counter?: true
		deviceType?: true
		backedUp?: true
		transports?: true
		_all?: true
	}

	export type PasskeyAggregateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Passkey to aggregate.
		 */
		where?: PasskeyWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passkeys to fetch.
		 */
		orderBy?:
			| PasskeyOrderByWithRelationInput
			| PasskeyOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: PasskeyWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passkeys from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passkeys.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned Passkeys
		 **/
		_count?: true | PasskeyCountAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: PasskeyAvgAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: PasskeySumAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: PasskeyMinAggregateInputType
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: PasskeyMaxAggregateInputType
	}

	export type GetPasskeyAggregateType<T extends PasskeyAggregateArgs> = {
		[P in keyof T & keyof AggregatePasskey]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregatePasskey[P]>
			: GetScalarType<T[P], AggregatePasskey[P]>
	}

	export type PasskeyGroupByArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		where?: PasskeyWhereInput
		orderBy?:
			| PasskeyOrderByWithAggregationInput
			| PasskeyOrderByWithAggregationInput[]
		by: PasskeyScalarFieldEnum[] | PasskeyScalarFieldEnum
		having?: PasskeyScalarWhereWithAggregatesInput
		take?: number
		skip?: number
		_count?: PasskeyCountAggregateInputType | true
		_avg?: PasskeyAvgAggregateInputType
		_sum?: PasskeySumAggregateInputType
		_min?: PasskeyMinAggregateInputType
		_max?: PasskeyMaxAggregateInputType
	}

	export type PasskeyGroupByOutputType = {
		id: string
		aaguid: string
		createdAt: Date
		updatedAt: Date
		publicKey: Uint8Array
		userId: string
		webauthnUserId: string
		counter: bigint
		deviceType: string
		backedUp: boolean
		transports: string | null
		_count: PasskeyCountAggregateOutputType | null
		_avg: PasskeyAvgAggregateOutputType | null
		_sum: PasskeySumAggregateOutputType | null
		_min: PasskeyMinAggregateOutputType | null
		_max: PasskeyMaxAggregateOutputType | null
	}

	type GetPasskeyGroupByPayload<T extends PasskeyGroupByArgs> =
		Prisma.PrismaPromise<
			Array<
				PickEnumerable<PasskeyGroupByOutputType, T['by']> & {
					[P in keyof T & keyof PasskeyGroupByOutputType]: P extends '_count'
						? T[P] extends boolean
							? number
							: GetScalarType<T[P], PasskeyGroupByOutputType[P]>
						: GetScalarType<T[P], PasskeyGroupByOutputType[P]>
				}
			>
		>

	export type PasskeySelect<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			aaguid?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			publicKey?: boolean
			userId?: boolean
			webauthnUserId?: boolean
			counter?: boolean
			deviceType?: boolean
			backedUp?: boolean
			transports?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['passkey']
	>

	export type PasskeySelectCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			aaguid?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			publicKey?: boolean
			userId?: boolean
			webauthnUserId?: boolean
			counter?: boolean
			deviceType?: boolean
			backedUp?: boolean
			transports?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['passkey']
	>

	export type PasskeySelectUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetSelect<
		{
			id?: boolean
			aaguid?: boolean
			createdAt?: boolean
			updatedAt?: boolean
			publicKey?: boolean
			userId?: boolean
			webauthnUserId?: boolean
			counter?: boolean
			deviceType?: boolean
			backedUp?: boolean
			transports?: boolean
			user?: boolean | UserDefaultArgs<ExtArgs>
		},
		ExtArgs['result']['passkey']
	>

	export type PasskeySelectScalar = {
		id?: boolean
		aaguid?: boolean
		createdAt?: boolean
		updatedAt?: boolean
		publicKey?: boolean
		userId?: boolean
		webauthnUserId?: boolean
		counter?: boolean
		deviceType?: boolean
		backedUp?: boolean
		transports?: boolean
	}

	export type PasskeyOmit<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = runtime.Types.Extensions.GetOmit<
		| 'id'
		| 'aaguid'
		| 'createdAt'
		| 'updatedAt'
		| 'publicKey'
		| 'userId'
		| 'webauthnUserId'
		| 'counter'
		| 'deviceType'
		| 'backedUp'
		| 'transports',
		ExtArgs['result']['passkey']
	>
	export type PasskeyInclude<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type PasskeyIncludeCreateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}
	export type PasskeyIncludeUpdateManyAndReturn<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		user?: boolean | UserDefaultArgs<ExtArgs>
	}

	export type $PasskeyPayload<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		name: 'Passkey'
		objects: {
			user: Prisma.$UserPayload<ExtArgs>
		}
		scalars: runtime.Types.Extensions.GetPayloadResult<
			{
				id: string
				aaguid: string
				createdAt: Date
				updatedAt: Date
				publicKey: Uint8Array
				userId: string
				webauthnUserId: string
				counter: bigint
				deviceType: string
				backedUp: boolean
				transports: string | null
			},
			ExtArgs['result']['passkey']
		>
		composites: {}
	}

	export type PasskeyGetPayload<
		S extends boolean | null | undefined | PasskeyDefaultArgs,
	> = runtime.Types.Result.GetResult<Prisma.$PasskeyPayload, S>

	export type PasskeyCountArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = Omit<PasskeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: PasskeyCountAggregateInputType | true
	}

	export interface PasskeyDelegate<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['Passkey']
			meta: { name: 'Passkey' }
		}
		/**
		 * Find zero or one Passkey that matches the filter.
		 * @param {PasskeyFindUniqueArgs} args - Arguments to find a Passkey
		 * @example
		 * // Get one Passkey
		 * const passkey = await prisma.passkey.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends PasskeyFindUniqueArgs>(
			args: SelectSubset<T, PasskeyFindUniqueArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find one Passkey that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {PasskeyFindUniqueOrThrowArgs} args - Arguments to find a Passkey
		 * @example
		 * // Get one Passkey
		 * const passkey = await prisma.passkey.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends PasskeyFindUniqueOrThrowArgs>(
			args: SelectSubset<T, PasskeyFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Passkey that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyFindFirstArgs} args - Arguments to find a Passkey
		 * @example
		 * // Get one Passkey
		 * const passkey = await prisma.passkey.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends PasskeyFindFirstArgs>(
			args?: SelectSubset<T, PasskeyFindFirstArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find the first Passkey that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyFindFirstOrThrowArgs} args - Arguments to find a Passkey
		 * @example
		 * // Get one Passkey
		 * const passkey = await prisma.passkey.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends PasskeyFindFirstOrThrowArgs>(
			args?: SelectSubset<T, PasskeyFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Find zero or more Passkeys that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Passkeys
		 * const passkeys = await prisma.passkey.findMany()
		 *
		 * // Get first 10 Passkeys
		 * const passkeys = await prisma.passkey.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const passkeyWithIdOnly = await prisma.passkey.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends PasskeyFindManyArgs>(
			args?: SelectSubset<T, PasskeyFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>

		/**
		 * Create a Passkey.
		 * @param {PasskeyCreateArgs} args - Arguments to create a Passkey.
		 * @example
		 * // Create one Passkey
		 * const Passkey = await prisma.passkey.create({
		 *   data: {
		 *     // ... data to create a Passkey
		 *   }
		 * })
		 *
		 */
		create<T extends PasskeyCreateArgs>(
			args: SelectSubset<T, PasskeyCreateArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Create many Passkeys.
		 * @param {PasskeyCreateManyArgs} args - Arguments to create many Passkeys.
		 * @example
		 * // Create many Passkeys
		 * const passkey = await prisma.passkey.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends PasskeyCreateManyArgs>(
			args?: SelectSubset<T, PasskeyCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Create many Passkeys and returns the data saved in the database.
		 * @param {PasskeyCreateManyAndReturnArgs} args - Arguments to create many Passkeys.
		 * @example
		 * // Create many Passkeys
		 * const passkey = await prisma.passkey.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Passkeys and only return the `id`
		 * const passkeyWithIdOnly = await prisma.passkey.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends PasskeyCreateManyAndReturnArgs>(
			args?: SelectSubset<T, PasskeyCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Delete a Passkey.
		 * @param {PasskeyDeleteArgs} args - Arguments to delete one Passkey.
		 * @example
		 * // Delete one Passkey
		 * const Passkey = await prisma.passkey.delete({
		 *   where: {
		 *     // ... filter to delete one Passkey
		 *   }
		 * })
		 *
		 */
		delete<T extends PasskeyDeleteArgs>(
			args: SelectSubset<T, PasskeyDeleteArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Update one Passkey.
		 * @param {PasskeyUpdateArgs} args - Arguments to update one Passkey.
		 * @example
		 * // Update one Passkey
		 * const passkey = await prisma.passkey.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends PasskeyUpdateArgs>(
			args: SelectSubset<T, PasskeyUpdateArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Delete zero or more Passkeys.
		 * @param {PasskeyDeleteManyArgs} args - Arguments to filter Passkeys to delete.
		 * @example
		 * // Delete a few Passkeys
		 * const { count } = await prisma.passkey.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends PasskeyDeleteManyArgs>(
			args?: SelectSubset<T, PasskeyDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Passkeys.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Passkeys
		 * const passkey = await prisma.passkey.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends PasskeyUpdateManyArgs>(
			args: SelectSubset<T, PasskeyUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>

		/**
		 * Update zero or more Passkeys and returns the data updated in the database.
		 * @param {PasskeyUpdateManyAndReturnArgs} args - Arguments to update many Passkeys.
		 * @example
		 * // Update many Passkeys
		 * const passkey = await prisma.passkey.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Passkeys and only return the `id`
		 * const passkeyWithIdOnly = await prisma.passkey.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends PasskeyUpdateManyAndReturnArgs>(
			args: SelectSubset<T, PasskeyUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>

		/**
		 * Create or update one Passkey.
		 * @param {PasskeyUpsertArgs} args - Arguments to update or create a Passkey.
		 * @example
		 * // Update or create a Passkey
		 * const passkey = await prisma.passkey.upsert({
		 *   create: {
		 *     // ... data to create a Passkey
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Passkey we want to update
		 *   }
		 * })
		 */
		upsert<T extends PasskeyUpsertArgs>(
			args: SelectSubset<T, PasskeyUpsertArgs<ExtArgs>>,
		): Prisma__PasskeyClient<
			runtime.Types.Result.GetResult<
				Prisma.$PasskeyPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>

		/**
		 * Count the number of Passkeys.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyCountArgs} args - Arguments to filter Passkeys to count.
		 * @example
		 * // Count the number of Passkeys
		 * const count = await prisma.passkey.count({
		 *   where: {
		 *     // ... the filter for the Passkeys we want to count
		 *   }
		 * })
		 **/
		count<T extends PasskeyCountArgs>(
			args?: Subset<T, PasskeyCountArgs>,
		): Prisma.PrismaPromise<
			T extends runtime.Types.Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], PasskeyCountAggregateOutputType>
				: number
		>

		/**
		 * Allows you to perform aggregations operations on a Passkey.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends PasskeyAggregateArgs>(
			args: Subset<T, PasskeyAggregateArgs>,
		): Prisma.PrismaPromise<GetPasskeyAggregateType<T>>

		/**
		 * Group by Passkey.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {PasskeyGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends PasskeyGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: PasskeyGroupByArgs['orderBy'] }
				: { orderBy?: PasskeyGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										]
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
									}[OrderFields],
		>(
			args: SubsetIntersection<T, PasskeyGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetPasskeyGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>
		/**
		 * Fields of the Passkey model
		 */
		readonly fields: PasskeyFieldRefs
	}

	/**
	 * The delegate class that acts as a "Promise-like" for Passkey.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__PasskeyClient<
		T,
		Null = never,
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise'
		user<T extends UserDefaultArgs<ExtArgs> = {}>(
			args?: Subset<T, UserDefaultArgs<ExtArgs>>,
		): Prisma__UserClient<
			| runtime.Types.Result.GetResult<
					Prisma.$UserPayload<ExtArgs>,
					T,
					'findUniqueOrThrow',
					GlobalOmitOptions
			  >
			| Null,
			Null,
			ExtArgs,
			GlobalOmitOptions
		>
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): runtime.Types.Utils.JsPromise<T | TResult>
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(
			onfinally?: (() => void) | undefined | null,
		): runtime.Types.Utils.JsPromise<T>
	}

	/**
	 * Fields of the Passkey model
	 */
	export interface PasskeyFieldRefs {
		readonly id: FieldRef<'Passkey', 'String'>
		readonly aaguid: FieldRef<'Passkey', 'String'>
		readonly createdAt: FieldRef<'Passkey', 'DateTime'>
		readonly updatedAt: FieldRef<'Passkey', 'DateTime'>
		readonly publicKey: FieldRef<'Passkey', 'Bytes'>
		readonly userId: FieldRef<'Passkey', 'String'>
		readonly webauthnUserId: FieldRef<'Passkey', 'String'>
		readonly counter: FieldRef<'Passkey', 'BigInt'>
		readonly deviceType: FieldRef<'Passkey', 'String'>
		readonly backedUp: FieldRef<'Passkey', 'Boolean'>
		readonly transports: FieldRef<'Passkey', 'String'>
	}

	// Custom InputTypes
	/**
	 * Passkey findUnique
	 */
	export type PasskeyFindUniqueArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter, which Passkey to fetch.
		 */
		where: PasskeyWhereUniqueInput
	}

	/**
	 * Passkey findUniqueOrThrow
	 */
	export type PasskeyFindUniqueOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter, which Passkey to fetch.
		 */
		where: PasskeyWhereUniqueInput
	}

	/**
	 * Passkey findFirst
	 */
	export type PasskeyFindFirstArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter, which Passkey to fetch.
		 */
		where?: PasskeyWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passkeys to fetch.
		 */
		orderBy?:
			| PasskeyOrderByWithRelationInput
			| PasskeyOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Passkeys.
		 */
		cursor?: PasskeyWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passkeys from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passkeys.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Passkeys.
		 */
		distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
	}

	/**
	 * Passkey findFirstOrThrow
	 */
	export type PasskeyFindFirstOrThrowArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter, which Passkey to fetch.
		 */
		where?: PasskeyWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passkeys to fetch.
		 */
		orderBy?:
			| PasskeyOrderByWithRelationInput
			| PasskeyOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for Passkeys.
		 */
		cursor?: PasskeyWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passkeys from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passkeys.
		 */
		skip?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of Passkeys.
		 */
		distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
	}

	/**
	 * Passkey findMany
	 */
	export type PasskeyFindManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter, which Passkeys to fetch.
		 */
		where?: PasskeyWhereInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of Passkeys to fetch.
		 */
		orderBy?:
			| PasskeyOrderByWithRelationInput
			| PasskeyOrderByWithRelationInput[]
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing Passkeys.
		 */
		cursor?: PasskeyWhereUniqueInput
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` Passkeys from the position of the cursor.
		 */
		take?: number
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` Passkeys.
		 */
		skip?: number
		distinct?: PasskeyScalarFieldEnum | PasskeyScalarFieldEnum[]
	}

	/**
	 * Passkey create
	 */
	export type PasskeyCreateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * The data needed to create a Passkey.
		 */
		data: XOR<PasskeyCreateInput, PasskeyUncheckedCreateInput>
	}

	/**
	 * Passkey createMany
	 */
	export type PasskeyCreateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many Passkeys.
		 */
		data: PasskeyCreateManyInput | PasskeyCreateManyInput[]
		skipDuplicates?: boolean
	}

	/**
	 * Passkey createManyAndReturn
	 */
	export type PasskeyCreateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelectCreateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * The data used to create many Passkeys.
		 */
		data: PasskeyCreateManyInput | PasskeyCreateManyInput[]
		skipDuplicates?: boolean
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyIncludeCreateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Passkey update
	 */
	export type PasskeyUpdateArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * The data needed to update a Passkey.
		 */
		data: XOR<PasskeyUpdateInput, PasskeyUncheckedUpdateInput>
		/**
		 * Choose, which Passkey to update.
		 */
		where: PasskeyWhereUniqueInput
	}

	/**
	 * Passkey updateMany
	 */
	export type PasskeyUpdateManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update Passkeys.
		 */
		data: XOR<PasskeyUpdateManyMutationInput, PasskeyUncheckedUpdateManyInput>
		/**
		 * Filter which Passkeys to update
		 */
		where?: PasskeyWhereInput
		/**
		 * Limit how many Passkeys to update.
		 */
		limit?: number
	}

	/**
	 * Passkey updateManyAndReturn
	 */
	export type PasskeyUpdateManyAndReturnArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelectUpdateManyAndReturn<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * The data used to update Passkeys.
		 */
		data: XOR<PasskeyUpdateManyMutationInput, PasskeyUncheckedUpdateManyInput>
		/**
		 * Filter which Passkeys to update
		 */
		where?: PasskeyWhereInput
		/**
		 * Limit how many Passkeys to update.
		 */
		limit?: number
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyIncludeUpdateManyAndReturn<ExtArgs> | null
	}

	/**
	 * Passkey upsert
	 */
	export type PasskeyUpsertArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * The filter to search for the Passkey to update in case it exists.
		 */
		where: PasskeyWhereUniqueInput
		/**
		 * In case the Passkey found by the `where` argument doesn't exist, create a new Passkey with this data.
		 */
		create: XOR<PasskeyCreateInput, PasskeyUncheckedCreateInput>
		/**
		 * In case the Passkey was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<PasskeyUpdateInput, PasskeyUncheckedUpdateInput>
	}

	/**
	 * Passkey delete
	 */
	export type PasskeyDeleteArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
		/**
		 * Filter which Passkey to delete.
		 */
		where: PasskeyWhereUniqueInput
	}

	/**
	 * Passkey deleteMany
	 */
	export type PasskeyDeleteManyArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which Passkeys to delete
		 */
		where?: PasskeyWhereInput
		/**
		 * Limit how many Passkeys to delete.
		 */
		limit?: number
	}

	/**
	 * Passkey without action
	 */
	export type PasskeyDefaultArgs<
		ExtArgs extends
			runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the Passkey
		 */
		select?: PasskeySelect<ExtArgs> | null
		/**
		 * Omit specific fields from the Passkey
		 */
		omit?: PasskeyOmit<ExtArgs> | null
		/**
		 * Choose, which related nodes to fetch as well
		 */
		include?: PasskeyInclude<ExtArgs> | null
	}

	/**
	 * Enums
	 */

	export const TransactionIsolationLevel = runtime.makeStrictEnum({
		ReadUncommitted: 'ReadUncommitted',
		ReadCommitted: 'ReadCommitted',
		RepeatableRead: 'RepeatableRead',
		Serializable: 'Serializable',
	} as const)

	export type TransactionIsolationLevel =
		(typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]

	export const UserScalarFieldEnum = {
		id: 'id',
		email: 'email',
		username: 'username',
		name: 'name',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	} as const

	export type UserScalarFieldEnum =
		(typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]

	export const UserImageScalarFieldEnum = {
		id: 'id',
		altText: 'altText',
		objectKey: 'objectKey',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		userId: 'userId',
	} as const

	export type UserImageScalarFieldEnum =
		(typeof UserImageScalarFieldEnum)[keyof typeof UserImageScalarFieldEnum]

	export const PasswordScalarFieldEnum = {
		hash: 'hash',
		userId: 'userId',
		requiredReset: 'requiredReset',
	} as const

	export type PasswordScalarFieldEnum =
		(typeof PasswordScalarFieldEnum)[keyof typeof PasswordScalarFieldEnum]

	export const SessionScalarFieldEnum = {
		id: 'id',
		expirationDate: 'expirationDate',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		userId: 'userId',
	} as const

	export type SessionScalarFieldEnum =
		(typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]

	export const PermissionScalarFieldEnum = {
		id: 'id',
		action: 'action',
		entity: 'entity',
		access: 'access',
		description: 'description',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	} as const

	export type PermissionScalarFieldEnum =
		(typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]

	export const RoleScalarFieldEnum = {
		id: 'id',
		name: 'name',
		description: 'description',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	} as const

	export type RoleScalarFieldEnum =
		(typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]

	export const VerificationScalarFieldEnum = {
		id: 'id',
		createdAt: 'createdAt',
		type: 'type',
		target: 'target',
		secret: 'secret',
		algorithm: 'algorithm',
		digits: 'digits',
		period: 'period',
		charSet: 'charSet',
		expiresAt: 'expiresAt',
	} as const

	export type VerificationScalarFieldEnum =
		(typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]

	export const ConnectionScalarFieldEnum = {
		id: 'id',
		providerName: 'providerName',
		providerId: 'providerId',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		userId: 'userId',
	} as const

	export type ConnectionScalarFieldEnum =
		(typeof ConnectionScalarFieldEnum)[keyof typeof ConnectionScalarFieldEnum]

	export const PasskeyScalarFieldEnum = {
		id: 'id',
		aaguid: 'aaguid',
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
		publicKey: 'publicKey',
		userId: 'userId',
		webauthnUserId: 'webauthnUserId',
		counter: 'counter',
		deviceType: 'deviceType',
		backedUp: 'backedUp',
		transports: 'transports',
	} as const

	export type PasskeyScalarFieldEnum =
		(typeof PasskeyScalarFieldEnum)[keyof typeof PasskeyScalarFieldEnum]

	export const SortOrder = {
		asc: 'asc',
		desc: 'desc',
	} as const

	export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

	export const QueryMode = {
		default: 'default',
		insensitive: 'insensitive',
	} as const

	export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]

	export const NullsOrder = {
		first: 'first',
		last: 'last',
	} as const

	export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]

	/**
	 * Field references
	 */

	/**
	 * Reference to a field of type 'String'
	 */
	export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String'
	>

	/**
	 * Reference to a field of type 'String[]'
	 */
	export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String[]'
	>

	/**
	 * Reference to a field of type 'DateTime'
	 */
	export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime'
	>

	/**
	 * Reference to a field of type 'DateTime[]'
	 */
	export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime[]'
	>

	/**
	 * Reference to a field of type 'Boolean'
	 */
	export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Boolean'
	>

	/**
	 * Reference to a field of type 'Int'
	 */
	export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int'
	>

	/**
	 * Reference to a field of type 'Int[]'
	 */
	export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int[]'
	>

	/**
	 * Reference to a field of type 'Bytes'
	 */
	export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Bytes'
	>

	/**
	 * Reference to a field of type 'Bytes[]'
	 */
	export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Bytes[]'
	>

	/**
	 * Reference to a field of type 'BigInt'
	 */
	export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'BigInt'
	>

	/**
	 * Reference to a field of type 'BigInt[]'
	 */
	export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'BigInt[]'
	>

	/**
	 * Reference to a field of type 'Float'
	 */
	export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Float'
	>

	/**
	 * Reference to a field of type 'Float[]'
	 */
	export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Float[]'
	>

	/**
	 * Deep Input Types
	 */

	export type UserWhereInput = {
		AND?: UserWhereInput | UserWhereInput[]
		OR?: UserWhereInput[]
		NOT?: UserWhereInput | UserWhereInput[]
		id?: StringFilter<'User'> | string
		email?: StringFilter<'User'> | string
		username?: StringFilter<'User'> | string
		name?: StringNullableFilter<'User'> | string | null
		createdAt?: DateTimeFilter<'User'> | Date | string
		updatedAt?: DateTimeFilter<'User'> | Date | string
		connections?: ConnectionListRelationFilter
		passkey?: PasskeyListRelationFilter
		password?: XOR<
			PasswordNullableScalarRelationFilter,
			PasswordWhereInput
		> | null
		sessions?: SessionListRelationFilter
		image?: XOR<
			UserImageNullableScalarRelationFilter,
			UserImageWhereInput
		> | null
		roles?: RoleListRelationFilter
	}

	export type UserOrderByWithRelationInput = {
		id?: SortOrder
		email?: SortOrder
		username?: SortOrder
		name?: SortOrderInput | SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		connections?: ConnectionOrderByRelationAggregateInput
		passkey?: PasskeyOrderByRelationAggregateInput
		password?: PasswordOrderByWithRelationInput
		sessions?: SessionOrderByRelationAggregateInput
		image?: UserImageOrderByWithRelationInput
		roles?: RoleOrderByRelationAggregateInput
	}

	export type UserWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			email?: string
			username?: string
			AND?: UserWhereInput | UserWhereInput[]
			OR?: UserWhereInput[]
			NOT?: UserWhereInput | UserWhereInput[]
			name?: StringNullableFilter<'User'> | string | null
			createdAt?: DateTimeFilter<'User'> | Date | string
			updatedAt?: DateTimeFilter<'User'> | Date | string
			connections?: ConnectionListRelationFilter
			passkey?: PasskeyListRelationFilter
			password?: XOR<
				PasswordNullableScalarRelationFilter,
				PasswordWhereInput
			> | null
			sessions?: SessionListRelationFilter
			image?: XOR<
				UserImageNullableScalarRelationFilter,
				UserImageWhereInput
			> | null
			roles?: RoleListRelationFilter
		},
		'id' | 'email' | 'username'
	>

	export type UserOrderByWithAggregationInput = {
		id?: SortOrder
		email?: SortOrder
		username?: SortOrder
		name?: SortOrderInput | SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		_count?: UserCountOrderByAggregateInput
		_max?: UserMaxOrderByAggregateInput
		_min?: UserMinOrderByAggregateInput
	}

	export type UserScalarWhereWithAggregatesInput = {
		AND?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[]
		OR?: UserScalarWhereWithAggregatesInput[]
		NOT?:
			| UserScalarWhereWithAggregatesInput
			| UserScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'User'> | string
		email?: StringWithAggregatesFilter<'User'> | string
		username?: StringWithAggregatesFilter<'User'> | string
		name?: StringNullableWithAggregatesFilter<'User'> | string | null
		createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string
	}

	export type UserImageWhereInput = {
		AND?: UserImageWhereInput | UserImageWhereInput[]
		OR?: UserImageWhereInput[]
		NOT?: UserImageWhereInput | UserImageWhereInput[]
		id?: StringFilter<'UserImage'> | string
		altText?: StringNullableFilter<'UserImage'> | string | null
		objectKey?: StringFilter<'UserImage'> | string
		createdAt?: DateTimeFilter<'UserImage'> | Date | string
		updatedAt?: DateTimeFilter<'UserImage'> | Date | string
		userId?: StringFilter<'UserImage'> | string
		user?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type UserImageOrderByWithRelationInput = {
		id?: SortOrder
		altText?: SortOrderInput | SortOrder
		objectKey?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		user?: UserOrderByWithRelationInput
	}

	export type UserImageWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			userId?: string
			AND?: UserImageWhereInput | UserImageWhereInput[]
			OR?: UserImageWhereInput[]
			NOT?: UserImageWhereInput | UserImageWhereInput[]
			altText?: StringNullableFilter<'UserImage'> | string | null
			objectKey?: StringFilter<'UserImage'> | string
			createdAt?: DateTimeFilter<'UserImage'> | Date | string
			updatedAt?: DateTimeFilter<'UserImage'> | Date | string
			user?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id' | 'userId'
	>

	export type UserImageOrderByWithAggregationInput = {
		id?: SortOrder
		altText?: SortOrderInput | SortOrder
		objectKey?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		_count?: UserImageCountOrderByAggregateInput
		_max?: UserImageMaxOrderByAggregateInput
		_min?: UserImageMinOrderByAggregateInput
	}

	export type UserImageScalarWhereWithAggregatesInput = {
		AND?:
			| UserImageScalarWhereWithAggregatesInput
			| UserImageScalarWhereWithAggregatesInput[]
		OR?: UserImageScalarWhereWithAggregatesInput[]
		NOT?:
			| UserImageScalarWhereWithAggregatesInput
			| UserImageScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'UserImage'> | string
		altText?: StringNullableWithAggregatesFilter<'UserImage'> | string | null
		objectKey?: StringWithAggregatesFilter<'UserImage'> | string
		createdAt?: DateTimeWithAggregatesFilter<'UserImage'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'UserImage'> | Date | string
		userId?: StringWithAggregatesFilter<'UserImage'> | string
	}

	export type PasswordWhereInput = {
		AND?: PasswordWhereInput | PasswordWhereInput[]
		OR?: PasswordWhereInput[]
		NOT?: PasswordWhereInput | PasswordWhereInput[]
		hash?: StringFilter<'Password'> | string
		userId?: StringFilter<'Password'> | string
		requiredReset?: BoolFilter<'Password'> | boolean
		user?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type PasswordOrderByWithRelationInput = {
		hash?: SortOrder
		userId?: SortOrder
		requiredReset?: SortOrder
		user?: UserOrderByWithRelationInput
	}

	export type PasswordWhereUniqueInput = Prisma.AtLeast<
		{
			userId?: string
			AND?: PasswordWhereInput | PasswordWhereInput[]
			OR?: PasswordWhereInput[]
			NOT?: PasswordWhereInput | PasswordWhereInput[]
			hash?: StringFilter<'Password'> | string
			requiredReset?: BoolFilter<'Password'> | boolean
			user?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'userId'
	>

	export type PasswordOrderByWithAggregationInput = {
		hash?: SortOrder
		userId?: SortOrder
		requiredReset?: SortOrder
		_count?: PasswordCountOrderByAggregateInput
		_max?: PasswordMaxOrderByAggregateInput
		_min?: PasswordMinOrderByAggregateInput
	}

	export type PasswordScalarWhereWithAggregatesInput = {
		AND?:
			| PasswordScalarWhereWithAggregatesInput
			| PasswordScalarWhereWithAggregatesInput[]
		OR?: PasswordScalarWhereWithAggregatesInput[]
		NOT?:
			| PasswordScalarWhereWithAggregatesInput
			| PasswordScalarWhereWithAggregatesInput[]
		hash?: StringWithAggregatesFilter<'Password'> | string
		userId?: StringWithAggregatesFilter<'Password'> | string
		requiredReset?: BoolWithAggregatesFilter<'Password'> | boolean
	}

	export type SessionWhereInput = {
		AND?: SessionWhereInput | SessionWhereInput[]
		OR?: SessionWhereInput[]
		NOT?: SessionWhereInput | SessionWhereInput[]
		id?: StringFilter<'Session'> | string
		expirationDate?: DateTimeFilter<'Session'> | Date | string
		createdAt?: DateTimeFilter<'Session'> | Date | string
		updatedAt?: DateTimeFilter<'Session'> | Date | string
		userId?: StringFilter<'Session'> | string
		user?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type SessionOrderByWithRelationInput = {
		id?: SortOrder
		expirationDate?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		user?: UserOrderByWithRelationInput
	}

	export type SessionWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			AND?: SessionWhereInput | SessionWhereInput[]
			OR?: SessionWhereInput[]
			NOT?: SessionWhereInput | SessionWhereInput[]
			expirationDate?: DateTimeFilter<'Session'> | Date | string
			createdAt?: DateTimeFilter<'Session'> | Date | string
			updatedAt?: DateTimeFilter<'Session'> | Date | string
			userId?: StringFilter<'Session'> | string
			user?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id'
	>

	export type SessionOrderByWithAggregationInput = {
		id?: SortOrder
		expirationDate?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		_count?: SessionCountOrderByAggregateInput
		_max?: SessionMaxOrderByAggregateInput
		_min?: SessionMinOrderByAggregateInput
	}

	export type SessionScalarWhereWithAggregatesInput = {
		AND?:
			| SessionScalarWhereWithAggregatesInput
			| SessionScalarWhereWithAggregatesInput[]
		OR?: SessionScalarWhereWithAggregatesInput[]
		NOT?:
			| SessionScalarWhereWithAggregatesInput
			| SessionScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Session'> | string
		expirationDate?: DateTimeWithAggregatesFilter<'Session'> | Date | string
		createdAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string
		userId?: StringWithAggregatesFilter<'Session'> | string
	}

	export type PermissionWhereInput = {
		AND?: PermissionWhereInput | PermissionWhereInput[]
		OR?: PermissionWhereInput[]
		NOT?: PermissionWhereInput | PermissionWhereInput[]
		id?: StringFilter<'Permission'> | string
		action?: StringFilter<'Permission'> | string
		entity?: StringFilter<'Permission'> | string
		access?: StringFilter<'Permission'> | string
		description?: StringFilter<'Permission'> | string
		createdAt?: DateTimeFilter<'Permission'> | Date | string
		updatedAt?: DateTimeFilter<'Permission'> | Date | string
		roles?: RoleListRelationFilter
	}

	export type PermissionOrderByWithRelationInput = {
		id?: SortOrder
		action?: SortOrder
		entity?: SortOrder
		access?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		roles?: RoleOrderByRelationAggregateInput
	}

	export type PermissionWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			action_entity_access?: PermissionActionEntityAccessCompoundUniqueInput
			AND?: PermissionWhereInput | PermissionWhereInput[]
			OR?: PermissionWhereInput[]
			NOT?: PermissionWhereInput | PermissionWhereInput[]
			action?: StringFilter<'Permission'> | string
			entity?: StringFilter<'Permission'> | string
			access?: StringFilter<'Permission'> | string
			description?: StringFilter<'Permission'> | string
			createdAt?: DateTimeFilter<'Permission'> | Date | string
			updatedAt?: DateTimeFilter<'Permission'> | Date | string
			roles?: RoleListRelationFilter
		},
		'id' | 'action_entity_access'
	>

	export type PermissionOrderByWithAggregationInput = {
		id?: SortOrder
		action?: SortOrder
		entity?: SortOrder
		access?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		_count?: PermissionCountOrderByAggregateInput
		_max?: PermissionMaxOrderByAggregateInput
		_min?: PermissionMinOrderByAggregateInput
	}

	export type PermissionScalarWhereWithAggregatesInput = {
		AND?:
			| PermissionScalarWhereWithAggregatesInput
			| PermissionScalarWhereWithAggregatesInput[]
		OR?: PermissionScalarWhereWithAggregatesInput[]
		NOT?:
			| PermissionScalarWhereWithAggregatesInput
			| PermissionScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Permission'> | string
		action?: StringWithAggregatesFilter<'Permission'> | string
		entity?: StringWithAggregatesFilter<'Permission'> | string
		access?: StringWithAggregatesFilter<'Permission'> | string
		description?: StringWithAggregatesFilter<'Permission'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Permission'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'Permission'> | Date | string
	}

	export type RoleWhereInput = {
		AND?: RoleWhereInput | RoleWhereInput[]
		OR?: RoleWhereInput[]
		NOT?: RoleWhereInput | RoleWhereInput[]
		id?: StringFilter<'Role'> | string
		name?: StringFilter<'Role'> | string
		description?: StringFilter<'Role'> | string
		createdAt?: DateTimeFilter<'Role'> | Date | string
		updatedAt?: DateTimeFilter<'Role'> | Date | string
		permissions?: PermissionListRelationFilter
		users?: UserListRelationFilter
	}

	export type RoleOrderByWithRelationInput = {
		id?: SortOrder
		name?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		permissions?: PermissionOrderByRelationAggregateInput
		users?: UserOrderByRelationAggregateInput
	}

	export type RoleWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			name?: string
			AND?: RoleWhereInput | RoleWhereInput[]
			OR?: RoleWhereInput[]
			NOT?: RoleWhereInput | RoleWhereInput[]
			description?: StringFilter<'Role'> | string
			createdAt?: DateTimeFilter<'Role'> | Date | string
			updatedAt?: DateTimeFilter<'Role'> | Date | string
			permissions?: PermissionListRelationFilter
			users?: UserListRelationFilter
		},
		'id' | 'name'
	>

	export type RoleOrderByWithAggregationInput = {
		id?: SortOrder
		name?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		_count?: RoleCountOrderByAggregateInput
		_max?: RoleMaxOrderByAggregateInput
		_min?: RoleMinOrderByAggregateInput
	}

	export type RoleScalarWhereWithAggregatesInput = {
		AND?:
			| RoleScalarWhereWithAggregatesInput
			| RoleScalarWhereWithAggregatesInput[]
		OR?: RoleScalarWhereWithAggregatesInput[]
		NOT?:
			| RoleScalarWhereWithAggregatesInput
			| RoleScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Role'> | string
		name?: StringWithAggregatesFilter<'Role'> | string
		description?: StringWithAggregatesFilter<'Role'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Role'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'Role'> | Date | string
	}

	export type VerificationWhereInput = {
		AND?: VerificationWhereInput | VerificationWhereInput[]
		OR?: VerificationWhereInput[]
		NOT?: VerificationWhereInput | VerificationWhereInput[]
		id?: StringFilter<'Verification'> | string
		createdAt?: DateTimeFilter<'Verification'> | Date | string
		type?: StringFilter<'Verification'> | string
		target?: StringFilter<'Verification'> | string
		secret?: StringFilter<'Verification'> | string
		algorithm?: StringFilter<'Verification'> | string
		digits?: IntFilter<'Verification'> | number
		period?: IntFilter<'Verification'> | number
		charSet?: StringFilter<'Verification'> | string
		expiresAt?: DateTimeNullableFilter<'Verification'> | Date | string | null
	}

	export type VerificationOrderByWithRelationInput = {
		id?: SortOrder
		createdAt?: SortOrder
		type?: SortOrder
		target?: SortOrder
		secret?: SortOrder
		algorithm?: SortOrder
		digits?: SortOrder
		period?: SortOrder
		charSet?: SortOrder
		expiresAt?: SortOrderInput | SortOrder
	}

	export type VerificationWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			target_type?: VerificationTargetTypeCompoundUniqueInput
			AND?: VerificationWhereInput | VerificationWhereInput[]
			OR?: VerificationWhereInput[]
			NOT?: VerificationWhereInput | VerificationWhereInput[]
			createdAt?: DateTimeFilter<'Verification'> | Date | string
			type?: StringFilter<'Verification'> | string
			target?: StringFilter<'Verification'> | string
			secret?: StringFilter<'Verification'> | string
			algorithm?: StringFilter<'Verification'> | string
			digits?: IntFilter<'Verification'> | number
			period?: IntFilter<'Verification'> | number
			charSet?: StringFilter<'Verification'> | string
			expiresAt?: DateTimeNullableFilter<'Verification'> | Date | string | null
		},
		'id' | 'target_type'
	>

	export type VerificationOrderByWithAggregationInput = {
		id?: SortOrder
		createdAt?: SortOrder
		type?: SortOrder
		target?: SortOrder
		secret?: SortOrder
		algorithm?: SortOrder
		digits?: SortOrder
		period?: SortOrder
		charSet?: SortOrder
		expiresAt?: SortOrderInput | SortOrder
		_count?: VerificationCountOrderByAggregateInput
		_avg?: VerificationAvgOrderByAggregateInput
		_max?: VerificationMaxOrderByAggregateInput
		_min?: VerificationMinOrderByAggregateInput
		_sum?: VerificationSumOrderByAggregateInput
	}

	export type VerificationScalarWhereWithAggregatesInput = {
		AND?:
			| VerificationScalarWhereWithAggregatesInput
			| VerificationScalarWhereWithAggregatesInput[]
		OR?: VerificationScalarWhereWithAggregatesInput[]
		NOT?:
			| VerificationScalarWhereWithAggregatesInput
			| VerificationScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Verification'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Verification'> | Date | string
		type?: StringWithAggregatesFilter<'Verification'> | string
		target?: StringWithAggregatesFilter<'Verification'> | string
		secret?: StringWithAggregatesFilter<'Verification'> | string
		algorithm?: StringWithAggregatesFilter<'Verification'> | string
		digits?: IntWithAggregatesFilter<'Verification'> | number
		period?: IntWithAggregatesFilter<'Verification'> | number
		charSet?: StringWithAggregatesFilter<'Verification'> | string
		expiresAt?:
			| DateTimeNullableWithAggregatesFilter<'Verification'>
			| Date
			| string
			| null
	}

	export type ConnectionWhereInput = {
		AND?: ConnectionWhereInput | ConnectionWhereInput[]
		OR?: ConnectionWhereInput[]
		NOT?: ConnectionWhereInput | ConnectionWhereInput[]
		id?: StringFilter<'Connection'> | string
		providerName?: StringFilter<'Connection'> | string
		providerId?: StringFilter<'Connection'> | string
		createdAt?: DateTimeFilter<'Connection'> | Date | string
		updatedAt?: DateTimeFilter<'Connection'> | Date | string
		userId?: StringFilter<'Connection'> | string
		user?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type ConnectionOrderByWithRelationInput = {
		id?: SortOrder
		providerName?: SortOrder
		providerId?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		user?: UserOrderByWithRelationInput
	}

	export type ConnectionWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			providerName_providerId?: ConnectionProviderNameProviderIdCompoundUniqueInput
			AND?: ConnectionWhereInput | ConnectionWhereInput[]
			OR?: ConnectionWhereInput[]
			NOT?: ConnectionWhereInput | ConnectionWhereInput[]
			providerName?: StringFilter<'Connection'> | string
			providerId?: StringFilter<'Connection'> | string
			createdAt?: DateTimeFilter<'Connection'> | Date | string
			updatedAt?: DateTimeFilter<'Connection'> | Date | string
			userId?: StringFilter<'Connection'> | string
			user?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id' | 'providerName_providerId'
	>

	export type ConnectionOrderByWithAggregationInput = {
		id?: SortOrder
		providerName?: SortOrder
		providerId?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
		_count?: ConnectionCountOrderByAggregateInput
		_max?: ConnectionMaxOrderByAggregateInput
		_min?: ConnectionMinOrderByAggregateInput
	}

	export type ConnectionScalarWhereWithAggregatesInput = {
		AND?:
			| ConnectionScalarWhereWithAggregatesInput
			| ConnectionScalarWhereWithAggregatesInput[]
		OR?: ConnectionScalarWhereWithAggregatesInput[]
		NOT?:
			| ConnectionScalarWhereWithAggregatesInput
			| ConnectionScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Connection'> | string
		providerName?: StringWithAggregatesFilter<'Connection'> | string
		providerId?: StringWithAggregatesFilter<'Connection'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Connection'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'Connection'> | Date | string
		userId?: StringWithAggregatesFilter<'Connection'> | string
	}

	export type PasskeyWhereInput = {
		AND?: PasskeyWhereInput | PasskeyWhereInput[]
		OR?: PasskeyWhereInput[]
		NOT?: PasskeyWhereInput | PasskeyWhereInput[]
		id?: StringFilter<'Passkey'> | string
		aaguid?: StringFilter<'Passkey'> | string
		createdAt?: DateTimeFilter<'Passkey'> | Date | string
		updatedAt?: DateTimeFilter<'Passkey'> | Date | string
		publicKey?: BytesFilter<'Passkey'> | Uint8Array
		userId?: StringFilter<'Passkey'> | string
		webauthnUserId?: StringFilter<'Passkey'> | string
		counter?: BigIntFilter<'Passkey'> | bigint | number
		deviceType?: StringFilter<'Passkey'> | string
		backedUp?: BoolFilter<'Passkey'> | boolean
		transports?: StringNullableFilter<'Passkey'> | string | null
		user?: XOR<UserScalarRelationFilter, UserWhereInput>
	}

	export type PasskeyOrderByWithRelationInput = {
		id?: SortOrder
		aaguid?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		publicKey?: SortOrder
		userId?: SortOrder
		webauthnUserId?: SortOrder
		counter?: SortOrder
		deviceType?: SortOrder
		backedUp?: SortOrder
		transports?: SortOrderInput | SortOrder
		user?: UserOrderByWithRelationInput
	}

	export type PasskeyWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string
			AND?: PasskeyWhereInput | PasskeyWhereInput[]
			OR?: PasskeyWhereInput[]
			NOT?: PasskeyWhereInput | PasskeyWhereInput[]
			aaguid?: StringFilter<'Passkey'> | string
			createdAt?: DateTimeFilter<'Passkey'> | Date | string
			updatedAt?: DateTimeFilter<'Passkey'> | Date | string
			publicKey?: BytesFilter<'Passkey'> | Uint8Array
			userId?: StringFilter<'Passkey'> | string
			webauthnUserId?: StringFilter<'Passkey'> | string
			counter?: BigIntFilter<'Passkey'> | bigint | number
			deviceType?: StringFilter<'Passkey'> | string
			backedUp?: BoolFilter<'Passkey'> | boolean
			transports?: StringNullableFilter<'Passkey'> | string | null
			user?: XOR<UserScalarRelationFilter, UserWhereInput>
		},
		'id'
	>

	export type PasskeyOrderByWithAggregationInput = {
		id?: SortOrder
		aaguid?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		publicKey?: SortOrder
		userId?: SortOrder
		webauthnUserId?: SortOrder
		counter?: SortOrder
		deviceType?: SortOrder
		backedUp?: SortOrder
		transports?: SortOrderInput | SortOrder
		_count?: PasskeyCountOrderByAggregateInput
		_avg?: PasskeyAvgOrderByAggregateInput
		_max?: PasskeyMaxOrderByAggregateInput
		_min?: PasskeyMinOrderByAggregateInput
		_sum?: PasskeySumOrderByAggregateInput
	}

	export type PasskeyScalarWhereWithAggregatesInput = {
		AND?:
			| PasskeyScalarWhereWithAggregatesInput
			| PasskeyScalarWhereWithAggregatesInput[]
		OR?: PasskeyScalarWhereWithAggregatesInput[]
		NOT?:
			| PasskeyScalarWhereWithAggregatesInput
			| PasskeyScalarWhereWithAggregatesInput[]
		id?: StringWithAggregatesFilter<'Passkey'> | string
		aaguid?: StringWithAggregatesFilter<'Passkey'> | string
		createdAt?: DateTimeWithAggregatesFilter<'Passkey'> | Date | string
		updatedAt?: DateTimeWithAggregatesFilter<'Passkey'> | Date | string
		publicKey?: BytesWithAggregatesFilter<'Passkey'> | Uint8Array
		userId?: StringWithAggregatesFilter<'Passkey'> | string
		webauthnUserId?: StringWithAggregatesFilter<'Passkey'> | string
		counter?: BigIntWithAggregatesFilter<'Passkey'> | bigint | number
		deviceType?: StringWithAggregatesFilter<'Passkey'> | string
		backedUp?: BoolWithAggregatesFilter<'Passkey'> | boolean
		transports?: StringNullableWithAggregatesFilter<'Passkey'> | string | null
	}

	export type UserCreateInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type UserCreateManyInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type UserUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type UserUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type UserImageCreateInput = {
		id?: string
		altText?: string | null
		objectKey: string
		createdAt?: Date | string
		updatedAt?: Date | string
		user: UserCreateNestedOneWithoutImageInput
	}

	export type UserImageUncheckedCreateInput = {
		id?: string
		altText?: string | null
		objectKey: string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type UserImageUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		user?: UserUpdateOneRequiredWithoutImageNestedInput
	}

	export type UserImageUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type UserImageCreateManyInput = {
		id?: string
		altText?: string | null
		objectKey: string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type UserImageUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type UserImageUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type PasswordCreateInput = {
		hash: string
		requiredReset?: boolean
		user: UserCreateNestedOneWithoutPasswordInput
	}

	export type PasswordUncheckedCreateInput = {
		hash: string
		userId: string
		requiredReset?: boolean
	}

	export type PasswordUpdateInput = {
		hash?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
		user?: UserUpdateOneRequiredWithoutPasswordNestedInput
	}

	export type PasswordUncheckedUpdateInput = {
		hash?: StringFieldUpdateOperationsInput | string
		userId?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
	}

	export type PasswordCreateManyInput = {
		hash: string
		userId: string
		requiredReset?: boolean
	}

	export type PasswordUpdateManyMutationInput = {
		hash?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
	}

	export type PasswordUncheckedUpdateManyInput = {
		hash?: StringFieldUpdateOperationsInput | string
		userId?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
	}

	export type SessionCreateInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
		user: UserCreateNestedOneWithoutSessionsInput
	}

	export type SessionUncheckedCreateInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type SessionUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		user?: UserUpdateOneRequiredWithoutSessionsNestedInput
	}

	export type SessionUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type SessionCreateManyInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type SessionUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type SessionUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type PermissionCreateInput = {
		id?: string
		action: string
		entity: string
		access: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		roles?: RoleCreateNestedManyWithoutPermissionsInput
	}

	export type PermissionUncheckedCreateInput = {
		id?: string
		action: string
		entity: string
		access: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		roles?: RoleUncheckedCreateNestedManyWithoutPermissionsInput
	}

	export type PermissionUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		roles?: RoleUpdateManyWithoutPermissionsNestedInput
	}

	export type PermissionUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		roles?: RoleUncheckedUpdateManyWithoutPermissionsNestedInput
	}

	export type PermissionCreateManyInput = {
		id?: string
		action: string
		entity: string
		access: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type PermissionUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type PermissionUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type RoleCreateInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		permissions?: PermissionCreateNestedManyWithoutRolesInput
		users?: UserCreateNestedManyWithoutRolesInput
	}

	export type RoleUncheckedCreateInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
		users?: UserUncheckedCreateNestedManyWithoutRolesInput
	}

	export type RoleUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		permissions?: PermissionUpdateManyWithoutRolesNestedInput
		users?: UserUpdateManyWithoutRolesNestedInput
	}

	export type RoleUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
		users?: UserUncheckedUpdateManyWithoutRolesNestedInput
	}

	export type RoleCreateManyInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type RoleUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type RoleUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type VerificationCreateInput = {
		id?: string
		createdAt?: Date | string
		type: string
		target: string
		secret: string
		algorithm: string
		digits: number
		period: number
		charSet: string
		expiresAt?: Date | string | null
	}

	export type VerificationUncheckedCreateInput = {
		id?: string
		createdAt?: Date | string
		type: string
		target: string
		secret: string
		algorithm: string
		digits: number
		period: number
		charSet: string
		expiresAt?: Date | string | null
	}

	export type VerificationUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		type?: StringFieldUpdateOperationsInput | string
		target?: StringFieldUpdateOperationsInput | string
		secret?: StringFieldUpdateOperationsInput | string
		algorithm?: StringFieldUpdateOperationsInput | string
		digits?: IntFieldUpdateOperationsInput | number
		period?: IntFieldUpdateOperationsInput | number
		charSet?: StringFieldUpdateOperationsInput | string
		expiresAt?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null
	}

	export type VerificationUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		type?: StringFieldUpdateOperationsInput | string
		target?: StringFieldUpdateOperationsInput | string
		secret?: StringFieldUpdateOperationsInput | string
		algorithm?: StringFieldUpdateOperationsInput | string
		digits?: IntFieldUpdateOperationsInput | number
		period?: IntFieldUpdateOperationsInput | number
		charSet?: StringFieldUpdateOperationsInput | string
		expiresAt?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null
	}

	export type VerificationCreateManyInput = {
		id?: string
		createdAt?: Date | string
		type: string
		target: string
		secret: string
		algorithm: string
		digits: number
		period: number
		charSet: string
		expiresAt?: Date | string | null
	}

	export type VerificationUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		type?: StringFieldUpdateOperationsInput | string
		target?: StringFieldUpdateOperationsInput | string
		secret?: StringFieldUpdateOperationsInput | string
		algorithm?: StringFieldUpdateOperationsInput | string
		digits?: IntFieldUpdateOperationsInput | number
		period?: IntFieldUpdateOperationsInput | number
		charSet?: StringFieldUpdateOperationsInput | string
		expiresAt?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null
	}

	export type VerificationUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		type?: StringFieldUpdateOperationsInput | string
		target?: StringFieldUpdateOperationsInput | string
		secret?: StringFieldUpdateOperationsInput | string
		algorithm?: StringFieldUpdateOperationsInput | string
		digits?: IntFieldUpdateOperationsInput | number
		period?: IntFieldUpdateOperationsInput | number
		charSet?: StringFieldUpdateOperationsInput | string
		expiresAt?:
			| NullableDateTimeFieldUpdateOperationsInput
			| Date
			| string
			| null
	}

	export type ConnectionCreateInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
		user: UserCreateNestedOneWithoutConnectionsInput
	}

	export type ConnectionUncheckedCreateInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type ConnectionUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		user?: UserUpdateOneRequiredWithoutConnectionsNestedInput
	}

	export type ConnectionUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type ConnectionCreateManyInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
		userId: string
	}

	export type ConnectionUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type ConnectionUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		userId?: StringFieldUpdateOperationsInput | string
	}

	export type PasskeyCreateInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
		user: UserCreateNestedOneWithoutPasskeyInput
	}

	export type PasskeyUncheckedCreateInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		userId: string
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
	}

	export type PasskeyUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
		user?: UserUpdateOneRequiredWithoutPasskeyNestedInput
	}

	export type PasskeyUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		userId?: StringFieldUpdateOperationsInput | string
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type PasskeyCreateManyInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		userId: string
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
	}

	export type PasskeyUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type PasskeyUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		userId?: StringFieldUpdateOperationsInput | string
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type StringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringFilter<$PrismaModel> | string
	}

	export type StringNullableFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringNullableFilter<$PrismaModel> | string | null
	}

	export type DateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string
	}

	export type ConnectionListRelationFilter = {
		every?: ConnectionWhereInput
		some?: ConnectionWhereInput
		none?: ConnectionWhereInput
	}

	export type PasskeyListRelationFilter = {
		every?: PasskeyWhereInput
		some?: PasskeyWhereInput
		none?: PasskeyWhereInput
	}

	export type PasswordNullableScalarRelationFilter = {
		is?: PasswordWhereInput | null
		isNot?: PasswordWhereInput | null
	}

	export type SessionListRelationFilter = {
		every?: SessionWhereInput
		some?: SessionWhereInput
		none?: SessionWhereInput
	}

	export type UserImageNullableScalarRelationFilter = {
		is?: UserImageWhereInput | null
		isNot?: UserImageWhereInput | null
	}

	export type RoleListRelationFilter = {
		every?: RoleWhereInput
		some?: RoleWhereInput
		none?: RoleWhereInput
	}

	export type SortOrderInput = {
		sort: SortOrder
		nulls?: NullsOrder
	}

	export type ConnectionOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type PasskeyOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type SessionOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type RoleOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type UserCountOrderByAggregateInput = {
		id?: SortOrder
		email?: SortOrder
		username?: SortOrder
		name?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type UserMaxOrderByAggregateInput = {
		id?: SortOrder
		email?: SortOrder
		username?: SortOrder
		name?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type UserMinOrderByAggregateInput = {
		id?: SortOrder
		email?: SortOrder
		username?: SortOrder
		name?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type StringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedStringFilter<$PrismaModel>
		_max?: NestedStringFilter<$PrismaModel>
	}

	export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		mode?: QueryMode
		not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
		_count?: NestedIntNullableFilter<$PrismaModel>
		_min?: NestedStringNullableFilter<$PrismaModel>
		_max?: NestedStringNullableFilter<$PrismaModel>
	}

	export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedDateTimeFilter<$PrismaModel>
		_max?: NestedDateTimeFilter<$PrismaModel>
	}

	export type UserScalarRelationFilter = {
		is?: UserWhereInput
		isNot?: UserWhereInput
	}

	export type UserImageCountOrderByAggregateInput = {
		id?: SortOrder
		altText?: SortOrder
		objectKey?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type UserImageMaxOrderByAggregateInput = {
		id?: SortOrder
		altText?: SortOrder
		objectKey?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type UserImageMinOrderByAggregateInput = {
		id?: SortOrder
		altText?: SortOrder
		objectKey?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type BoolFilter<$PrismaModel = never> = {
		equals?: boolean | BooleanFieldRefInput<$PrismaModel>
		not?: NestedBoolFilter<$PrismaModel> | boolean
	}

	export type PasswordCountOrderByAggregateInput = {
		hash?: SortOrder
		userId?: SortOrder
		requiredReset?: SortOrder
	}

	export type PasswordMaxOrderByAggregateInput = {
		hash?: SortOrder
		userId?: SortOrder
		requiredReset?: SortOrder
	}

	export type PasswordMinOrderByAggregateInput = {
		hash?: SortOrder
		userId?: SortOrder
		requiredReset?: SortOrder
	}

	export type BoolWithAggregatesFilter<$PrismaModel = never> = {
		equals?: boolean | BooleanFieldRefInput<$PrismaModel>
		not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedBoolFilter<$PrismaModel>
		_max?: NestedBoolFilter<$PrismaModel>
	}

	export type SessionCountOrderByAggregateInput = {
		id?: SortOrder
		expirationDate?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type SessionMaxOrderByAggregateInput = {
		id?: SortOrder
		expirationDate?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type SessionMinOrderByAggregateInput = {
		id?: SortOrder
		expirationDate?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type PermissionActionEntityAccessCompoundUniqueInput = {
		action: string
		entity: string
		access: string
	}

	export type PermissionCountOrderByAggregateInput = {
		id?: SortOrder
		action?: SortOrder
		entity?: SortOrder
		access?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type PermissionMaxOrderByAggregateInput = {
		id?: SortOrder
		action?: SortOrder
		entity?: SortOrder
		access?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type PermissionMinOrderByAggregateInput = {
		id?: SortOrder
		action?: SortOrder
		entity?: SortOrder
		access?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type PermissionListRelationFilter = {
		every?: PermissionWhereInput
		some?: PermissionWhereInput
		none?: PermissionWhereInput
	}

	export type UserListRelationFilter = {
		every?: UserWhereInput
		some?: UserWhereInput
		none?: UserWhereInput
	}

	export type PermissionOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type UserOrderByRelationAggregateInput = {
		_count?: SortOrder
	}

	export type RoleCountOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type RoleMaxOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type RoleMinOrderByAggregateInput = {
		id?: SortOrder
		name?: SortOrder
		description?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
	}

	export type IntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>
		in?: number[] | ListIntFieldRefInput<$PrismaModel>
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntFilter<$PrismaModel> | number
	}

	export type DateTimeNullableFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
	}

	export type VerificationTargetTypeCompoundUniqueInput = {
		target: string
		type: string
	}

	export type VerificationCountOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		type?: SortOrder
		target?: SortOrder
		secret?: SortOrder
		algorithm?: SortOrder
		digits?: SortOrder
		period?: SortOrder
		charSet?: SortOrder
		expiresAt?: SortOrder
	}

	export type VerificationAvgOrderByAggregateInput = {
		digits?: SortOrder
		period?: SortOrder
	}

	export type VerificationMaxOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		type?: SortOrder
		target?: SortOrder
		secret?: SortOrder
		algorithm?: SortOrder
		digits?: SortOrder
		period?: SortOrder
		charSet?: SortOrder
		expiresAt?: SortOrder
	}

	export type VerificationMinOrderByAggregateInput = {
		id?: SortOrder
		createdAt?: SortOrder
		type?: SortOrder
		target?: SortOrder
		secret?: SortOrder
		algorithm?: SortOrder
		digits?: SortOrder
		period?: SortOrder
		charSet?: SortOrder
		expiresAt?: SortOrder
	}

	export type VerificationSumOrderByAggregateInput = {
		digits?: SortOrder
		period?: SortOrder
	}

	export type IntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>
		in?: number[] | ListIntFieldRefInput<$PrismaModel>
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
		_count?: NestedIntFilter<$PrismaModel>
		_avg?: NestedFloatFilter<$PrismaModel>
		_sum?: NestedIntFilter<$PrismaModel>
		_min?: NestedIntFilter<$PrismaModel>
		_max?: NestedIntFilter<$PrismaModel>
	}

	export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?:
			| NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
			| Date
			| string
			| null
		_count?: NestedIntNullableFilter<$PrismaModel>
		_min?: NestedDateTimeNullableFilter<$PrismaModel>
		_max?: NestedDateTimeNullableFilter<$PrismaModel>
	}

	export type ConnectionProviderNameProviderIdCompoundUniqueInput = {
		providerName: string
		providerId: string
	}

	export type ConnectionCountOrderByAggregateInput = {
		id?: SortOrder
		providerName?: SortOrder
		providerId?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type ConnectionMaxOrderByAggregateInput = {
		id?: SortOrder
		providerName?: SortOrder
		providerId?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type ConnectionMinOrderByAggregateInput = {
		id?: SortOrder
		providerName?: SortOrder
		providerId?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		userId?: SortOrder
	}

	export type BytesFilter<$PrismaModel = never> = {
		equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
		in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		not?: NestedBytesFilter<$PrismaModel> | Uint8Array
	}

	export type BigIntFilter<$PrismaModel = never> = {
		equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		not?: NestedBigIntFilter<$PrismaModel> | bigint | number
	}

	export type PasskeyCountOrderByAggregateInput = {
		id?: SortOrder
		aaguid?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		publicKey?: SortOrder
		userId?: SortOrder
		webauthnUserId?: SortOrder
		counter?: SortOrder
		deviceType?: SortOrder
		backedUp?: SortOrder
		transports?: SortOrder
	}

	export type PasskeyAvgOrderByAggregateInput = {
		counter?: SortOrder
	}

	export type PasskeyMaxOrderByAggregateInput = {
		id?: SortOrder
		aaguid?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		publicKey?: SortOrder
		userId?: SortOrder
		webauthnUserId?: SortOrder
		counter?: SortOrder
		deviceType?: SortOrder
		backedUp?: SortOrder
		transports?: SortOrder
	}

	export type PasskeyMinOrderByAggregateInput = {
		id?: SortOrder
		aaguid?: SortOrder
		createdAt?: SortOrder
		updatedAt?: SortOrder
		publicKey?: SortOrder
		userId?: SortOrder
		webauthnUserId?: SortOrder
		counter?: SortOrder
		deviceType?: SortOrder
		backedUp?: SortOrder
		transports?: SortOrder
	}

	export type PasskeySumOrderByAggregateInput = {
		counter?: SortOrder
	}

	export type BytesWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
		in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedBytesFilter<$PrismaModel>
		_max?: NestedBytesFilter<$PrismaModel>
	}

	export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
		_count?: NestedIntFilter<$PrismaModel>
		_avg?: NestedFloatFilter<$PrismaModel>
		_sum?: NestedBigIntFilter<$PrismaModel>
		_min?: NestedBigIntFilter<$PrismaModel>
		_max?: NestedBigIntFilter<$PrismaModel>
	}

	export type ConnectionCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					ConnectionCreateWithoutUserInput,
					ConnectionUncheckedCreateWithoutUserInput
			  >
			| ConnectionCreateWithoutUserInput[]
			| ConnectionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| ConnectionCreateOrConnectWithoutUserInput
			| ConnectionCreateOrConnectWithoutUserInput[]
		createMany?: ConnectionCreateManyUserInputEnvelope
		connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
	}

	export type PasskeyCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					PasskeyCreateWithoutUserInput,
					PasskeyUncheckedCreateWithoutUserInput
			  >
			| PasskeyCreateWithoutUserInput[]
			| PasskeyUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| PasskeyCreateOrConnectWithoutUserInput
			| PasskeyCreateOrConnectWithoutUserInput[]
		createMany?: PasskeyCreateManyUserInputEnvelope
		connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
	}

	export type PasswordCreateNestedOneWithoutUserInput = {
		create?: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
		connect?: PasswordWhereUniqueInput
	}

	export type SessionCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[]
		createMany?: SessionCreateManyUserInputEnvelope
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
	}

	export type UserImageCreateNestedOneWithoutUserInput = {
		create?: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: UserImageCreateOrConnectWithoutUserInput
		connect?: UserImageWhereUniqueInput
	}

	export type RoleCreateNestedManyWithoutUsersInput = {
		create?:
			| XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
			| RoleCreateWithoutUsersInput[]
			| RoleUncheckedCreateWithoutUsersInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutUsersInput
			| RoleCreateOrConnectWithoutUsersInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
	}

	export type ConnectionUncheckedCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					ConnectionCreateWithoutUserInput,
					ConnectionUncheckedCreateWithoutUserInput
			  >
			| ConnectionCreateWithoutUserInput[]
			| ConnectionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| ConnectionCreateOrConnectWithoutUserInput
			| ConnectionCreateOrConnectWithoutUserInput[]
		createMany?: ConnectionCreateManyUserInputEnvelope
		connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
	}

	export type PasskeyUncheckedCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					PasskeyCreateWithoutUserInput,
					PasskeyUncheckedCreateWithoutUserInput
			  >
			| PasskeyCreateWithoutUserInput[]
			| PasskeyUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| PasskeyCreateOrConnectWithoutUserInput
			| PasskeyCreateOrConnectWithoutUserInput[]
		createMany?: PasskeyCreateManyUserInputEnvelope
		connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
	}

	export type PasswordUncheckedCreateNestedOneWithoutUserInput = {
		create?: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
		connect?: PasswordWhereUniqueInput
	}

	export type SessionUncheckedCreateNestedManyWithoutUserInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[]
		createMany?: SessionCreateManyUserInputEnvelope
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
	}

	export type UserImageUncheckedCreateNestedOneWithoutUserInput = {
		create?: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: UserImageCreateOrConnectWithoutUserInput
		connect?: UserImageWhereUniqueInput
	}

	export type RoleUncheckedCreateNestedManyWithoutUsersInput = {
		create?:
			| XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
			| RoleCreateWithoutUsersInput[]
			| RoleUncheckedCreateWithoutUsersInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutUsersInput
			| RoleCreateOrConnectWithoutUsersInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
	}

	export type StringFieldUpdateOperationsInput = {
		set?: string
	}

	export type NullableStringFieldUpdateOperationsInput = {
		set?: string | null
	}

	export type DateTimeFieldUpdateOperationsInput = {
		set?: Date | string
	}

	export type ConnectionUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					ConnectionCreateWithoutUserInput,
					ConnectionUncheckedCreateWithoutUserInput
			  >
			| ConnectionCreateWithoutUserInput[]
			| ConnectionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| ConnectionCreateOrConnectWithoutUserInput
			| ConnectionCreateOrConnectWithoutUserInput[]
		upsert?:
			| ConnectionUpsertWithWhereUniqueWithoutUserInput
			| ConnectionUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: ConnectionCreateManyUserInputEnvelope
		set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		update?:
			| ConnectionUpdateWithWhereUniqueWithoutUserInput
			| ConnectionUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| ConnectionUpdateManyWithWhereWithoutUserInput
			| ConnectionUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
	}

	export type PasskeyUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					PasskeyCreateWithoutUserInput,
					PasskeyUncheckedCreateWithoutUserInput
			  >
			| PasskeyCreateWithoutUserInput[]
			| PasskeyUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| PasskeyCreateOrConnectWithoutUserInput
			| PasskeyCreateOrConnectWithoutUserInput[]
		upsert?:
			| PasskeyUpsertWithWhereUniqueWithoutUserInput
			| PasskeyUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: PasskeyCreateManyUserInputEnvelope
		set?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		disconnect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		delete?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		update?:
			| PasskeyUpdateWithWhereUniqueWithoutUserInput
			| PasskeyUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| PasskeyUpdateManyWithWhereWithoutUserInput
			| PasskeyUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
	}

	export type PasswordUpdateOneWithoutUserNestedInput = {
		create?: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
		upsert?: PasswordUpsertWithoutUserInput
		disconnect?: PasswordWhereInput | boolean
		delete?: PasswordWhereInput | boolean
		connect?: PasswordWhereUniqueInput
		update?: XOR<
			XOR<
				PasswordUpdateToOneWithWhereWithoutUserInput,
				PasswordUpdateWithoutUserInput
			>,
			PasswordUncheckedUpdateWithoutUserInput
		>
	}

	export type SessionUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[]
		upsert?:
			| SessionUpsertWithWhereUniqueWithoutUserInput
			| SessionUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: SessionCreateManyUserInputEnvelope
		set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		update?:
			| SessionUpdateWithWhereUniqueWithoutUserInput
			| SessionUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| SessionUpdateManyWithWhereWithoutUserInput
			| SessionUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
	}

	export type UserImageUpdateOneWithoutUserNestedInput = {
		create?: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: UserImageCreateOrConnectWithoutUserInput
		upsert?: UserImageUpsertWithoutUserInput
		disconnect?: UserImageWhereInput | boolean
		delete?: UserImageWhereInput | boolean
		connect?: UserImageWhereUniqueInput
		update?: XOR<
			XOR<
				UserImageUpdateToOneWithWhereWithoutUserInput,
				UserImageUpdateWithoutUserInput
			>,
			UserImageUncheckedUpdateWithoutUserInput
		>
	}

	export type RoleUpdateManyWithoutUsersNestedInput = {
		create?:
			| XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
			| RoleCreateWithoutUsersInput[]
			| RoleUncheckedCreateWithoutUsersInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutUsersInput
			| RoleCreateOrConnectWithoutUsersInput[]
		upsert?:
			| RoleUpsertWithWhereUniqueWithoutUsersInput
			| RoleUpsertWithWhereUniqueWithoutUsersInput[]
		set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		update?:
			| RoleUpdateWithWhereUniqueWithoutUsersInput
			| RoleUpdateWithWhereUniqueWithoutUsersInput[]
		updateMany?:
			| RoleUpdateManyWithWhereWithoutUsersInput
			| RoleUpdateManyWithWhereWithoutUsersInput[]
		deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
	}

	export type ConnectionUncheckedUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					ConnectionCreateWithoutUserInput,
					ConnectionUncheckedCreateWithoutUserInput
			  >
			| ConnectionCreateWithoutUserInput[]
			| ConnectionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| ConnectionCreateOrConnectWithoutUserInput
			| ConnectionCreateOrConnectWithoutUserInput[]
		upsert?:
			| ConnectionUpsertWithWhereUniqueWithoutUserInput
			| ConnectionUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: ConnectionCreateManyUserInputEnvelope
		set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
		update?:
			| ConnectionUpdateWithWhereUniqueWithoutUserInput
			| ConnectionUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| ConnectionUpdateManyWithWhereWithoutUserInput
			| ConnectionUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
	}

	export type PasskeyUncheckedUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					PasskeyCreateWithoutUserInput,
					PasskeyUncheckedCreateWithoutUserInput
			  >
			| PasskeyCreateWithoutUserInput[]
			| PasskeyUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| PasskeyCreateOrConnectWithoutUserInput
			| PasskeyCreateOrConnectWithoutUserInput[]
		upsert?:
			| PasskeyUpsertWithWhereUniqueWithoutUserInput
			| PasskeyUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: PasskeyCreateManyUserInputEnvelope
		set?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		disconnect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		delete?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		connect?: PasskeyWhereUniqueInput | PasskeyWhereUniqueInput[]
		update?:
			| PasskeyUpdateWithWhereUniqueWithoutUserInput
			| PasskeyUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| PasskeyUpdateManyWithWhereWithoutUserInput
			| PasskeyUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
	}

	export type PasswordUncheckedUpdateOneWithoutUserNestedInput = {
		create?: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
		upsert?: PasswordUpsertWithoutUserInput
		disconnect?: PasswordWhereInput | boolean
		delete?: PasswordWhereInput | boolean
		connect?: PasswordWhereUniqueInput
		update?: XOR<
			XOR<
				PasswordUpdateToOneWithWhereWithoutUserInput,
				PasswordUpdateWithoutUserInput
			>,
			PasswordUncheckedUpdateWithoutUserInput
		>
	}

	export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
		create?:
			| XOR<
					SessionCreateWithoutUserInput,
					SessionUncheckedCreateWithoutUserInput
			  >
			| SessionCreateWithoutUserInput[]
			| SessionUncheckedCreateWithoutUserInput[]
		connectOrCreate?:
			| SessionCreateOrConnectWithoutUserInput
			| SessionCreateOrConnectWithoutUserInput[]
		upsert?:
			| SessionUpsertWithWhereUniqueWithoutUserInput
			| SessionUpsertWithWhereUniqueWithoutUserInput[]
		createMany?: SessionCreateManyUserInputEnvelope
		set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
		update?:
			| SessionUpdateWithWhereUniqueWithoutUserInput
			| SessionUpdateWithWhereUniqueWithoutUserInput[]
		updateMany?:
			| SessionUpdateManyWithWhereWithoutUserInput
			| SessionUpdateManyWithWhereWithoutUserInput[]
		deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
	}

	export type UserImageUncheckedUpdateOneWithoutUserNestedInput = {
		create?: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
		connectOrCreate?: UserImageCreateOrConnectWithoutUserInput
		upsert?: UserImageUpsertWithoutUserInput
		disconnect?: UserImageWhereInput | boolean
		delete?: UserImageWhereInput | boolean
		connect?: UserImageWhereUniqueInput
		update?: XOR<
			XOR<
				UserImageUpdateToOneWithWhereWithoutUserInput,
				UserImageUpdateWithoutUserInput
			>,
			UserImageUncheckedUpdateWithoutUserInput
		>
	}

	export type RoleUncheckedUpdateManyWithoutUsersNestedInput = {
		create?:
			| XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
			| RoleCreateWithoutUsersInput[]
			| RoleUncheckedCreateWithoutUsersInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutUsersInput
			| RoleCreateOrConnectWithoutUsersInput[]
		upsert?:
			| RoleUpsertWithWhereUniqueWithoutUsersInput
			| RoleUpsertWithWhereUniqueWithoutUsersInput[]
		set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		update?:
			| RoleUpdateWithWhereUniqueWithoutUsersInput
			| RoleUpdateWithWhereUniqueWithoutUsersInput[]
		updateMany?:
			| RoleUpdateManyWithWhereWithoutUsersInput
			| RoleUpdateManyWithWhereWithoutUsersInput[]
		deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
	}

	export type UserCreateNestedOneWithoutImageInput = {
		create?: XOR<
			UserCreateWithoutImageInput,
			UserUncheckedCreateWithoutImageInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutImageInput
		connect?: UserWhereUniqueInput
	}

	export type UserUpdateOneRequiredWithoutImageNestedInput = {
		create?: XOR<
			UserCreateWithoutImageInput,
			UserUncheckedCreateWithoutImageInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutImageInput
		upsert?: UserUpsertWithoutImageInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutImageInput,
				UserUpdateWithoutImageInput
			>,
			UserUncheckedUpdateWithoutImageInput
		>
	}

	export type UserCreateNestedOneWithoutPasswordInput = {
		create?: XOR<
			UserCreateWithoutPasswordInput,
			UserUncheckedCreateWithoutPasswordInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
		connect?: UserWhereUniqueInput
	}

	export type BoolFieldUpdateOperationsInput = {
		set?: boolean
	}

	export type UserUpdateOneRequiredWithoutPasswordNestedInput = {
		create?: XOR<
			UserCreateWithoutPasswordInput,
			UserUncheckedCreateWithoutPasswordInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
		upsert?: UserUpsertWithoutPasswordInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutPasswordInput,
				UserUpdateWithoutPasswordInput
			>,
			UserUncheckedUpdateWithoutPasswordInput
		>
	}

	export type UserCreateNestedOneWithoutSessionsInput = {
		create?: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
		connect?: UserWhereUniqueInput
	}

	export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
		create?: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
		upsert?: UserUpsertWithoutSessionsInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutSessionsInput,
				UserUpdateWithoutSessionsInput
			>,
			UserUncheckedUpdateWithoutSessionsInput
		>
	}

	export type RoleCreateNestedManyWithoutPermissionsInput = {
		create?:
			| XOR<
					RoleCreateWithoutPermissionsInput,
					RoleUncheckedCreateWithoutPermissionsInput
			  >
			| RoleCreateWithoutPermissionsInput[]
			| RoleUncheckedCreateWithoutPermissionsInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutPermissionsInput
			| RoleCreateOrConnectWithoutPermissionsInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
	}

	export type RoleUncheckedCreateNestedManyWithoutPermissionsInput = {
		create?:
			| XOR<
					RoleCreateWithoutPermissionsInput,
					RoleUncheckedCreateWithoutPermissionsInput
			  >
			| RoleCreateWithoutPermissionsInput[]
			| RoleUncheckedCreateWithoutPermissionsInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutPermissionsInput
			| RoleCreateOrConnectWithoutPermissionsInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
	}

	export type RoleUpdateManyWithoutPermissionsNestedInput = {
		create?:
			| XOR<
					RoleCreateWithoutPermissionsInput,
					RoleUncheckedCreateWithoutPermissionsInput
			  >
			| RoleCreateWithoutPermissionsInput[]
			| RoleUncheckedCreateWithoutPermissionsInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutPermissionsInput
			| RoleCreateOrConnectWithoutPermissionsInput[]
		upsert?:
			| RoleUpsertWithWhereUniqueWithoutPermissionsInput
			| RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
		set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		update?:
			| RoleUpdateWithWhereUniqueWithoutPermissionsInput
			| RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
		updateMany?:
			| RoleUpdateManyWithWhereWithoutPermissionsInput
			| RoleUpdateManyWithWhereWithoutPermissionsInput[]
		deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
	}

	export type RoleUncheckedUpdateManyWithoutPermissionsNestedInput = {
		create?:
			| XOR<
					RoleCreateWithoutPermissionsInput,
					RoleUncheckedCreateWithoutPermissionsInput
			  >
			| RoleCreateWithoutPermissionsInput[]
			| RoleUncheckedCreateWithoutPermissionsInput[]
		connectOrCreate?:
			| RoleCreateOrConnectWithoutPermissionsInput
			| RoleCreateOrConnectWithoutPermissionsInput[]
		upsert?:
			| RoleUpsertWithWhereUniqueWithoutPermissionsInput
			| RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
		set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
		update?:
			| RoleUpdateWithWhereUniqueWithoutPermissionsInput
			| RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
		updateMany?:
			| RoleUpdateManyWithWhereWithoutPermissionsInput
			| RoleUpdateManyWithWhereWithoutPermissionsInput[]
		deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
	}

	export type PermissionCreateNestedManyWithoutRolesInput = {
		create?:
			| XOR<
					PermissionCreateWithoutRolesInput,
					PermissionUncheckedCreateWithoutRolesInput
			  >
			| PermissionCreateWithoutRolesInput[]
			| PermissionUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| PermissionCreateOrConnectWithoutRolesInput
			| PermissionCreateOrConnectWithoutRolesInput[]
		connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
	}

	export type UserCreateNestedManyWithoutRolesInput = {
		create?:
			| XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
			| UserCreateWithoutRolesInput[]
			| UserUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| UserCreateOrConnectWithoutRolesInput
			| UserCreateOrConnectWithoutRolesInput[]
		connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
	}

	export type PermissionUncheckedCreateNestedManyWithoutRolesInput = {
		create?:
			| XOR<
					PermissionCreateWithoutRolesInput,
					PermissionUncheckedCreateWithoutRolesInput
			  >
			| PermissionCreateWithoutRolesInput[]
			| PermissionUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| PermissionCreateOrConnectWithoutRolesInput
			| PermissionCreateOrConnectWithoutRolesInput[]
		connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
	}

	export type UserUncheckedCreateNestedManyWithoutRolesInput = {
		create?:
			| XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
			| UserCreateWithoutRolesInput[]
			| UserUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| UserCreateOrConnectWithoutRolesInput
			| UserCreateOrConnectWithoutRolesInput[]
		connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
	}

	export type PermissionUpdateManyWithoutRolesNestedInput = {
		create?:
			| XOR<
					PermissionCreateWithoutRolesInput,
					PermissionUncheckedCreateWithoutRolesInput
			  >
			| PermissionCreateWithoutRolesInput[]
			| PermissionUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| PermissionCreateOrConnectWithoutRolesInput
			| PermissionCreateOrConnectWithoutRolesInput[]
		upsert?:
			| PermissionUpsertWithWhereUniqueWithoutRolesInput
			| PermissionUpsertWithWhereUniqueWithoutRolesInput[]
		set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		update?:
			| PermissionUpdateWithWhereUniqueWithoutRolesInput
			| PermissionUpdateWithWhereUniqueWithoutRolesInput[]
		updateMany?:
			| PermissionUpdateManyWithWhereWithoutRolesInput
			| PermissionUpdateManyWithWhereWithoutRolesInput[]
		deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
	}

	export type UserUpdateManyWithoutRolesNestedInput = {
		create?:
			| XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
			| UserCreateWithoutRolesInput[]
			| UserUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| UserCreateOrConnectWithoutRolesInput
			| UserCreateOrConnectWithoutRolesInput[]
		upsert?:
			| UserUpsertWithWhereUniqueWithoutRolesInput
			| UserUpsertWithWhereUniqueWithoutRolesInput[]
		set?: UserWhereUniqueInput | UserWhereUniqueInput[]
		disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
		delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
		connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
		update?:
			| UserUpdateWithWhereUniqueWithoutRolesInput
			| UserUpdateWithWhereUniqueWithoutRolesInput[]
		updateMany?:
			| UserUpdateManyWithWhereWithoutRolesInput
			| UserUpdateManyWithWhereWithoutRolesInput[]
		deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
	}

	export type PermissionUncheckedUpdateManyWithoutRolesNestedInput = {
		create?:
			| XOR<
					PermissionCreateWithoutRolesInput,
					PermissionUncheckedCreateWithoutRolesInput
			  >
			| PermissionCreateWithoutRolesInput[]
			| PermissionUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| PermissionCreateOrConnectWithoutRolesInput
			| PermissionCreateOrConnectWithoutRolesInput[]
		upsert?:
			| PermissionUpsertWithWhereUniqueWithoutRolesInput
			| PermissionUpsertWithWhereUniqueWithoutRolesInput[]
		set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
		update?:
			| PermissionUpdateWithWhereUniqueWithoutRolesInput
			| PermissionUpdateWithWhereUniqueWithoutRolesInput[]
		updateMany?:
			| PermissionUpdateManyWithWhereWithoutRolesInput
			| PermissionUpdateManyWithWhereWithoutRolesInput[]
		deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
	}

	export type UserUncheckedUpdateManyWithoutRolesNestedInput = {
		create?:
			| XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
			| UserCreateWithoutRolesInput[]
			| UserUncheckedCreateWithoutRolesInput[]
		connectOrCreate?:
			| UserCreateOrConnectWithoutRolesInput
			| UserCreateOrConnectWithoutRolesInput[]
		upsert?:
			| UserUpsertWithWhereUniqueWithoutRolesInput
			| UserUpsertWithWhereUniqueWithoutRolesInput[]
		set?: UserWhereUniqueInput | UserWhereUniqueInput[]
		disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
		delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
		connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
		update?:
			| UserUpdateWithWhereUniqueWithoutRolesInput
			| UserUpdateWithWhereUniqueWithoutRolesInput[]
		updateMany?:
			| UserUpdateManyWithWhereWithoutRolesInput
			| UserUpdateManyWithWhereWithoutRolesInput[]
		deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
	}

	export type IntFieldUpdateOperationsInput = {
		set?: number
		increment?: number
		decrement?: number
		multiply?: number
		divide?: number
	}

	export type NullableDateTimeFieldUpdateOperationsInput = {
		set?: Date | string | null
	}

	export type UserCreateNestedOneWithoutConnectionsInput = {
		create?: XOR<
			UserCreateWithoutConnectionsInput,
			UserUncheckedCreateWithoutConnectionsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
		connect?: UserWhereUniqueInput
	}

	export type UserUpdateOneRequiredWithoutConnectionsNestedInput = {
		create?: XOR<
			UserCreateWithoutConnectionsInput,
			UserUncheckedCreateWithoutConnectionsInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
		upsert?: UserUpsertWithoutConnectionsInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutConnectionsInput,
				UserUpdateWithoutConnectionsInput
			>,
			UserUncheckedUpdateWithoutConnectionsInput
		>
	}

	export type UserCreateNestedOneWithoutPasskeyInput = {
		create?: XOR<
			UserCreateWithoutPasskeyInput,
			UserUncheckedCreateWithoutPasskeyInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutPasskeyInput
		connect?: UserWhereUniqueInput
	}

	export type BytesFieldUpdateOperationsInput = {
		set?: Uint8Array
	}

	export type BigIntFieldUpdateOperationsInput = {
		set?: bigint | number
		increment?: bigint | number
		decrement?: bigint | number
		multiply?: bigint | number
		divide?: bigint | number
	}

	export type UserUpdateOneRequiredWithoutPasskeyNestedInput = {
		create?: XOR<
			UserCreateWithoutPasskeyInput,
			UserUncheckedCreateWithoutPasskeyInput
		>
		connectOrCreate?: UserCreateOrConnectWithoutPasskeyInput
		upsert?: UserUpsertWithoutPasskeyInput
		connect?: UserWhereUniqueInput
		update?: XOR<
			XOR<
				UserUpdateToOneWithWhereWithoutPasskeyInput,
				UserUpdateWithoutPasskeyInput
			>,
			UserUncheckedUpdateWithoutPasskeyInput
		>
	}

	export type NestedStringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringFilter<$PrismaModel> | string
	}

	export type NestedStringNullableFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringNullableFilter<$PrismaModel> | string | null
	}

	export type NestedDateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string
	}

	export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>
		in?: string[] | ListStringFieldRefInput<$PrismaModel>
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedStringFilter<$PrismaModel>
		_max?: NestedStringFilter<$PrismaModel>
	}

	export type NestedIntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>
		in?: number[] | ListIntFieldRefInput<$PrismaModel>
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntFilter<$PrismaModel> | number
	}

	export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel> | null
		in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
		lt?: string | StringFieldRefInput<$PrismaModel>
		lte?: string | StringFieldRefInput<$PrismaModel>
		gt?: string | StringFieldRefInput<$PrismaModel>
		gte?: string | StringFieldRefInput<$PrismaModel>
		contains?: string | StringFieldRefInput<$PrismaModel>
		startsWith?: string | StringFieldRefInput<$PrismaModel>
		endsWith?: string | StringFieldRefInput<$PrismaModel>
		not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
		_count?: NestedIntNullableFilter<$PrismaModel>
		_min?: NestedStringNullableFilter<$PrismaModel>
		_max?: NestedStringNullableFilter<$PrismaModel>
	}

	export type NestedIntNullableFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntNullableFilter<$PrismaModel> | number | null
	}

	export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedDateTimeFilter<$PrismaModel>
		_max?: NestedDateTimeFilter<$PrismaModel>
	}

	export type NestedBoolFilter<$PrismaModel = never> = {
		equals?: boolean | BooleanFieldRefInput<$PrismaModel>
		not?: NestedBoolFilter<$PrismaModel> | boolean
	}

	export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
		equals?: boolean | BooleanFieldRefInput<$PrismaModel>
		not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedBoolFilter<$PrismaModel>
		_max?: NestedBoolFilter<$PrismaModel>
	}

	export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
		not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
	}

	export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>
		in?: number[] | ListIntFieldRefInput<$PrismaModel>
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
		lt?: number | IntFieldRefInput<$PrismaModel>
		lte?: number | IntFieldRefInput<$PrismaModel>
		gt?: number | IntFieldRefInput<$PrismaModel>
		gte?: number | IntFieldRefInput<$PrismaModel>
		not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
		_count?: NestedIntFilter<$PrismaModel>
		_avg?: NestedFloatFilter<$PrismaModel>
		_sum?: NestedIntFilter<$PrismaModel>
		_min?: NestedIntFilter<$PrismaModel>
		_max?: NestedIntFilter<$PrismaModel>
	}

	export type NestedFloatFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel>
		in?: number[] | ListFloatFieldRefInput<$PrismaModel>
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
		lt?: number | FloatFieldRefInput<$PrismaModel>
		lte?: number | FloatFieldRefInput<$PrismaModel>
		gt?: number | FloatFieldRefInput<$PrismaModel>
		gte?: number | FloatFieldRefInput<$PrismaModel>
		not?: NestedFloatFilter<$PrismaModel> | number
	}

	export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
		{
			equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
			in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
			notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
			lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
			lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
			gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
			gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
			not?:
				| NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
				| Date
				| string
				| null
			_count?: NestedIntNullableFilter<$PrismaModel>
			_min?: NestedDateTimeNullableFilter<$PrismaModel>
			_max?: NestedDateTimeNullableFilter<$PrismaModel>
		}

	export type NestedBytesFilter<$PrismaModel = never> = {
		equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
		in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		not?: NestedBytesFilter<$PrismaModel> | Uint8Array
	}

	export type NestedBigIntFilter<$PrismaModel = never> = {
		equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		not?: NestedBigIntFilter<$PrismaModel> | bigint | number
	}

	export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Uint8Array | BytesFieldRefInput<$PrismaModel>
		in?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		notIn?: Uint8Array[] | ListBytesFieldRefInput<$PrismaModel>
		not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Uint8Array
		_count?: NestedIntFilter<$PrismaModel>
		_min?: NestedBytesFilter<$PrismaModel>
		_max?: NestedBytesFilter<$PrismaModel>
	}

	export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
		equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
		lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
		not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
		_count?: NestedIntFilter<$PrismaModel>
		_avg?: NestedFloatFilter<$PrismaModel>
		_sum?: NestedBigIntFilter<$PrismaModel>
		_min?: NestedBigIntFilter<$PrismaModel>
		_max?: NestedBigIntFilter<$PrismaModel>
	}

	export type ConnectionCreateWithoutUserInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type ConnectionUncheckedCreateWithoutUserInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type ConnectionCreateOrConnectWithoutUserInput = {
		where: ConnectionWhereUniqueInput
		create: XOR<
			ConnectionCreateWithoutUserInput,
			ConnectionUncheckedCreateWithoutUserInput
		>
	}

	export type ConnectionCreateManyUserInputEnvelope = {
		data: ConnectionCreateManyUserInput | ConnectionCreateManyUserInput[]
		skipDuplicates?: boolean
	}

	export type PasskeyCreateWithoutUserInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
	}

	export type PasskeyUncheckedCreateWithoutUserInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
	}

	export type PasskeyCreateOrConnectWithoutUserInput = {
		where: PasskeyWhereUniqueInput
		create: XOR<
			PasskeyCreateWithoutUserInput,
			PasskeyUncheckedCreateWithoutUserInput
		>
	}

	export type PasskeyCreateManyUserInputEnvelope = {
		data: PasskeyCreateManyUserInput | PasskeyCreateManyUserInput[]
		skipDuplicates?: boolean
	}

	export type PasswordCreateWithoutUserInput = {
		hash: string
		requiredReset?: boolean
	}

	export type PasswordUncheckedCreateWithoutUserInput = {
		hash: string
		requiredReset?: boolean
	}

	export type PasswordCreateOrConnectWithoutUserInput = {
		where: PasswordWhereUniqueInput
		create: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
	}

	export type SessionCreateWithoutUserInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type SessionUncheckedCreateWithoutUserInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type SessionCreateOrConnectWithoutUserInput = {
		where: SessionWhereUniqueInput
		create: XOR<
			SessionCreateWithoutUserInput,
			SessionUncheckedCreateWithoutUserInput
		>
	}

	export type SessionCreateManyUserInputEnvelope = {
		data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
		skipDuplicates?: boolean
	}

	export type UserImageCreateWithoutUserInput = {
		id?: string
		altText?: string | null
		objectKey: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type UserImageUncheckedCreateWithoutUserInput = {
		id?: string
		altText?: string | null
		objectKey: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type UserImageCreateOrConnectWithoutUserInput = {
		where: UserImageWhereUniqueInput
		create: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
	}

	export type RoleCreateWithoutUsersInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		permissions?: PermissionCreateNestedManyWithoutRolesInput
	}

	export type RoleUncheckedCreateWithoutUsersInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
	}

	export type RoleCreateOrConnectWithoutUsersInput = {
		where: RoleWhereUniqueInput
		create: XOR<
			RoleCreateWithoutUsersInput,
			RoleUncheckedCreateWithoutUsersInput
		>
	}

	export type ConnectionUpsertWithWhereUniqueWithoutUserInput = {
		where: ConnectionWhereUniqueInput
		update: XOR<
			ConnectionUpdateWithoutUserInput,
			ConnectionUncheckedUpdateWithoutUserInput
		>
		create: XOR<
			ConnectionCreateWithoutUserInput,
			ConnectionUncheckedCreateWithoutUserInput
		>
	}

	export type ConnectionUpdateWithWhereUniqueWithoutUserInput = {
		where: ConnectionWhereUniqueInput
		data: XOR<
			ConnectionUpdateWithoutUserInput,
			ConnectionUncheckedUpdateWithoutUserInput
		>
	}

	export type ConnectionUpdateManyWithWhereWithoutUserInput = {
		where: ConnectionScalarWhereInput
		data: XOR<
			ConnectionUpdateManyMutationInput,
			ConnectionUncheckedUpdateManyWithoutUserInput
		>
	}

	export type ConnectionScalarWhereInput = {
		AND?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
		OR?: ConnectionScalarWhereInput[]
		NOT?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
		id?: StringFilter<'Connection'> | string
		providerName?: StringFilter<'Connection'> | string
		providerId?: StringFilter<'Connection'> | string
		createdAt?: DateTimeFilter<'Connection'> | Date | string
		updatedAt?: DateTimeFilter<'Connection'> | Date | string
		userId?: StringFilter<'Connection'> | string
	}

	export type PasskeyUpsertWithWhereUniqueWithoutUserInput = {
		where: PasskeyWhereUniqueInput
		update: XOR<
			PasskeyUpdateWithoutUserInput,
			PasskeyUncheckedUpdateWithoutUserInput
		>
		create: XOR<
			PasskeyCreateWithoutUserInput,
			PasskeyUncheckedCreateWithoutUserInput
		>
	}

	export type PasskeyUpdateWithWhereUniqueWithoutUserInput = {
		where: PasskeyWhereUniqueInput
		data: XOR<
			PasskeyUpdateWithoutUserInput,
			PasskeyUncheckedUpdateWithoutUserInput
		>
	}

	export type PasskeyUpdateManyWithWhereWithoutUserInput = {
		where: PasskeyScalarWhereInput
		data: XOR<
			PasskeyUpdateManyMutationInput,
			PasskeyUncheckedUpdateManyWithoutUserInput
		>
	}

	export type PasskeyScalarWhereInput = {
		AND?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
		OR?: PasskeyScalarWhereInput[]
		NOT?: PasskeyScalarWhereInput | PasskeyScalarWhereInput[]
		id?: StringFilter<'Passkey'> | string
		aaguid?: StringFilter<'Passkey'> | string
		createdAt?: DateTimeFilter<'Passkey'> | Date | string
		updatedAt?: DateTimeFilter<'Passkey'> | Date | string
		publicKey?: BytesFilter<'Passkey'> | Uint8Array
		userId?: StringFilter<'Passkey'> | string
		webauthnUserId?: StringFilter<'Passkey'> | string
		counter?: BigIntFilter<'Passkey'> | bigint | number
		deviceType?: StringFilter<'Passkey'> | string
		backedUp?: BoolFilter<'Passkey'> | boolean
		transports?: StringNullableFilter<'Passkey'> | string | null
	}

	export type PasswordUpsertWithoutUserInput = {
		update: XOR<
			PasswordUpdateWithoutUserInput,
			PasswordUncheckedUpdateWithoutUserInput
		>
		create: XOR<
			PasswordCreateWithoutUserInput,
			PasswordUncheckedCreateWithoutUserInput
		>
		where?: PasswordWhereInput
	}

	export type PasswordUpdateToOneWithWhereWithoutUserInput = {
		where?: PasswordWhereInput
		data: XOR<
			PasswordUpdateWithoutUserInput,
			PasswordUncheckedUpdateWithoutUserInput
		>
	}

	export type PasswordUpdateWithoutUserInput = {
		hash?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
	}

	export type PasswordUncheckedUpdateWithoutUserInput = {
		hash?: StringFieldUpdateOperationsInput | string
		requiredReset?: BoolFieldUpdateOperationsInput | boolean
	}

	export type SessionUpsertWithWhereUniqueWithoutUserInput = {
		where: SessionWhereUniqueInput
		update: XOR<
			SessionUpdateWithoutUserInput,
			SessionUncheckedUpdateWithoutUserInput
		>
		create: XOR<
			SessionCreateWithoutUserInput,
			SessionUncheckedCreateWithoutUserInput
		>
	}

	export type SessionUpdateWithWhereUniqueWithoutUserInput = {
		where: SessionWhereUniqueInput
		data: XOR<
			SessionUpdateWithoutUserInput,
			SessionUncheckedUpdateWithoutUserInput
		>
	}

	export type SessionUpdateManyWithWhereWithoutUserInput = {
		where: SessionScalarWhereInput
		data: XOR<
			SessionUpdateManyMutationInput,
			SessionUncheckedUpdateManyWithoutUserInput
		>
	}

	export type SessionScalarWhereInput = {
		AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
		OR?: SessionScalarWhereInput[]
		NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
		id?: StringFilter<'Session'> | string
		expirationDate?: DateTimeFilter<'Session'> | Date | string
		createdAt?: DateTimeFilter<'Session'> | Date | string
		updatedAt?: DateTimeFilter<'Session'> | Date | string
		userId?: StringFilter<'Session'> | string
	}

	export type UserImageUpsertWithoutUserInput = {
		update: XOR<
			UserImageUpdateWithoutUserInput,
			UserImageUncheckedUpdateWithoutUserInput
		>
		create: XOR<
			UserImageCreateWithoutUserInput,
			UserImageUncheckedCreateWithoutUserInput
		>
		where?: UserImageWhereInput
	}

	export type UserImageUpdateToOneWithWhereWithoutUserInput = {
		where?: UserImageWhereInput
		data: XOR<
			UserImageUpdateWithoutUserInput,
			UserImageUncheckedUpdateWithoutUserInput
		>
	}

	export type UserImageUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type UserImageUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		altText?: NullableStringFieldUpdateOperationsInput | string | null
		objectKey?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type RoleUpsertWithWhereUniqueWithoutUsersInput = {
		where: RoleWhereUniqueInput
		update: XOR<
			RoleUpdateWithoutUsersInput,
			RoleUncheckedUpdateWithoutUsersInput
		>
		create: XOR<
			RoleCreateWithoutUsersInput,
			RoleUncheckedCreateWithoutUsersInput
		>
	}

	export type RoleUpdateWithWhereUniqueWithoutUsersInput = {
		where: RoleWhereUniqueInput
		data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
	}

	export type RoleUpdateManyWithWhereWithoutUsersInput = {
		where: RoleScalarWhereInput
		data: XOR<
			RoleUpdateManyMutationInput,
			RoleUncheckedUpdateManyWithoutUsersInput
		>
	}

	export type RoleScalarWhereInput = {
		AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
		OR?: RoleScalarWhereInput[]
		NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
		id?: StringFilter<'Role'> | string
		name?: StringFilter<'Role'> | string
		description?: StringFilter<'Role'> | string
		createdAt?: DateTimeFilter<'Role'> | Date | string
		updatedAt?: DateTimeFilter<'Role'> | Date | string
	}

	export type UserCreateWithoutImageInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateWithoutImageInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserCreateOrConnectWithoutImageInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutImageInput,
			UserUncheckedCreateWithoutImageInput
		>
	}

	export type UserUpsertWithoutImageInput = {
		update: XOR<
			UserUpdateWithoutImageInput,
			UserUncheckedUpdateWithoutImageInput
		>
		create: XOR<
			UserCreateWithoutImageInput,
			UserUncheckedCreateWithoutImageInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutImageInput = {
		where?: UserWhereInput
		data: XOR<UserUpdateWithoutImageInput, UserUncheckedUpdateWithoutImageInput>
	}

	export type UserUpdateWithoutImageInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateWithoutImageInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type UserCreateWithoutPasswordInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateWithoutPasswordInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserCreateOrConnectWithoutPasswordInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutPasswordInput,
			UserUncheckedCreateWithoutPasswordInput
		>
	}

	export type UserUpsertWithoutPasswordInput = {
		update: XOR<
			UserUpdateWithoutPasswordInput,
			UserUncheckedUpdateWithoutPasswordInput
		>
		create: XOR<
			UserCreateWithoutPasswordInput,
			UserUncheckedCreateWithoutPasswordInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutPasswordInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutPasswordInput,
			UserUncheckedUpdateWithoutPasswordInput
		>
	}

	export type UserUpdateWithoutPasswordInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateWithoutPasswordInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type UserCreateWithoutSessionsInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateWithoutSessionsInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserCreateOrConnectWithoutSessionsInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>
	}

	export type UserUpsertWithoutSessionsInput = {
		update: XOR<
			UserUpdateWithoutSessionsInput,
			UserUncheckedUpdateWithoutSessionsInput
		>
		create: XOR<
			UserCreateWithoutSessionsInput,
			UserUncheckedCreateWithoutSessionsInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutSessionsInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutSessionsInput,
			UserUncheckedUpdateWithoutSessionsInput
		>
	}

	export type UserUpdateWithoutSessionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateWithoutSessionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type RoleCreateWithoutPermissionsInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		users?: UserCreateNestedManyWithoutRolesInput
	}

	export type RoleUncheckedCreateWithoutPermissionsInput = {
		id?: string
		name: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
		users?: UserUncheckedCreateNestedManyWithoutRolesInput
	}

	export type RoleCreateOrConnectWithoutPermissionsInput = {
		where: RoleWhereUniqueInput
		create: XOR<
			RoleCreateWithoutPermissionsInput,
			RoleUncheckedCreateWithoutPermissionsInput
		>
	}

	export type RoleUpsertWithWhereUniqueWithoutPermissionsInput = {
		where: RoleWhereUniqueInput
		update: XOR<
			RoleUpdateWithoutPermissionsInput,
			RoleUncheckedUpdateWithoutPermissionsInput
		>
		create: XOR<
			RoleCreateWithoutPermissionsInput,
			RoleUncheckedCreateWithoutPermissionsInput
		>
	}

	export type RoleUpdateWithWhereUniqueWithoutPermissionsInput = {
		where: RoleWhereUniqueInput
		data: XOR<
			RoleUpdateWithoutPermissionsInput,
			RoleUncheckedUpdateWithoutPermissionsInput
		>
	}

	export type RoleUpdateManyWithWhereWithoutPermissionsInput = {
		where: RoleScalarWhereInput
		data: XOR<
			RoleUpdateManyMutationInput,
			RoleUncheckedUpdateManyWithoutPermissionsInput
		>
	}

	export type PermissionCreateWithoutRolesInput = {
		id?: string
		action: string
		entity: string
		access: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type PermissionUncheckedCreateWithoutRolesInput = {
		id?: string
		action: string
		entity: string
		access: string
		description?: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type PermissionCreateOrConnectWithoutRolesInput = {
		where: PermissionWhereUniqueInput
		create: XOR<
			PermissionCreateWithoutRolesInput,
			PermissionUncheckedCreateWithoutRolesInput
		>
	}

	export type UserCreateWithoutRolesInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
	}

	export type UserUncheckedCreateWithoutRolesInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
	}

	export type UserCreateOrConnectWithoutRolesInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutRolesInput,
			UserUncheckedCreateWithoutRolesInput
		>
	}

	export type PermissionUpsertWithWhereUniqueWithoutRolesInput = {
		where: PermissionWhereUniqueInput
		update: XOR<
			PermissionUpdateWithoutRolesInput,
			PermissionUncheckedUpdateWithoutRolesInput
		>
		create: XOR<
			PermissionCreateWithoutRolesInput,
			PermissionUncheckedCreateWithoutRolesInput
		>
	}

	export type PermissionUpdateWithWhereUniqueWithoutRolesInput = {
		where: PermissionWhereUniqueInput
		data: XOR<
			PermissionUpdateWithoutRolesInput,
			PermissionUncheckedUpdateWithoutRolesInput
		>
	}

	export type PermissionUpdateManyWithWhereWithoutRolesInput = {
		where: PermissionScalarWhereInput
		data: XOR<
			PermissionUpdateManyMutationInput,
			PermissionUncheckedUpdateManyWithoutRolesInput
		>
	}

	export type PermissionScalarWhereInput = {
		AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
		OR?: PermissionScalarWhereInput[]
		NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
		id?: StringFilter<'Permission'> | string
		action?: StringFilter<'Permission'> | string
		entity?: StringFilter<'Permission'> | string
		access?: StringFilter<'Permission'> | string
		description?: StringFilter<'Permission'> | string
		createdAt?: DateTimeFilter<'Permission'> | Date | string
		updatedAt?: DateTimeFilter<'Permission'> | Date | string
	}

	export type UserUpsertWithWhereUniqueWithoutRolesInput = {
		where: UserWhereUniqueInput
		update: XOR<
			UserUpdateWithoutRolesInput,
			UserUncheckedUpdateWithoutRolesInput
		>
		create: XOR<
			UserCreateWithoutRolesInput,
			UserUncheckedCreateWithoutRolesInput
		>
	}

	export type UserUpdateWithWhereUniqueWithoutRolesInput = {
		where: UserWhereUniqueInput
		data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
	}

	export type UserUpdateManyWithWhereWithoutRolesInput = {
		where: UserScalarWhereInput
		data: XOR<
			UserUpdateManyMutationInput,
			UserUncheckedUpdateManyWithoutRolesInput
		>
	}

	export type UserScalarWhereInput = {
		AND?: UserScalarWhereInput | UserScalarWhereInput[]
		OR?: UserScalarWhereInput[]
		NOT?: UserScalarWhereInput | UserScalarWhereInput[]
		id?: StringFilter<'User'> | string
		email?: StringFilter<'User'> | string
		username?: StringFilter<'User'> | string
		name?: StringNullableFilter<'User'> | string | null
		createdAt?: DateTimeFilter<'User'> | Date | string
		updatedAt?: DateTimeFilter<'User'> | Date | string
	}

	export type UserCreateWithoutConnectionsInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		passkey?: PasskeyCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateWithoutConnectionsInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		passkey?: PasskeyUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserCreateOrConnectWithoutConnectionsInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutConnectionsInput,
			UserUncheckedCreateWithoutConnectionsInput
		>
	}

	export type UserUpsertWithoutConnectionsInput = {
		update: XOR<
			UserUpdateWithoutConnectionsInput,
			UserUncheckedUpdateWithoutConnectionsInput
		>
		create: XOR<
			UserCreateWithoutConnectionsInput,
			UserUncheckedCreateWithoutConnectionsInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutConnectionsInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutConnectionsInput,
			UserUncheckedUpdateWithoutConnectionsInput
		>
	}

	export type UserUpdateWithoutConnectionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateWithoutConnectionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type UserCreateWithoutPasskeyInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionCreateNestedManyWithoutUserInput
		password?: PasswordCreateNestedOneWithoutUserInput
		sessions?: SessionCreateNestedManyWithoutUserInput
		image?: UserImageCreateNestedOneWithoutUserInput
		roles?: RoleCreateNestedManyWithoutUsersInput
	}

	export type UserUncheckedCreateWithoutPasskeyInput = {
		id?: string
		email: string
		username: string
		name?: string | null
		createdAt?: Date | string
		updatedAt?: Date | string
		connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
		password?: PasswordUncheckedCreateNestedOneWithoutUserInput
		sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
		image?: UserImageUncheckedCreateNestedOneWithoutUserInput
		roles?: RoleUncheckedCreateNestedManyWithoutUsersInput
	}

	export type UserCreateOrConnectWithoutPasskeyInput = {
		where: UserWhereUniqueInput
		create: XOR<
			UserCreateWithoutPasskeyInput,
			UserUncheckedCreateWithoutPasskeyInput
		>
	}

	export type UserUpsertWithoutPasskeyInput = {
		update: XOR<
			UserUpdateWithoutPasskeyInput,
			UserUncheckedUpdateWithoutPasskeyInput
		>
		create: XOR<
			UserCreateWithoutPasskeyInput,
			UserUncheckedCreateWithoutPasskeyInput
		>
		where?: UserWhereInput
	}

	export type UserUpdateToOneWithWhereWithoutPasskeyInput = {
		where?: UserWhereInput
		data: XOR<
			UserUpdateWithoutPasskeyInput,
			UserUncheckedUpdateWithoutPasskeyInput
		>
	}

	export type UserUpdateWithoutPasskeyInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
		roles?: RoleUpdateManyWithoutUsersNestedInput
	}

	export type UserUncheckedUpdateWithoutPasskeyInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
		roles?: RoleUncheckedUpdateManyWithoutUsersNestedInput
	}

	export type ConnectionCreateManyUserInput = {
		id?: string
		providerName: string
		providerId: string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type PasskeyCreateManyUserInput = {
		id: string
		aaguid: string
		createdAt?: Date | string
		updatedAt?: Date | string
		publicKey: Uint8Array
		webauthnUserId: string
		counter: bigint | number
		deviceType: string
		backedUp: boolean
		transports?: string | null
	}

	export type SessionCreateManyUserInput = {
		id?: string
		expirationDate: Date | string
		createdAt?: Date | string
		updatedAt?: Date | string
	}

	export type ConnectionUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type ConnectionUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type ConnectionUncheckedUpdateManyWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		providerName?: StringFieldUpdateOperationsInput | string
		providerId?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type PasskeyUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type PasskeyUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type PasskeyUncheckedUpdateManyWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		aaguid?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		publicKey?: BytesFieldUpdateOperationsInput | Uint8Array
		webauthnUserId?: StringFieldUpdateOperationsInput | string
		counter?: BigIntFieldUpdateOperationsInput | bigint | number
		deviceType?: StringFieldUpdateOperationsInput | string
		backedUp?: BoolFieldUpdateOperationsInput | boolean
		transports?: NullableStringFieldUpdateOperationsInput | string | null
	}

	export type SessionUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type SessionUncheckedUpdateWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type SessionUncheckedUpdateManyWithoutUserInput = {
		id?: StringFieldUpdateOperationsInput | string
		expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type RoleUpdateWithoutUsersInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		permissions?: PermissionUpdateManyWithoutRolesNestedInput
	}

	export type RoleUncheckedUpdateWithoutUsersInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
	}

	export type RoleUncheckedUpdateManyWithoutUsersInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type RoleUpdateWithoutPermissionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		users?: UserUpdateManyWithoutRolesNestedInput
	}

	export type RoleUncheckedUpdateWithoutPermissionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		users?: UserUncheckedUpdateManyWithoutRolesNestedInput
	}

	export type RoleUncheckedUpdateManyWithoutPermissionsInput = {
		id?: StringFieldUpdateOperationsInput | string
		name?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type PermissionUpdateWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type PermissionUncheckedUpdateWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type PermissionUncheckedUpdateManyWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		action?: StringFieldUpdateOperationsInput | string
		entity?: StringFieldUpdateOperationsInput | string
		access?: StringFieldUpdateOperationsInput | string
		description?: StringFieldUpdateOperationsInput | string
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	export type UserUpdateWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUpdateManyWithoutUserNestedInput
		password?: PasswordUpdateOneWithoutUserNestedInput
		sessions?: SessionUpdateManyWithoutUserNestedInput
		image?: UserImageUpdateOneWithoutUserNestedInput
	}

	export type UserUncheckedUpdateWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
		connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
		passkey?: PasskeyUncheckedUpdateManyWithoutUserNestedInput
		password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
		sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
		image?: UserImageUncheckedUpdateOneWithoutUserNestedInput
	}

	export type UserUncheckedUpdateManyWithoutRolesInput = {
		id?: StringFieldUpdateOperationsInput | string
		email?: StringFieldUpdateOperationsInput | string
		username?: StringFieldUpdateOperationsInput | string
		name?: NullableStringFieldUpdateOperationsInput | string | null
		createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
		updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
	}

	/**
	 * Batch Payload for updateMany & deleteMany & createMany
	 */

	export type BatchPayload = {
		count: number
	}
}
