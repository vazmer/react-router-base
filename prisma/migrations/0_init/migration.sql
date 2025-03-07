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

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, username, name, "createdAt", "updatedAt") FROM stdin;
cm7yne1sq000artve0wlq52te       ym_joanny_auer@example.com      ym_joanny_auer  Joanny Auer     2025-03-07 10:43:43.13  2025-03-07 10:43:43.13
cm7yne1uw000drtvejkwht637       mp_nels_botsford48@example.com  mp_nels_botsford48      Nels Botsford   2025-03-07 10:43:43.209 2025-03-07 10:43:43.209
cm7yne1wz000grtve9gi8517t       5i_theodore_steuber@example.com 5i_theodore_steuber     Theodore Steuber        2025-03-07 10:43:43.284 2025-03-07 10:43:43.284
cm7yne1z2000jrtvexaf9i9z8       10_zula_trantow76@example.com   10_zula_trantow76       Zula Trantow    2025-03-07 10:43:43.358 2025-03-07 10:43:43.358
cm7yne214000mrtvel13vfx42       r7_craig_ebert@example.com      r7_craig_ebert  Craig Ebert     2025-03-07 10:43:43.433 2025-03-07 10:43:43.433
cm7yne237000prtvesvno9ad7       vazmer@gmail.com        admin   Bojan Vazmer    2025-03-07 10:43:43.508 2025-03-07 10:43:43.508
\.


--
-- Data for Name: Connection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Connection" (id, "providerName", "providerId", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: Passkey; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Passkey" (id, aaguid, "createdAt", "updatedAt", "publicKey", "userId", "webauthnUserId", counter, "deviceType", "backedUp", transports) FROM stdin;
\.


--
-- Data for Name: Password; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Password" (hash, "userId") FROM stdin;
$2b$10$WPQ2y33haOVqzV6wc0A7beTATzrr7UCh2XFJx3aX.owhC7wLd50Fu    cm7yne1sq000artve0wlq52te
$2b$10$rLxFkoNRjZEInQ54VT8B6OJELQ9szPqqyBhGebWuOztlscTdZzOfG    cm7yne1uw000drtvejkwht637
$2b$10$4Rmyu9LrnrbXgUt1cTsPTeF4Bn1n19DEFBj4Uo5STZcrzjwIzynKO    cm7yne1wz000grtve9gi8517t
$2b$10$q4Hno0HxUAKWVQhGCyTUCeXqS.6tEyZ1.SkQLwh5rf4J5CyZiz6SK    cm7yne1z2000jrtvexaf9i9z8
$2b$10$2Df25rQChl1Ehic1FtZWW.9IU7OonO/V10qP8/5/3Wfup3aEf1KI.    cm7yne214000mrtvel13vfx42
$2b$10$eB8fFgS8TDtVFcczHIikHeYkjYgijwgklywF06mlxTwxgJA2.VSYy    cm7yne237000prtvesvno9ad7
\.


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Permission" (id, action, entity, access, description, "createdAt", "updatedAt") FROM stdin;
cm7yne1pg0000rtvelw7uj8p6       create  user    own             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
cm7yne1pg0001rtveyvqozqxw       create  user    any             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
cm7yne1pg0002rtvecxljhcbc       read    user    own             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
cm7yne1pg0003rtvehdwq9u2i       read    user    any             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
cm7yne1ph0004rtveyup60p8c       update  user    own             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
                                                                                                                    cm7yne1ph0005rtvepmksnkka       update  user    any             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
                                                                                                                                                        cm7yne1ph0006rtve6vpt45dm       delete  user    own             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
cm7yne1ph0007rtvexjo914ss       delete  user    any             2025-03-07 10:43:43.012 2025-03-07 10:43:43.012
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, name, description, "createdAt", "updatedAt") FROM stdin;
cm7yne1pz0008rtveber35xf1       admin           2025-03-07 10:43:43.031 2025-03-07 10:43:43.031
cm7yne1q60009rtvedo0ust9g       user            2025-03-07 10:43:43.038 2025-03-07 10:43:43.038
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "expirationDate", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: UserImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserImage" (id, "altText", "objectKey", "createdAt", "updatedAt", "userId") FROM stdin;
cm7yne1sy000crtve2uew1kmf       \N      user/0.jpg      2025-03-07 10:43:43.139 2025-03-07 10:43:43.139 cm7yne1sq000artve0wlq52te
cm7yne1v1000frtvegp0tz3nt       \N      user/1.jpg      2025-03-07 10:43:43.213 2025-03-07 10:43:43.213 cm7yne1uw000drtvejkwht637
cm7yne1x3000irtvewjyzpiz3       \N      user/2.jpg      2025-03-07 10:43:43.288 2025-03-07 10:43:43.288 cm7yne1wz000grtve9gi8517t
cm7yne1z6000lrtvez4u6f21p       \N      user/3.jpg      2025-03-07 10:43:43.362 2025-03-07 10:43:43.362 cm7yne1z2000jrtvexaf9i9z8
cm7yne219000ortveswfiuel8       \N      user/4.jpg      2025-03-07 10:43:43.437 2025-03-07 10:43:43.437 cm7yne214000mrtvel13vfx42
cm7yne23d000rrtve287xgdv2       \N      user/6.jpg      2025-03-07 10:43:43.514 2025-03-07 10:43:43.514 cm7yne237000prtvesvno9ad7
\.


--
-- Data for Name: Verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Verification" (id, "createdAt", type, target, secret, algorithm, digits, period, "charSet", "expiresAt") FROM stdin;
\.


--
-- Data for Name: _PermissionToRole; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_PermissionToRole" ("A", "B") FROM stdin;
cm7yne1pg0001rtveyvqozqxw       cm7yne1pz0008rtveber35xf1
cm7yne1pg0003rtvehdwq9u2i       cm7yne1pz0008rtveber35xf1
cm7yne1ph0005rtvepmksnkka       cm7yne1pz0008rtveber35xf1
cm7yne1ph0007rtvexjo914ss       cm7yne1pz0008rtveber35xf1
cm7yne1pg0000rtvelw7uj8p6       cm7yne1q60009rtvedo0ust9g
cm7yne1pg0002rtvecxljhcbc       cm7yne1q60009rtvedo0ust9g
cm7yne1ph0004rtveyup60p8c       cm7yne1q60009rtvedo0ust9g
cm7yne1ph0006rtve6vpt45dm       cm7yne1q60009rtvedo0ust9g
\.


--
-- Data for Name: _RoleToUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_RoleToUser" ("A", "B") FROM stdin;
cm7yne1q60009rtvedo0ust9g       cm7yne1sq000artve0wlq52te
cm7yne1q60009rtvedo0ust9g       cm7yne1uw000drtvejkwht637
cm7yne1q60009rtvedo0ust9g       cm7yne1wz000grtve9gi8517t
cm7yne1q60009rtvedo0ust9g       cm7yne1z2000jrtvexaf9i9z8
cm7yne1q60009rtvedo0ust9g       cm7yne214000mrtvel13vfx42
cm7yne1pz0008rtveber35xf1       cm7yne237000prtvesvno9ad7
cm7yne1q60009rtvedo0ust9g       cm7yne237000prtvesvno9ad7
\.


--
-- PostgreSQL database dump complete
--

