const connectDB = require('../../models'); 
// const { group, groupmember } = connectDB;
const Group = connectDB.group;
const Groupmember = connectDB.groupmember;

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


const getBlogs = async (req, res) => {
    try {
      const allBlogs = await Blog.findAll({});
  
      res.json(allBlogs);
    } catch (error) {
      console.error("Error fetching allBlogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    createGroupController,
};
