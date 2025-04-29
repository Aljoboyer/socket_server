
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'], // Add your unique identifier field here
        },
      ],

      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      
    }
  );
  User.associate = (models) => {
    const { groupmember , group} = models;
    User.belongsToMany(group, {
      foreignKey: 'user_id',
      through: groupmember,
      otherKey: 'group_id',
    });
  };
  return User;
};
