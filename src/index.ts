import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@services/logger.service';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
