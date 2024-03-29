const bcrypt = require('bcrypt')
const User = require('../model/users')
var passport = require('passport')

class UsersController {
    index(req, res, next) {
        res.render("register");
    }

    listUsers(req, res, next) {
        User.find({})
            .then((users) => {
                res.render("accounts", {
                    title: "The list of Users",
                    users: users,
                    isLogin: req.session.passport === undefined ? false : true
                });
            })
            .catch(next);
    }

    regist(req, res, next) {
        const { username, password } = req.body;
        let errors = [];
        if (!username || !password) {
            errors.push({ msg: "Please enter all fields" });
        }
        if (password.length < 6) {
            errors.push({ msg: "Password must be at least 6 characters" });
        }
        if (errors.length > 0) {
            res.render("register", {
                errors,
                username,
                password,
            });
        } else {
            User.findOne({ username: username }).then((user) => {
                if (user) {
                    errors.push({ msg: "Username already exists" });
                    res.render("register", {
                        errors,
                        username,
                        password,
                    });
                } else {
                    const newUser = new User({
                        username,
                        password,
                    });
                    //Hash password
                    bcrypt.hash(newUser.password, 10, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                res.redirect("/users/login");
                            })
                            .catch(next);
                    });
                }
            });
        }
    }

    login(req, res, next) {
        res.render("login");
    }

    signin(req, res, next) {
        passport.authenticate("local", {
            successRedirect: "/users/dashboard",
            failureRedirect: "/users/login",
            failureFlash: true,
        })(req, res, next);
    }

    dashboard(req, res, next) {
        console.log("dashboard: ", req.user);
        res.redirect("/orchids");
    }

    signout(req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            req.flash("success_msg", "You are logged out");
            //  res.clearCookie('jwt');
            res.redirect("/users/login");
        });
    }

    formEdit(req, res, next) {
        const userId = req.session.passport.user.id;
        console.log(userId);
        User.findById(userId)
            .then((user) => {
                console.log(user);
                res.render("profile", {
                    title: "The detail of User",
                    user: user,
                    isLogin: req.session.passport === undefined ? false : true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    edit(req, res, next) {
        var data = {
            name: req.body.name,
            YOB: req.body.yob,
        };
        User.updateOne({ _id: req.session.passport.user.id }, data)
            .then(() => {
                req.flash("success_msg", "Updated successfully!");
                res.redirect(`/users/edit`);
            })
            .catch((err) => {
                req.flash("error_msg", err);
                res.redirect(`/users/edit`);
            });
    }
}
module.exports = new UsersController;