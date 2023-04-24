import { DataTypes } from "sequelize";
import BaseModel from ".";
import { sequelize } from "@config/db.config";
import { Token } from "./token.model";

export class User extends BaseModel {
  username!: string;
  password!: string;
  email!: string;
  fullname!: string;
  role!: String;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  }
);

User.hasMany(Token, { sourceKey: "id", foreignKey: "moduleId", as: "Tokens" });
Token.belongsTo(User, { targetKey: "id", foreignKey: "moduleId", as: "Users" });

User.beforeDestroy(async (user) => {
  await Token.destroy({ where: { userId: user.id } });
});
