/**
 * Setup the jet-logger.
 *
 * Documentation: https://github.com/seanpmaxwell/jet-logger
 */

import logger from 'jet-logger';

interface IErrorApp {
    where: string;
    detail: any;
}

export default class Logger{

    info(message: string){
        logger.info(message);
    }

    warning(message: string){
        logger.warn(message);
    }
    
    errorApp(data: IErrorApp){
        logger.err(`#----------------------------`)
        logger.err(`# where: ${data.where}`)
        logger.err(`# detail: ${data.detail}`)
        logger.err(`#----------------------------`)
    }
}