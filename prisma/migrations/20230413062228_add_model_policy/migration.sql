/*
  Warnings:

  - You are about to drop the `_PermissionAdminRoleRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionAdminRoleRelation" DROP CONSTRAINT "_PermissionAdminRoleRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionAdminRoleRelation" DROP CONSTRAINT "_PermissionAdminRoleRelation_B_fkey";

-- DropTable
DROP TABLE "_PermissionAdminRoleRelation";

-- CreateTable
CREATE TABLE "AdminPolicy" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "version" VARCHAR(100),
    "statements" JSONB,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "updatedById" UUID,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMPTZ,
    "deletedById" UUID,
    "deletedBy" TEXT,

    CONSTRAINT "AdminPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionRoleRelation" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UserPolicyRelation" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_RolePolicyRelation" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminPolicy_name_key" ON "AdminPolicy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionRoleRelation_AB_unique" ON "_PermissionRoleRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionRoleRelation_B_index" ON "_PermissionRoleRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserPolicyRelation_AB_unique" ON "_UserPolicyRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_UserPolicyRelation_B_index" ON "_UserPolicyRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RolePolicyRelation_AB_unique" ON "_RolePolicyRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_RolePolicyRelation_B_index" ON "_RolePolicyRelation"("B");

-- AddForeignKey
ALTER TABLE "_PermissionRoleRelation" ADD CONSTRAINT "_PermissionRoleRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "AdminPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionRoleRelation" ADD CONSTRAINT "_PermissionRoleRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "AdminRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPolicyRelation" ADD CONSTRAINT "_UserPolicyRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "AdminPolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPolicyRelation" ADD CONSTRAINT "_UserPolicyRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePolicyRelation" ADD CONSTRAINT "_RolePolicyRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "AdminPolicy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePolicyRelation" ADD CONSTRAINT "_RolePolicyRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "AdminRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
