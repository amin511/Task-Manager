// express 
const express = require('express')
const app = express();

// db :
const connectDb = require('./db/connect')
require('dotenv').config();

// middleware   :
// import function :
const notfound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorHandler');
//
// uses : 
app.use(express.static('./public'))
app.use(express.json());


// routes :
const tasks = require('./routes/tasks');
app.use('/api/v1/tasks', tasks);

app.use(notfound)
app.use(errorHandlerMiddleware);






// app.get('/api/v1/tasks/')        ===> get all the tasks
// app.post('/api/v1/tasks/')       ===> create a new task
// app.get('api/v1/tasks/:id')      ===> get single task
// app.patch('api/v1/tasks/:id')    ===> update task
// app.delete('api/v1/tasks/:id')   ===> delete task



const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));
    }
    catch (err) {
        console.log(err)
    }
}

start();