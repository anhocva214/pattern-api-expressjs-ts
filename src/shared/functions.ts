import logger from './Logger';
import CryptoJS from 'crypto-js'


export const HashMD5 = (data: any): string => {
    let hash = CryptoJS.MD5(data)
    return hash.toString()
}

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const EpochToHuman = (epoch: number) => {
    let d = new Date(epoch);

    let text_full = d.getDate() + "/" + (d.getMonth() + 1).toString() + "/" + d.getFullYear();

    return {
        text_full,
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    }
}

export const convertToSlug = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();

    var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
    var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
    for (var i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    return str;
}