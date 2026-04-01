import type { AuthulaClient } from "@/client";
import { wrappedFetch } from "@/fetch";
import type { Plugin } from "@/types";
import type {
  AddRolePermissionRequest,
  AddRolePermissionResponse,
  AssignUserRoleRequest,
  AssignUserRoleResponse,
  CheckUserPermissionsRequest,
  CheckUserPermissionsResponse,
  CreatePermissionRequest,
  CreatePermissionResponse,
  CreateRoleRequest,
  CreateRoleResponse,
  DeletePermissionResponse,
  DeleteRoleResponse,
  GetUserPermissionsResponse,
  RoleDetails,
  Permission,
  UserPermissionInfo,
  UserRoleInfo,
  RemoveRolePermissionResponse,
  RemoveUserRoleResponse,
  ReplaceRolePermissionResponse,
  ReplaceRolePermissionsRequest,
  ReplaceUserRolesRequest,
  ReplaceUserRolesResponse,
  Role,
  UpdatePermissionRequest,
  UpdatePermissionResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from "./types";

export class AccessControlPlugin implements Plugin {
  public readonly id = "accessControl";

  constructor() {}

  public init(client: AuthulaClient) {
    return {
      // Roles
      createRole: async (
        data: CreateRoleRequest,
      ): Promise<CreateRoleResponse> => {
        return wrappedFetch(client, `/access-control/roles`, {
          method: "POST",
          body: data,
        });
      },
      getAllRoles: async (): Promise<Role[]> => {
        return wrappedFetch(client, `/access-control/roles`, {
          method: "GET",
        });
      },
      getRoleByName: async (roleName: string): Promise<Role> => {
        return wrappedFetch(
          client,
          `/access-control/roles/by-name/${roleName}`,
          {
            method: "GET",
          },
        );
      },
      getRoleById: async (roleId: string): Promise<RoleDetails> => {
        return wrappedFetch(client, `/access-control/roles/${roleId}`, {
          method: "GET",
        });
      },
      updateRole: async (
        roleId: string,
        data: UpdateRoleRequest,
      ): Promise<UpdateRoleResponse> => {
        return wrappedFetch(client, `/access-control/roles/${roleId}`, {
          method: "PATCH",
          body: data,
        });
      },
      deleteRole: async (roleId: string): Promise<DeleteRoleResponse> => {
        return wrappedFetch(client, `/access-control/roles/${roleId}`, {
          method: "DELETE",
        });
      },

      // Permissions
      createPermission: async (
        data: CreatePermissionRequest,
      ): Promise<CreatePermissionResponse> => {
        return wrappedFetch(client, `/access-control/permissions`, {
          method: "POST",
          body: data,
        });
      },
      getAllPermissions: async (): Promise<Permission[]> => {
        return wrappedFetch(client, `/access-control/permissions`, {
          method: "GET",
        });
      },
      getPermissionById: async (permissionId: string): Promise<Permission> => {
        return wrappedFetch(
          client,
          `/access-control/permissions/${permissionId}`,
          {
            method: "GET",
          },
        );
      },
      updatePermission: async (
        permissionId: string,
        data: UpdatePermissionRequest,
      ): Promise<UpdatePermissionResponse> => {
        return wrappedFetch(
          client,
          `/access-control/permissions/${permissionId}`,
          {
            method: "PATCH",
            body: data,
          },
        );
      },
      deletePermission: async (
        permissionId: string,
      ): Promise<DeletePermissionResponse> => {
        return wrappedFetch(
          client,
          `/access-control/permissions/${permissionId}`,
          {
            method: "DELETE",
          },
        );
      },

      // Role Permissions
      addRolePermission: async (
        roleId: string,
        data: AddRolePermissionRequest,
      ): Promise<AddRolePermissionResponse> => {
        return wrappedFetch(
          client,
          `/access-control/roles/${roleId}/permissions`,
          {
            method: "POST",
            body: data,
          },
        );
      },
      getRolePermissions: async (
        roleId: string,
      ): Promise<UserPermissionInfo[]> => {
        return wrappedFetch(
          client,
          `/access-control/roles/${roleId}/permissions`,
          {
            method: "GET",
          },
        );
      },
      replaceRolePermissions: async (
        roleId: string,
        data: ReplaceRolePermissionsRequest,
      ): Promise<ReplaceRolePermissionResponse> => {
        return wrappedFetch(
          client,
          `/access-control/roles/${roleId}/permissions`,
          {
            method: "PUT",
            body: data,
          },
        );
      },
      removeRolePermission: async (
        roleId: string,
        permissionId: string,
      ): Promise<RemoveRolePermissionResponse> => {
        return wrappedFetch(
          client,
          `/access-control/roles/${roleId}/permissions/${permissionId}`,
          {
            method: "DELETE",
          },
        );
      },

      // User Roles
      getUserRoles: async (userId: string): Promise<UserRoleInfo[]> => {
        return wrappedFetch(client, `/access-control/users/${userId}/roles`, {
          method: "GET",
        });
      },
      assignUserRole: async (
        userId: string,
        data: AssignUserRoleRequest,
      ): Promise<AssignUserRoleResponse> => {
        return wrappedFetch(client, `/access-control/users/${userId}/roles`, {
          method: "POST",
          body: data,
        });
      },
      replaceUserRoles: async (
        userId: string,
        data: ReplaceUserRolesRequest,
      ): Promise<ReplaceUserRolesResponse> => {
        return wrappedFetch(client, `/access-control/users/${userId}/roles`, {
          method: "PUT",
          body: data,
        });
      },
      removeUserRole: async (
        userId: string,
        roleId: string,
      ): Promise<RemoveUserRoleResponse> => {
        return wrappedFetch(
          client,
          `/access-control/users/${userId}/roles/${roleId}`,
          {
            method: "DELETE",
          },
        );
      },

      // User Permissions
      getUserPermissions: async (
        userId: string,
      ): Promise<GetUserPermissionsResponse> => {
        return wrappedFetch(
          client,
          `/access-control/users/${userId}/permissions`,
          {
            method: "GET",
          },
        );
      },
      checkUserPermissions: async (
        userId: string,
        data: CheckUserPermissionsRequest,
      ): Promise<CheckUserPermissionsResponse> => {
        return wrappedFetch(
          client,
          `/access-control/users/${userId}/permissions/check`,
          {
            method: "POST",
            body: data,
          },
        );
      },
    };
  }
}
