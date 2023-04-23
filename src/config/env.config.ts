import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';



(() => {
    // Setup command line options
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: 'development',
            type: String,
        },
        {
            name: 'detectOpenHandles',
            alias: 'd',
            defaultValue: true,
            type: Boolean,
        },
        {
            name: 'collectCoverage',
            alias: 'c',
            defaultValue: true,
            type: Boolean,
        },
    ]);
    // Set the env file
    const result2 = dotenv.config({
        path: path.join(__dirname, `../../env/${options.env}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
})();
