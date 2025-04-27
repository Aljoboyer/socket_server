
module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define(
      'blog',
      {
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
  