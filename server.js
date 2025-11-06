// server.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

// 路由
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// 这里放数据库连接测试代码 👇
const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL Connected:', result.rows[0]);
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
})();

// 最后一行是启动服务器
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));