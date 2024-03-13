const Categories = require('../model/categories');
const Orchids = require('../model/orchids');

class CategoriesController {
    index(req, res, next) {
        Categories.find({})
            .then((categories) => {
                res.render('categories', {
                    title: 'The list of categories',
                    categories: categories,
                    // isLogin: req.session.passport === undefined ? false : true
                });
            }).catch(next);
    }

    create(req, res, next) {
        const categories = new Categories(req.body);
        Categories.find({ name: categories.name }).then((categoriesCheck) => {
            if (categoriesCheck.length > 0) {
                res.flash("error_msg", "Duplicate categories name!");
                res.redirect("/categories")
            } else {
                categories
                    .save()
                    .then(() => res.redirect("/categories"))
                    .catch(next);
            }
        });
    }

    formEdit(req, res, next) {
        const categoryId = req.params.categoryId;
        Categories.findById(categoryId)
            .then((categories) => {
                res.render('editCategories', {
                    title: 'The detail of categories',
                    categories: categories,
                    // isLogin: req.session.passport === undefined ? false : true
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
                console.log("error update: ", err);
                req.flash("error_msg", "Duplicate nation name!");
                res.redirect(`/categories/edit/${req.params.categoryId}`);
            });
    }

    delete(req, res, next) {
        Orchids.findByIdAndDelete({ categories: req.params.categoryId })
            .populate('categories')
            .then((data) => {
                if (data.length > 0) {
                    req.flash(
                        "error_msg",
                        `You can not delete this categories because it has already been connected with other orchids`
                    );
                    return res.redirect("/categories");
                } else {
                    Nations.findByIdAndDelete({ _id: req.params.categoryId })
                        .then(() => res.redirect("/categories"))
                        .catch(next);
                }
            })
    }
}
module.exports = new CategoriesController;