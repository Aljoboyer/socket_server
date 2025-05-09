
module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define(
      'blog',
      {
        blog_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        writer_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        title: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
          },
      },
      {
      
      }
    );
  
    return Blog;
  };
  