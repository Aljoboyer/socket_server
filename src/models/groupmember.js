
module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define(
      'groupmember',
      {
        member_table_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        group_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        timestamps: false, // usually off for pivot tables
        tableName: 'groupmember',
      }
    );
    GroupMember.associate = (models) => {
      GroupMember.belongsTo(models.group, { foreignKey: 'group_id' });
      GroupMember.belongsTo(models.users, { foreignKey: 'user_id' });
    };
  
    return GroupMember;
  };
  