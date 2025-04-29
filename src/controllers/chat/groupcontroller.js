const connectDB = require('../../models');
const {group, groupmember} = connectDB;

const createGroupController = async (req, res) => {
    const { groupName, userIds } = req.body;
  
    // 1. Create group in DB
    const groupCreateData = await group.create({ name: groupName });
  
    // 2. Add users to group
    for (const userId of userIds) {
      await groupmember.create({ groupId: groupCreateData.id, userId });
    }
  
    res.status(201).json({ groupId: group.id });
}


module.exports = {
    createGroupController,
};
