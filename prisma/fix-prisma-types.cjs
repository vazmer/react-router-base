const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'generated/client.ts')

let content = fs.readFileSync(filePath, 'utf8')

content = content.replace(
	/config.runtimeDataModel = JSON\.parse\(/g,
	'// @ts-ignore\nconfig.runtimeDataModel = JSON\.parse\(',
)

fs.writeFileSync(filePath, content)

console.log('✅ Prisma types have been successfully modified.')
