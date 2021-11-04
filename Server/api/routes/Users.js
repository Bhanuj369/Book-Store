const users = require('../../models/users')

module.exports = function(router) {

    //POST: Get meeting note document
    router.post('/users/post', function(req, res) {
        let note = new users(req.body)
        note.save(function(err, note) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    router.get('/users/get', function(req, res) {
        users.find({}, (err, users) => {
            if(err) {
                res.json({ success: false, message: err});
            }
            else {
                if(!users) {
                    res.json({success: false, message: 'No users found.'});
                }
                else {
                    res.json({success: true, users: users});
                }
            }
        })
    })

    router.get('/users/get/:username', (req, res) => {
        if(!req.params.username) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            users.findOne({username: req.params.username}, (err, users) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    if(!users) {
                        res.json({success: false, message: 'No users found.'});
                    }
                    else {
                        res.json({success: true, users: users});
                    }
                }
            })
        }
    })

    router.put('/users/put/:id', (req, res) => {
        if(!req.body.id) {
            res.json({ success: false, message: 'No users id provided' })
        }
        else {
            users.findOne({_id: req.body.id}, (err, users) => {
                if(err) {
                    res.json({success: false, message: "Not a valid users id"})
                }
                else {
                    users._id = req.body._id
                    users.firstname = req.body.title
                    users.lastname = req.body.author
                    users.email_id = req.body.publish_date
                    users.username = req.body.numOfPages
                    users.password = req.body.publisher
                    users.save((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'users Updated!'})
                        }
                    })
                }
            })
        }
    })

    router.delete('/users/delete/:id', (req, res) => {
        if(!req.params.id) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            users.findOne({_id: req.params.id}, (err, users) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    users.remove((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'users Deleted!'})
                        }
                    })
                }
            })
        }
    })
}