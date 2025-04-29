
module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define(
      'groupmember',
      {
        groupMember_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
          group_id: {
            type: DataTypes.UUID,
            allowNull: false,
          },
      },
      {
      
      }
    );
    
    GroupMember.associate = (models) => {
        const { group } = models;
        GroupMember.belongsToMany(group, { foreignKey: 'group_id' });
      };

    return GroupMember;
  };
  