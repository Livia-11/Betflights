import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password: bcrypt.hashSync(password, 8), role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //   return res.status(400).send({ error: 'Invalid credentials' });
    // }
    if(user){
      const compareSync =  bcrypt.compare(password, user.password);
      if(compareSync){      
        const token = jwt.sign({ id: user._id }, " processenvJWT_SECRET");
        res.status(201).json(token)
      }
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
    console.log(error.message);
    
  }
};
