const categories = require("../models/categories");

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
};

const findCategoryById = async (req, res, next) => {
  console.log("GET /categories/:name");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

const updateCategory = async (req, res, next) => {
  console.log(`PUT /categories/${req.params.id}`);
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления категории" }));
  }
};

const deleteCategory = async (req, res, next) => {
  console.log("DELETE /categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите название категории" }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Категория с таким названием уже существует",
      })
    );
  } else {
    next();
  }
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  checkEmptyName,
  checkIsCategoryExists,
};
