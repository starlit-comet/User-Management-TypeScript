require('dotenv').config(); 
import server from './server';
const port = parseInt(process.env.PORT || '4000')

const starter = new server().start(port)
    .then(port=>console.log(`Server running on ${port}`))
    .catch(err=>console.log(err))

export default starter;