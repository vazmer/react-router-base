-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "altText" TEXT,
    "objectKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "digits" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "charSet" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passkey" (
    "id" TEXT NOT NULL,
    "aaguid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publicKey" BYTEA NOT NULL,
    "userId" TEXT NOT NULL,
    "webauthnUserId" TEXT NOT NULL,
    "counter" BIGINT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "backedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Passkey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PermissionToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoleToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_entity_access_key" ON "Permission"("action", "entity", "access");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_target_type_key" ON "Verification"("target", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_providerName_providerId_key" ON "Connection"("providerName", "providerId");

-- CreateIndex
CREATE INDEX "Passkey_userId_idx" ON "Passkey"("userId");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passkey" ADD CONSTRAINT "Passkey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO public."User" (id, email, username, name, "createdAt", "updatedAt") VALUES ('cm7yvjrsz000artfid5bohs96', 'vazmer@gmail.com', 'admin', 'Bojan Vazmer', '2025-03-07 14:32:07.044', '2025-03-07 14:32:07.044');

INSERT INTO public."Password" (hash, "userId") VALUES ('$2b$10$2k7sRYxFuxDel0Hnt3tO/.I8pEo9II74xDkdKlkCgYGmy1qvu3coS', 'cm7yvjrsz000artfid5bohs96');

INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpo0000rtfiguzgjgj3', 'create', 'user', 'own', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0001rtfi5qwiqjf5', 'create', 'user', 'any', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0002rtfihslisd9n', 'read', 'user', 'own', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0003rtfi96tfc8st', 'read', 'user', 'any', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0004rtfinu3tbr80', 'update', 'user', 'own', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0005rtfi2n2bhe4d', 'update', 'user', 'any', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0006rtfijgd8x87d', 'delete', 'user', 'own', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');
INSERT INTO public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") VALUES ('cm7yvjrpp0007rtfilkz74il3', 'delete', 'user', 'any', '', '2025-03-07 14:32:06.924', '2025-03-07 14:32:06.924');

INSERT INTO public."Role" (id, name, description, "createdAt", "updatedAt") VALUES ('cm7yvjrq70008rtfi8y60fx4p', 'admin', '', '2025-03-07 14:32:06.944', '2025-03-07 14:32:06.944');
INSERT INTO public."Role" (id, name, description, "createdAt", "updatedAt") VALUES ('cm7yvjrqf0009rtfipe8q8xos', 'user', '', '2025-03-07 14:32:06.951', '2025-03-07 14:32:06.951');

INSERT INTO public."Session" (id, "expirationDate", "createdAt", "updatedAt", "userId") VALUES ('cm7yvjvlr0005rtqe51oqylql', '2025-04-06 14:32:11.966', '2025-03-07 14:32:11.967', '2025-03-07 14:32:11.967', 'cm7yvjrsz000artfid5bohs96');

INSERT INTO public."UserImage" (id, "altText", "objectKey", "createdAt", "updatedAt", "userId") VALUES ('cm7yvjrtb000crtfi10n7vutq', NULL, 'user/6.jpg', '2025-03-07 14:32:07.056', '2025-03-07 14:32:07.056', 'cm7yvjrsz000artfid5bohs96');

INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0001rtfi5qwiqjf5', 'cm7yvjrq70008rtfi8y60fx4p');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0003rtfi96tfc8st', 'cm7yvjrq70008rtfi8y60fx4p');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0005rtfi2n2bhe4d', 'cm7yvjrq70008rtfi8y60fx4p');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0007rtfilkz74il3', 'cm7yvjrq70008rtfi8y60fx4p');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpo0000rtfiguzgjgj3', 'cm7yvjrqf0009rtfipe8q8xos');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0002rtfihslisd9n', 'cm7yvjrqf0009rtfipe8q8xos');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0004rtfinu3tbr80', 'cm7yvjrqf0009rtfipe8q8xos');
INSERT INTO public."_PermissionToRole" ("A", "B") VALUES ('cm7yvjrpp0006rtfijgd8x87d', 'cm7yvjrqf0009rtfipe8q8xos');

INSERT INTO public."_RoleToUser" ("A", "B") VALUES ('cm7yvjrq70008rtfi8y60fx4p', 'cm7yvjrsz000artfid5bohs96');
INSERT INTO public."_RoleToUser" ("A", "B") VALUES ('cm7yvjrqf0009rtfipe8q8xos', 'cm7yvjrsz000artfid5bohs96');
