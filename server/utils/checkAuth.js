import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  // Достаєм токен без строки 'Bearrer'
  const token = (req.headers.autorization || "").replace(/Bearrer\s?/, "");
  console.log('checkAuthw3333', req.headers.autorization, token);

  if (token) {
    try {
      // Передаю токен і секретне слово щоб розшифрувати його
      const decoded = jwt.verify(token, process.env.JWT_SECREET);

      req.userId = decoded.id;
    } catch (error) {
      return res.json({ message: "No access! Problems with token." });
    }
  } else {
    return res.json({ message: "No access! Problems with token exist." });
  }
};
