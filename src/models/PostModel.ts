import * as Sequelize from "sequelize";
import {BaseModelInterface} from "../interfaces/BaseModelInterface";
import {ModelsInterface} from "../interfaces/ModelsInterface";

export interface PostAttributes {
  id?: number;
  title?: string;
  content?: string;
  author?: number;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes {
}

export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {

  const Post: PostModel = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.BLOB({ // será codificada para base64 ao ser cadastrada no banco de dados
        length: 'long'
      }),
      allowNull: false
    }
  }, {
    tableName: 'posts', // por padrao o nome da tabela é o nome do model no plural, mas nesse caso como a primeira letra tb vai ser minuscula tem que especificar
  });

  Post.associate = (models: ModelsInterface): void => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author'
      }
    });
  };

  return Post;
}