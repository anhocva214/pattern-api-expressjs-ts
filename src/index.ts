import './pre-start'; // Must be the first import
import app from '@server';
// import Logger from '@services/logger.service';
import logger from 'jet-logger';

// Start the server
const port = Number(process.env.PORT || 3000);
// const logger = new Logger()
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
