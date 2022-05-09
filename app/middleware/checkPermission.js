const { getUserByEmail, getUserWithPermission } = require("../models1/User");

const permissions = {
  READ: 2,
  DELETE: 1,
  WRITE: 4,
  UPDATE: 16,
  EXECUTE: 8,
};

const permissonSets = {
  APP_READ: { code: "APP", value: permissions.READ },
  APP_WRITE: { code: "APP", value: permissions.WRITE },
  APP_UPDATE: { code: "APP", value: permissions.UPDATE },
  APP_DELETE: { code: "APP", value: permissions.DELETE },

  PAT_READ: { code: "PAT", value: permissions.READ },
  PAT_WRITE: { code: "PAT", value: permissions.WRITE },
  PAT_UPDATE: { code: "PAT", value: permissions.UPDATE },
  PAT_DELETE: { code: "PAT", value: permissions.DELETE },

  DSB_READ: { code: "DSB", value: permissions.READ },
  DSB_WRITE: { code: "DSB", value: permissions.WRITE },
  DSB_UPDATE: { code: "DSB", value: permissions.UPDATE },
  DSB_DELETE: { code: "DSB", value: permissions.DELETE },

  REF_READ: { code: "REF", value: permissions.READ },
  REF_WRITE: { code: "REF", value: permissions.WRITE },
  REF_UPDATE: { code: "REF", value: permissions.UPDATE },
  REF_DELETE: { code: "REF", value: permissions.DELETE },
};

const checkPermission = (permissionSet) => {
  return async (req, res, next) => {
    const { user } = req;
    const { code: entityCode, value: requiredPermissionValue } = permissionSet;
    let permissionResult = await getUserWithPermission(user.email, entityCode);
    if (!permissionResult[0]) {
      return res.status(403).send("Forbidden");
    }
    if (requiredPermissionValue & permissionResult[0].permission_level) {
      return next();
    } else {
      return res.status(403).send("Forbidden");
    }
  };
};

module.exports = {
  permissonSets,
  checkPermission,
};
