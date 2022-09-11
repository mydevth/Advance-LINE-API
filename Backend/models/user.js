const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    display_name: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    picture_url: DataTypes.TEXT,
    is_active: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    user_phone: DataTypes.STRING(100),
    user_role: {
      type: DataTypes.ENUM,
      values: ["user", "repairman", "admin"],
      defaultValue: "user",
    },
  },
  {
    // Other model options go here
    //   timestamps: false, // ไม่ใช้ created_at / updated_at
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users", // users คือตารางจริงใน db
  }
);

module.exports = User;
