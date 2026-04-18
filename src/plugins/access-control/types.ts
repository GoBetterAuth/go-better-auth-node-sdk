import { z } from "zod";

import type { User } from "@/types";

export const roleSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string().nullish(),
  weight: z.number(),
  isSystem: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Role = z.infer<typeof roleSchema>;

export const permissionSchema = z.object({
  id: z.string().nonempty(),
  key: z.string().nonempty(),
  description: z.string().nullish(),
  isSystem: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type Permission = z.infer<typeof permissionSchema>;

export const permissionGrantSourceSchema = z.object({
  roleId: z.string().nonempty(),
  roleName: z.string().nonempty(),
  grantedByUserId: z.string().nullish(),
  grantedAt: z.iso.datetime().nullish(),
});
export type PermissionGrantSource = z.infer<typeof permissionGrantSourceSchema>;

export const userPermissionInfoSchema = z.object({
  permissionId: z.string().nonempty(),
  permissionKey: z.string().nonempty(),
  permissionDescription: z.string().nullish(),
  grantedByUserId: z.string().nullish(),
  grantedAt: z.iso.datetime().nullish(),
  sources: z.array(permissionGrantSourceSchema).optional(),
});
export type UserPermissionInfo = z.infer<typeof userPermissionInfoSchema>;

export const userRoleInfoSchema = z.object({
  roleId: z.string().nonempty(),
  roleName: z.string().nonempty(),
  roleDescription: z.string().nullish(),
  assignedByUserId: z.string().nullish(),
  assignedAt: z.iso.datetime().nullish(),
  expiresAt: z.iso.datetime().nullish(),
});
export type UserRoleInfo = z.infer<typeof userRoleInfoSchema>;

export const roleDetailsSchema = z.object({
  role: roleSchema,
  permissions: z.array(userPermissionInfoSchema),
});
export type RoleDetails = z.infer<typeof roleDetailsSchema>;

export const getUserPermissionsResponseSchema = z.object({
  permissions: z.array(userPermissionInfoSchema),
});
export type GetUserPermissionsResponse = z.infer<
  typeof getUserPermissionsResponseSchema
>;

export const checkUserPermissionsResponseSchema = z.object({
  hasPermissions: z.boolean(),
});
export type CheckUserPermissionsResponse = z.infer<
  typeof checkUserPermissionsResponseSchema
>;

export type CreateRoleRequest = {
  name: string;
  description?: string | null;
  weight?: number;
  isSystem?: boolean;
};

export type CreateRoleResponse = {
  role: Role;
};

export type UpdateRoleRequest = {
  name?: string | null;
  description?: string | null;
  weight?: number;
};

export type UpdateRoleResponse = {
  role: Role;
};

export type DeleteRoleResponse = {
  message: string;
};

export type CreatePermissionRequest = {
  key: string;
  description?: string | null;
  isSystem?: boolean;
};

export type CreatePermissionResponse = {
  permission: Permission;
};

export type UpdatePermissionRequest = {
  description?: string | null;
};

export type UpdatePermissionResponse = {
  permission: Permission;
};

export type DeletePermissionResponse = {
  message: string;
};

export type AddRolePermissionRequest = {
  permissionId: string;
};

export type AddRolePermissionResponse = {
  message: string;
};

export type ReplaceRolePermissionsRequest = {
  permissionIds: string[];
};

export type ReplaceRolePermissionResponse = {
  message: string;
};

export type RemoveRolePermissionResponse = {
  message: string;
};

export type AssignUserRoleRequest = {
  roleId: string;
  expiresAt?: string | null;
};

export type ReplaceUserRolesRequest = {
  roleIds: string[];
};

export type ReplaceUserRolesResponse = {
  message: string;
};

export type AssignUserRoleResponse = {
  message: string;
};

export type RemoveUserRoleResponse = {
  message: string;
};

export type CheckUserPermissionsRequest = {
  permissionKeys: string[];
};

export type UserWithPermissions = {
  user: User;
  permissions: UserPermissionInfo[];
};

export type UserAuthorizationProfile = {
  user: User;
  roles: UserRoleInfo[];
  permissions: UserPermissionInfo[];
};

export type UserWithRoles = {
  user: User;
  roles: UserRoleInfo[];
};
