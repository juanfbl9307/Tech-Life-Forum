const CategoryService = require("../services/categoryService")

const CategoryController = module.exports;

CategoryController.create = async (req, res, next) => {
    const name = req.body;
    return CategoryService.create(name).then(c => res.status(c.status).send(c.message))
        .catch(() => res.status(500).send(`Internal server error`));
};

CategoryController.getById = async (req,res,next)=>{
    const {id} = req.query;
    return CategoryService.getById(id).then(result => {
        res.status(result.status).send(result.message )
    })
    .catch(()=>res.status(500).send("Internal server error"));
}

CategoryController.getAll = async (req, res, next) => {

    return CategoryService.getList().then(c => res.status(200).send(c))
        .catch(() => res.status(500).send(`Internal server error`));

};

