
module.exports = (sequelize, DataTypes) => {
    const Mesg = sequelize.define(
      'mesg',
      {
        from: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        to: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        msg: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        }
      },
      {
      
      }
    );
  
    return Mesg;
  };
  