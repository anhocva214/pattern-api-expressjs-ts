import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const EpochToHuman = (epoch: number)=>{
    let d = new Date(epoch);
    
    let text_full = d.getDate() + "/" + (d.getMonth()+1).toString() + "/" + d.getFullYear();

    return {
        text_full,
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    }
}