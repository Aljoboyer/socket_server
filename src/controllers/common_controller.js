const connectDB = require('../models');
const User = connectDB.users;
const { Op } = require("sequelize");

const getAllActiveUser = async (req, res) => {
    const {current_user} = req.query
    
    const allUsers = await User.findAll({
        where: {
            user_id: { [Op.not]: current_user }
          }
    })

    res.send(allUsers)
}


module.exports = {
    getAllActiveUser
};
  