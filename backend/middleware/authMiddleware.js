const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Pas de token, accès non autorisé" });
  }

  const token = authorizationHeader.slice(7); // Supprime "Bearer " pour récupérer le token

  try {
    const decoded = jwt.verify(
      token,
      "762df87fa23a487a146eafe606c0657fad82008a027db6c9561d83cec273dd8c"
    );

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Token non valide" });
  }
}

module.exports = authMiddleware;
