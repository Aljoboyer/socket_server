const connectDB = require('../models');
const User = connectDB.users;
const { Op } = require("sequelize");

const getAllActiveUser = async (req, res) => {
    const {current_user} = req.query
    console.log("current_user ===>", current_user)
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
  