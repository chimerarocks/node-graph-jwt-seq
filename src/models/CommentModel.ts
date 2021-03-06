import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {ModelsInterface} from "../interfaces/ModelsInterface";

export interface CommentAttributes {
  id?: number;
  comment?: string;
  post?: number;
  user?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel => {

  const Comment: CommentModel = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comments', // por padrao o nome da tabela é o nome do model no plural, mas nesse caso como a primeira letra tb vai ser minuscula tem que especificar
  });

  Comment.associate = (models: ModelsInterface): void => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
      }
    });

    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
      }
    });
  };

  return Comment;
}