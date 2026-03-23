const getProvidedKey = (req) => {
  const headerKey = req.header('x-admin-key');
  const authHeader = req.header('authorization') || '';
  const bearerKey = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : null;

  return (headerKey || bearerKey || '').trim();
};

const resolvePanelRole = (providedKey) => {
  const adminKey = (process.env.ADMIN_INBOX_KEY || '').trim();
  const moderatorKey = (process.env.MODERATOR_INBOX_KEY || '').trim();

  if (!adminKey && !moderatorKey) {
    return { role: null, configured: false };
  }

  if (adminKey && providedKey === adminKey) {
    return { role: 'admin', configured: true };
  }

  if (moderatorKey && providedKey === moderatorKey) {
    return { role: 'moderator', configured: true };
  }

  return { role: null, configured: true };
};

const requirePanelAccess = (req, res, next) => {
  const providedKey = getProvidedKey(req);
  const { role, configured } = resolvePanelRole(providedKey);

  if (!configured) {
    return res.status(503).json({
      message: 'Admin panel is not configured yet.',
    });
  }

  if (!role) {
    return res.status(401).json({ message: 'Unauthorized panel access.' });
  }

  req.panelRole = role;
  res.set('x-panel-role', role);
  return next();
};

const requireAdminKey = (req, res, next) => {
  const providedKey = getProvidedKey(req);
  const { role, configured } = resolvePanelRole(providedKey);

  if (!configured) {
    return res.status(503).json({
      message: 'Admin panel is not configured yet.',
    });
  }

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  req.panelRole = role;
  res.set('x-panel-role', role);
  return next();
};

module.exports = {
  requirePanelAccess,
  requireAdminKey,
};
