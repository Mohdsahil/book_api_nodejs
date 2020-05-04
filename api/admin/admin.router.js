require('dotenv').config()

const router = require('express').Router()
const fileUpload = require('express-fileupload');
const pool = require('../../config/dbcon')
const { checktoken } = require('../../auth/validate_token')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(fileUpload());




router.get('/', (req, res) => {
    res.status(200).json({
        success: 1,
        message: "all right"
    })
})

router.post('/upload', (req, res) => {
    const data = req.body
    // console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
    }
    let book = req.files.book;
    let thumbnail = req.files.thumbnail;
    book.name = Date.now() + "_" + book.name;
    thumbnail.name = Date.now() + "_" + thumbnail.name;

    let book_path = 'http://localhost:7000/books' + '/' + book.name;
    let thumbnail_path = 'http://localhost:7000/thumbnail' + '/' + thumbnail.name;
    book.mv('upload/books/' + book.name, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: 0,
                message: "internal server error to upload the book "
            });
        }
    });
    thumbnail.mv('upload/thumbnail/' + thumbnail.name, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({
                success: 0,
                message: "internal server error to upload the book "
            });
        }
    });

    pool.query(`INSERT INTO books ( book_name, book_author, book_type, book_language, adult, book_keywords, book_discription, book_link, book_thumbnail) VALUES(?,?,?,?,?,?,?,?,?)`,
        [
            data.book_name,
            data.book_author,
            data.book_type,
            data.book_language,
            data.adult,
            data.book_keywords,
            data.book_discription,
            book_path,
            thumbnail_path
        ],
        (error, result, fields) => {
            if (error) {
                console.log(error)
                res.status(500).json({ "internal  error": error })
            }
            res.status(200).json({
                success: 1,
                message: "book is uploated successfully",
                data: result
            })
        }
    )
})


router.delete('/remove', checktoken, (req, res) => {
    var data = req.body
    console.log(data)
    pool.query(`delete from books where book_id=?`,
        [
            data.book_id
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: 0,
                    error: "Internal server error"
                })
            }
            res.status(200).json({
                success: 1,
                message: "Successfully deleted"
            })
        }
    )
})

router.get('/book', checktoken, (req, res) => {
    pool.query(`select * from books`,
        [],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: 0,
                    message: "internal server error"
                })
            }
            res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
})

router.get('/book/:id', checktoken, (req, res) => {
    var id = req.params.id
    pool.query(`select * from books where  book_id=?`,
        [
            id
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: 0,
                    message: "internal server error"
                })
            }
            res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
})

router.get('/users', checktoken, (req, res) => {
    // var s = ".... from users  left join readinghistory on user.user_id = readhistory.user_id order by read_count_time desc"

    pool.query(`select users.user_id,users.name, users.email, readinghistory.read_id, readinghistory.book_id, readinghistory.read_time_count from  users left join readinghistory on users.user_id = readinghistory.user_id order by read_time_count desc`,
        [],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
})

router.post('/register', (req, res) => {
    var data = req.body
    console.log(data)
    // var salt = genSaltSync(10)
    // data.password = hashSync(data.password, salt)
    data.password = bcrypt.hashSync(data.password, 10)
    pool.query(`select * from admin where email=?`,
        [
            data.email
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success0,
                    message: "internnel server error"
                })
            }

            if (result.length < 1) {

                pool.query(`insert into admin(name, email, password) values(?,?,?)`,
                    [
                        data.name,
                        data.email,
                        data.password
                    ],
                    (err, result, fields) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                success: 0,
                                message: "Internel serve error"
                            })
                        }
                        var token = jwt.sign({ id: result.insertId }, process.env.TOKEN_KEY, { expiresIn: 86400 })
                        return res.status(200).json({
                            success: 1,
                            token: token,
                            message: "successfully register"
                        })
                    }
                )

            }
            else {
                return res.json({
                    success: 0,
                    message: "email already in use"
                })
            }
        }
    )

})


router.post('/login', (req, res) => {
    const { name, email, password } = req.body;

    pool.query(`select * from admin where email=?`,
        [
            email
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Internel server error"
                })
            }

            if (result.length < 1) {
                return res.json({
                    success: 0,
                    message: "You don't have an account"
                })
            }


            var passwordIsValid = bcrypt.compareSync(password, result[0].password)
            if (!passwordIsValid) {
                return res.status(401).json({
                    success: 0,
                    message: "unauthorised access"
                })
            }
            var token = jwt.sign({ id: result.insertedId }, process.env.TOKEN_KEY, { expiresIn: 86400 })
            return res.status(200).json({
                success: 1,
                token: token,
                message: "successfully admin login"
            })
        }
    )



})

module.exports = router;