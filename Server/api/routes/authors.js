const authors = require('../../models/authors')

module.exports = function(router) {

    //POST: Get meeting note document
    router.post('/authors/post', function(req, res) {
        let note = new authors(req.body)
        note.save(function(err, note) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    router.get('/authors/get', function(req, res) {
        authors.find({}, (err, authors) => {
            if(err) {
                res.json({ success: false, message: err});
            }
            else {
                if(!authors) {
                    res.json({success: false, message: 'No authors found.'});
                }
                else {
                    res.json({success: true, authors: authors});
                }
            }
        })
    })

    router.get('/authors/get/:author', (req, res) => {
        if(!req.params.author) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            authors.findOne({author: req.params.author}, (err, authors) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    if(!authors) {
                        res.json({success: false, message: 'No authors found.'});
                    }
                    else {
                        res.json({success: true, authors: authors});
                    }
                }
            })
        }
    })

    router.delete('/authors/delete/:author', (req, res) => {
        if(!req.params.author) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            authors.findOne({author: req.params.author}, (err, authors) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    authors.remove((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'authors Deleted!'})
                        }
                    })
                }
            })
        }
    })
}
