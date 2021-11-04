const categories = require('../../models/categories')

module.exports = function(router) {

    //POST: Get meeting note document
    router.post('/categories/post', function(req, res) {
        let note = new categories(req.body)
        note.save(function(err, note) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    router.get('/categories/get', function(req, res) {
        categories.find({}, (err, categories) => {
            if(err) {
                res.json({ success: false, message: err});
            }
            else {
                if(!categories) {
                    res.json({success: false, message: 'No categories found.'});
                }
                else {
                    res.json({success: true, categories: categories});
                }
            }
        })
    })

    router.get('/categories/get/:category', (req, res) => {
        if(!req.params.category) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            categories.findOne({category: req.params.category}, (err, categories) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    if(!categories) {
                        res.json({success: false, message: 'No categories found.'});
                    }
                    else {
                        res.json({success: true, categories: categories});
                    }
                }
            })
        }
    })

    router.delete('/categories/delete/:category', (req, res) => {
        if(!req.params.category) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            categories.findOne({category: req.params.category}, (err, categories) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    categories.remove((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'categories Deleted!'})
                        }
                    })
                }
            })
        }
    })
}