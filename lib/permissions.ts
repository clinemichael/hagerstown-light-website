export type PortalRole =
  | "Employee"
  | "Supervisor"
  | "Administrator";

/*
 * ================================
 * BASIC PORTAL ACCESS
 * ================================
 */

export function canViewDashboard(
  role: PortalRole
) {
  return true;
}

export function canViewOperations(
  role: PortalRole
) {
  return true;
}

export function canViewEmployees(
  role: PortalRole
) {
  return true;
}

export function canViewFleet(
  role: PortalRole
) {
  return true;
}

export function canViewDocuments(
  role: PortalRole
) {
  return true;
}

export function canViewSafety(
  role: PortalRole
) {
  return true;
}

export function canViewEngineering(
  role: PortalRole
) {
  return true;
}

export function canViewReports(
  role: PortalRole
) {
  return true;
}

/*
 * ================================
 * OPERATIONS / SCHEDULING
 * ================================
 */

export function canManageOperations(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

export function canManageScheduling(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

export function canManageCrews(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

export function canManageFleet(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

export function canManageEmployees(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

/*
 * ================================
 * ADMINISTRATION
 * ================================
 *
 * Supervisors can access the
 * administrative management areas
 * for employees, crews, and fleet.
 *
 * Portal Accounts are restricted
 * to Administrators.
 */

export function canAccessAdmin(
  role: PortalRole
) {
  return (
    role === "Supervisor" ||
    role === "Administrator"
  );
}

export function canManagePortalAccounts(
  role: PortalRole
) {
  return role === "Administrator";
}

/*
 * ================================
 * ROLE MANAGEMENT
 * ================================
 *
 * Only Administrators can change
 * portal account roles.
 */

export function canAssignRole(
  currentRole: PortalRole,
  newRole: PortalRole
) {
  if (currentRole !== "Administrator") {
    return false;
  }

  return (
    newRole === "Employee" ||
    newRole === "Supervisor" ||
    newRole === "Administrator"
  );
}

/*
 * ================================
 * ADMINISTRATOR
 * ================================
 */

export function isAdministrator(
  role: PortalRole
) {
  return role === "Administrator";
}