
const errorHandler = require('../middleware/error')

const URL = '/api';

const routes = async(app) => {
    
    app.use(`${URL}/plane`, require('../routes/planes')); 
    app.use(`${URL}/strip`, require('../routes/strips')); 
    app.use(`${URL}/landing`, require('../routes/landings')); 
    app.use(`${URL}/takingof`, require('../routes/takingofs')); 
    app.use(`${URL}/schedule`, require('../routes/schedule')); 
    
    app.use(errorHandler);
}

module.exports = routes;


