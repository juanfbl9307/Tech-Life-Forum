const Category = require("../repositories/categories");
const { find } = require("../repositories/comments");

const CategoryService = module.exports;

CategoryService.create = async (categoryName)=>{
    if (await Category.findByName(categoryName)) {
        creation = {message : `Category already exist`,
        status : 400}
    } else {
        await Category.create(categoryName);
        creation = {message : `Category created`,
        status : 200}
    };
    return creation;

};

CategoryService.getById= async (categoryId)=>{
    const categoryFinded = await Category.findById(categoryId);
    if(!categoryFinded){
        finding = {message : `Category doesn't exist`,
        status : 400} 
    } else {
        finding = {message : categoryFinded,
        status : 200} 
    }
    return finding;

}

CategoryService.getList = async ()=>{
    const categories = await Category.getAll();
    return categories;
}
