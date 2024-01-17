import start from './start';
import envChecker from './utils/checkers/envChecker';
import dbConnection from './config/dbConnection';

( async () => {
    try {
        start;
        await envChecker();
        await dbConnection();
    } catch (error) {
        console.log(`an error happened during starting the chat service ${error}`);
    }
})()