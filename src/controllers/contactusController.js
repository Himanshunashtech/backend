import Contactus from "../models/contactusModel.js";
import { Users } from "../models/usersModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const queryMessage = asyncHandler(async (req, res) => {
    const { email, message, subject, senderId } = req.body
    if (!email || !message || !subject || !senderId) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" })
    }
    const sender = Users.findById(senderId)
    if (!sender) {
        return res.status(400).json({ success: false, message: "new user" })
    }
    const newMessage = await Contactus.create({ email, message, subject, senderId })
    return res.status(200).json({
        success: true, message: "Message sent successfully", data: newMessage
    })
}
)

export default queryMessage