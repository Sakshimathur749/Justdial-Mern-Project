const jwt = require('jsonwebtoken');
const User = require('../modals/user-modal');
const auth = async(req, res, next) => {
  const token = req.header('Authorization')?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user._id }; 
    next();
  } catch (err) {
    console.log(err,"error")
    return res.status(400).json({ message: 'Invalid token' });
    
  }
};
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports ={auth,verifyRole} ;