
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
        const { groupmember } = models;
        Group.belongsToMany(groupmember, { foreignKey: 'group_id' });
      };

    return Group;
  };
  