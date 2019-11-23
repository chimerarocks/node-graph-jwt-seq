import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";

export interface UserAttributes {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

  const User: UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true // por mais que nao permita null tambem nao pode permitir vazio
      }
    },
    photo: {
      type: DataTypes.BLOB({ // será codificada para base64 ao ser cadastrada no banco de dados
        length: 'long'
      }),
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'users', // por padrao o nome da tabela é o nome do model no plural, mas nesse caso como a primeira letra tb vai ser minuscula tem que especificar
    hooks: { //são como as triggers do mysql, mas sáo conhecidos como lifecycle hooks no sequelize
      beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt);
      },
      beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
        if (user.changed('password')) {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        }
      }
    }
  });

  User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
      return compareSync(password, encodedPassword);
  };

  return User;
}