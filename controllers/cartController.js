import Cart from '../models/cart.js';

export const addToCart = async (req, res) => {
  const { product, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [{ product, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === product);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    }
    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).send({ error: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
