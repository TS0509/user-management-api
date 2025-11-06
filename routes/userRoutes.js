const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// 公共路由（不需要登录）
router.post('/register', registerUser);
router.post('/login', loginUser);

// 👑 只有管理员能访问
router.get('/users', verifyToken, checkRole(['admin']), getUsers);
router.delete('/users/:id', verifyToken, checkRole(['admin']), deleteUser);

// 👤 普通用户可访问自己的资料
router.get('/users/:id', verifyToken, getUserById);
router.put('/users/:id', verifyToken, updateUser);

module.exports = router;
