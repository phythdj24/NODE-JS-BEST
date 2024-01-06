const express = require('express')

const app = express()
const users = require('./MOCK_DATA.json')

const PORT = 8000;

//
app.get('/api/users', (req,res)=>{
    return res.json(users)
})
app.get('/users', (req,res)=> {
    const html = `
    <ul>
    ${users.map((user) => ` <li>${user.first_name}</li> ` )}
    </ul>

    `
    res.send(html)
})


app.listen(PORT, ()=> console.log(`Server started at Port:${PORT}`))