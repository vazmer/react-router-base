-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");

INSERT INTO "Tenant" (id, name) VALUES ('default', 'Default');
INSERT INTO "Tenant" (id, name) VALUES ('demo', 'Demo');

SELECT set_config('app.current_tenant_id', 'default', TRUE);

-- AlterTable
ALTER TABLE "User" ADD COLUMN "tenantId" TEXT NOT NULL DEFAULT (current_setting('app.current_tenant_id'::text));

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Enable Row Level Security
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

-- Create row security policies
CREATE POLICY tenant_isolation_policy ON "User" USING ("tenantId" = current_setting('app.current_tenant_id', TRUE));

-- Create policies to bypass RLS (optional)
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
