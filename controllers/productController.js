import Product from '../models/product.js';

export const createProduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({data:product, message: 'Product successfully updated' });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    // res.send(product);
    res.status(201).json({data: product, message:"product successfully updated", success: true});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    res.send({data:product, message: 'Product successfully deleted', success: true});
  } catch (error) {
    res.status(500).send(error);
  }
};
