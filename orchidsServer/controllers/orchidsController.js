const Categories = require('../model/categories');
const Orchids = require('../model/orchids')

let colorData = [
    { "id": "1", "name": "Blue" },
    { "id": "2", "name": "Red" },
    { "id": "3", "name": "Green" },
    { "id": "4", "name": "Yellow" },
    { "id": "5", "name": "White" },
    { "id": "6", "name": "Orange" },
    { "id": "7", "name": "Pink" },
]

let nationData = [
    { "id": "1", "name": "China" },
    { "id": "2", "name": "VietNam" },
    { "id": "3", "name": "ThaiLand" },
    { "id": "4", "name": "Laos" },
    { "id": "5", "name": "Campuchia" },
    { "id": "6", "name": "Japan" },
    { "id": "7", "name": "Korea" },
]

class OrchidsController {
    home(req, res, next) {
        console.log(req.session)
        Categories.find({})
            .then((categories) => {
                Orchids.find({ isNatural: true })
                    .populate('categories', ['name', 'description'])
                    .then((orchids) => {
                        res.render('index', {
                            title: 'The list of Orchids',
                            orchids: orchids,
                            colorList: colorData,
                            nationList: nationData,
                            category: categories,
                            error_msg: "",
                            // isLogin: req.session.passport === undefined ? false : true
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        next();
                    });
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    }

    index(req, res, next) {
        Categories.find({})
            .then((categories) => {
                Orchids.find({})
                    .populate('categories', ['name', 'description'])
                    .then((orchids) => {
                        console.log(orchids)
                        res.render('OrchidsSite', {
                            title: 'The list of Orchids',
                            orchids: orchids,
                            colorList: colorData,
                            nationList: nationData,
                            category: categories,
                            error_msg: "",
                            // isLogin: req.session.passport === undefined ? false : true
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        next();
                    });
            })
            .catch((err) => {
                console.log(err);
                next();
            });
    }

    create(req, res, next) {
        Categories.find({})
            .then((categories) => {
                if (categories.length === 0) {
                    req.flash('error_msg', "Please input data of categories in Database first!!!");
                    return res.redirect("/orchids");
                }
            })
            .catch((err) => {
                req.flash('error_msg', "Server Error");
                return res.redirect("/orchids");
            });
        var data = {
            name: req.body.name,
            image:
                req.file === undefined
                    ? ""
                    : `images/orchids/${req.file.originalname}`,
            price: req.body.price,
            original: req.body.original,
            isNatural: req.body.isNatural === undefined ? false : true,
            color: req.body.color,
        };
        console.log("data: ", data);
        const orchids = new Orchids(data);
        Players.find({ name: orchids.name }).then((orchidsCheck) => {
            if (orchidsCheck.length > 0) {
                req.flash("error_msg", "Duplicate orchids name!");
                res.redirect("/orchids");
            } else {
                console.log(orchids);
                orchids
                    .save()
                    .then(() => res.redirect("/orchids"))
                    .catch(next);
            }
        });
    }

    orchidsDetail(req, res, next) {
        const orchidId = req.params.orchidId;
        Categories.find({})
            .then((categories) => {
                Orchids.findById(orchidId).populate("categories", "name")
                    .then((orchids) => {
                        res.render("orchidsDetail", {
                            title: 'The list of Orchids',
                            orchids: orchids,
                            colorList: colorData,
                            nationList: nationData,
                            category: categories,
                            error_msg: "",
                            // isLogin: req.session.passport === undefined ? false : true
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }

    formEdit(req, res, next) {
        const orchidId = req.params.orchidId;
        Categories.findById({})
            .then((categories) => {
                Orchids.findById(orchidId)
                    .then((orchids) => {
                        res.render('editOrchid', {
                            title: 'The list of Orchids',
                            orchids: orchids,
                            colorList: colorData,
                            nationList: nationData,
                            category: categories,
                            error_msg: "",
                            // isLogin: req.session.passport === undefined ? false : true
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }

    edit(req, res, next) {
        var data;
        if (!req.file) {
            data = {
                name: req.body.name,
                price: req.body.price,
                original: req.body.original,
                isNatural: req.body.isNatural === undefined ? false : true,
                color: req.body.color,
            }
        } else {
            data = {
                name: req.body.name,
                image:
                    req.file === undefined
                        ? ""
                        : `images/orchids/${req.file.originalname}`,
                price: req.body.price,
                original: req.body.original,
                isNatural: req.body.isNatural === undefined ? false : true,
                color: req.body.color,
            };
        }
        Orchids.updateOne({ _id: req.params.orchidId }, data)
            .then(() => {
                res.redirect("/orchids");
            })
            .catch((err) => {
                console.log("error update: ", err);
                req.flash("error_msg", "Duplicate orchids name!");
                res.redirect(`/orchids/edit/${req.params.orchidId}`);
            });
    }

    delete(req, res, next) {
        Orchids.deleteOne({ _id: req.params.orchidId }, req.body)
            .then(() => {
                res.redirect('/orchids')
            })
            .catch(next)
    }
}
module.exports = new OrchidsController;