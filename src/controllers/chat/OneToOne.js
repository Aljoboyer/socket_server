const { Op } = require("sequelize");
const connectDB = require('../../models');
const Mesg = connectDB.mesg;

const addMessage = async (msgObj) => {
    const chat = await Mesg.create(msgObj)
    await chat.save() 
}

const getChats = async (req, res) => {
    const { user1, user2 } = req.query;
    console.log(user1,user2)
    try {
      const messages = await Mesg.findAll({
        where: {
          [Op.or]: [
            { from: user1, to: user2 },
            { from: user2, to: user1 }
          ]
        },
        order: [["createdAt", "ASC"]]  // ASC for oldest first
      });
  
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addMessage,
    getChats
  };
  