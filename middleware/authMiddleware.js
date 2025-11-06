// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 从请求头读取 token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: '❌ No token provided' });
  }

  try {
    // 验证 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 把解码后的用户信息保存到 req.user
    next(); // 放行到下一个中间件或路由
  } catch (err) {
    console.error('JWT Error:', err);
    res.status(403).json({ message: '❌ Invalid or expired token' });
  }
};

module.exports = verifyToken;
