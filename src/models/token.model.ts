import { DataTypes, Sequelize } from "sequelize";
import BaseModel from ".";
import { sequelize } from "@config/db.config";

export class Token extends BaseModel {
  payload!: string;
  expiredAt!: Date;
  moduleId!: string;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    payload: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
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
    tableName: "Tokens",
  }
);
