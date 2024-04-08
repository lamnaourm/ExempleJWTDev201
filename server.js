import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, '4e5738502f7e397d52fe7e58ef53083446640380f6efd1c39aec9938b46adec52c9fa156e00d6b6a37e7086870ef79d6', (err, userData) => {
        if (err)
            return res.sendStatus(403);
        else {
            req.user = userData;
            next();
        }
    })
}



app.get('/login', (req, res) => {
    const user = req.body

    jwt.sign(user, '4e5738502f7e397d52fe7e58ef53083446640380f6efd1c39aec9938b46adec52c9fa156e00d6b6a37e7086870ef79d6', (err, tocken) => {
        res.send(tocken)
    })

})

// 4e5738502f7e397d52fe7e58ef53083446640380f6efd1c39aec9938b46adec52c9fa156e00d6b6a37e7086870ef79d6


app.get('/data', authenticateToken, (req, res) => {
    res.send('Les informations ...............')
})

app.listen(3000)