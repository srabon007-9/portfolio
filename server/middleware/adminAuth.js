const requireAdminKey = (req, res, next) => {
  const configuredKey = process.env.ADMIN_INBOX_KEY;

  if (!configuredKey) {
    return res.status(503).json({
      message: 'Admin inbox is not configured yet.',
    });
  }

  const headerKey = req.header('x-admin-key');
  const authHeader = req.header('authorization') || '';
  const bearerKey = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : null;

  const providedKey = headerKey || bearerKey;

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ message: 'Unauthorized admin access.' });
  }

  return next();
};

module.exports = {
  requireAdminKey,
};
