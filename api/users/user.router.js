require('dotenv').config()
const router = require('express').Router()
const multer = require('multer')
const pool = require('../../config/dbcon')
const { checktoken } = require('../../auth/validate_token')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', (req, res) => {
    var data = req.body
    // var salt = genSaltSync(10)
    // data.password = hashSync(data.password, salt)
    data.password = bcrypt.hashSync(data.password, 10)
    pool.query(`select * from users where email=?`,
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

                pool.query(`insert into users(name, email, password) values(?,?,?)`,
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
                                message: "internel server error"
                            })
                        }
                        var token = jwt.sign({ id: result.insertId }, process.env.TOKEN_KEY, { expiresIn: 86400 })
                        return res.status(200).json({
                            success: 1,
                            token: token,
                            data: result
                        })
                    }
                )

            }
            else {
                return res.json({
                    success: 0,
                    message: "email is already used"
                })
            }
        }
    )

})

router.post('/login', (req, res) => {
    const { name, email, password } = req.body;

    pool.query(`select * from users where email=?`,
        [
            email
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "internel server error.."
                })
            }

            if (result.length < 1) {
                return res.json({
                    success: 0,
                    message: "invalie email or password......"
                })
            }
            console.log(result[0].password)

            var passwordIsValid = bcrypt.compareSync(password, result[0].password)
            if (!passwordIsValid) {
                return res.status(401).json({
                    success: 0,
                    message: "invalie email or password......"
                })
            }
            var token = jwt.sign({ id: result.insertedId }, process.env.TOKEN_KEY, { expiresIn: 86400 })
            return res.status(200).json({
                success: 1,
                token: token,
                data: result,

            })
        }
    )



})

router.delete('/', checktoken, (req, res) => {
    var id = req.body.id
    pool.query(`delete from users where user_id=?`,
        [
            id
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: er
                })
            }

            return res.status(200).json({
                success: 1,
                message: result
            })
        }
    )
})


router.get('/', checktoken, (req, res) => {
    pool.query(`select * from books`,
        [],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
})


router.get('/:name:type', (req, res) => {
    var name = req.params.name;
    var type = req.params.type;

    pool.query(`select * from books where book_name like ? || book_type like ?`,
        [
            name + "%",
            type + "%"
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
})


router.post('/readed', checktoken, (req, res) => {
    const data = req.body

    pool.query(`INSERT INTO readinghistory(book_id, user_id, read_time_count, rating, review) values(?,?,?,?,?)`,
        [
            data.book_id,
            data.user_id,
            data.time_count,
            data.rating,
            data.review
        ],
        (err, result, fields) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "internal server error"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "read history updated"
            })
        }
    )
})


module.exports = router