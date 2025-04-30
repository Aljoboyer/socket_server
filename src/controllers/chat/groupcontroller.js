const { Op } = require('sequelize');
const connectDB = require('../../models'); 
const Group = connectDB.group;
const Groupmember = connectDB.groupmember;
const Users = connectDB.users;

const createGroupController = async (req, res) => {
  const { group_name, userIds } = req.body;

  try {
    const groupCreateData = await Group.create({ group_name });

    for (const userId of userIds) {
      await Groupmember.create({
        group_id: groupCreateData.group_id,
        user_id: userId,
      });
    }

    res.status(201).json({ groupId: groupCreateData.group_id });
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ error: err.message });
  }
};


const getUserGroup = async (req, res) => {
    try {
      const userId = req.params.id;

      console.log('hitted ===>', userId)
      const finduserGroup = await Groupmember.findAll(
        {
          where: {user_id: userId},
          attributes: ['group_id']
        })
      
      if(finduserGroup?.length > 0){
        const groupIds = finduserGroup.map(group => group.group_id);
        const matchedData = await Group.findAll({
          where: {
            group_id: {
              [Op.in]: groupIds
            },
          },
          attributes: ["group_id", "group_name"],
          include: {
            model: Users,
            attributes: ["user_id", "name"],
          }
        });
        res.json(matchedData);

      }
      else{
      res.json({msg: 'No Group Found'});

      }
    } catch (error) {
      console.error("Error fetching allBlogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createGroupController,
    getUserGroup
};
 
  