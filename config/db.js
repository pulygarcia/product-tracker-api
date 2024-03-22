import mongoose from "mongoose";
import colors from 'colors'

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);

        console.log(colors.bgGreen('Connected correcty to Database'));
    } catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1);  //stop the program if there is an error. In parameter, 0 if it ended good and 1 if there was an error.
    }
}