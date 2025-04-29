
module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define(
      'group',
      {
        group_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        group_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      },
      {
      
      }
    );
    
    Group.associate = (models) => {
        const { groupmember , users} = models;
        Group.belongsToMany(users, {
          foreignKey: 'group_id',
          through: groupmember,
          otherKey: 'user_id',
        });
      };

    return Group;
  };
  