const jwt = require("jsonwebtoken");
const connectDB = require('../../models');
const User = connectDB.users;
const bcrypt = require('bcrypt');

const SecretKey = "te@mM@n@gement";

const loginController = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    const oldUser = await User.scope('withPassword').findOne({ where: { email: email } });

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordCheck = oldUser.password;
    if (!bcrypt.compareSync(password, passwordCheck)) {
      return res.status(401).json({ msg: 'Password is incorrect. Try again.' });
    }

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser.user_id },
      SecretKey,
      { expiresIn: "8h" }
    );

    res.status(200).json({ result: oldUser, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


module.exports = {
    loginController
  };
  