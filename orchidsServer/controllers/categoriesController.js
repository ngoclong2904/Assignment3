const Categories = require('../model/categories')

class CategoriesController {
    index(req, res, next) {
        Categories.find({})
            .then((categories) => {
                res.render('categories', {
                    title: 'The list of categories',
                    categories: categories
                });
            }).catch(next);
    }

    create(req, res, next) {
        const categories = new Categories(req.body);
        Categories.find({ name: categories.name })
            .then((categories) => {
                if (categories) {
                    console.log("Dup:");
                    return res.redirect("/categories")
                }
            })
            .catch(next);
        categories
            .save()
            .then(() => res.redirect('/categories'))
            .catch((error) => { });
        // categories.save()
        //     .then(() => res.redirect('/categories'))
        //     .catch(error => { });
    }

    formEdit(req, res, next) {
        const categoryId = req.params.categoryId;
        Categories.findById(categoryId)
            .then((categories) => {
                res.render('editCategories', {
                    title: 'The detail of categories',
                    categories: categories
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        Categories.updateOne({ _id: req.params.categoryId },
            req.body)
            .then(() => {
                res.redirect('/categories')
            })
            .catch((err) => {
                res.render('editCategories', {
                    title: 'The detail of categories',
                    categories: req.body,
                });
            });
    }

    delete(req, res, next) {
        Categories.findByIdAndDelete({ _id: req.params.categoryId }, req.body)
            .then(() => res.redirect('/categories'))
            .catch(next);
    }
}
module.exports = new CategoriesController;