import { Users } from "../models/usersModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadtAtCloudinary } from "../utils/cloudinary.js";






const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, password, email, role } = req.body
    try {
        if (!username || !fullname || !password || !email || !role) {
            return res.status(400).json({ success: false, message: "Please fill all fields" })
        }
        const user = await Users.findOne({ email })

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const avatarLocalFilePath = req.files?.avatar[0]?.path;
        const coverImageLocalFilePath = req.files?.coverImage[0]?.path;
        console.log(avatarLocalFilePath)

        if (!avatarLocalFilePath || !coverImageLocalFilePath) {
            return res.status(400).json({ success: false, error: "Profile picture or cover image not found" });
        }


        const profilePicture = await uploadtAtCloudinary(avatarLocalFilePath);
        const coverPicture = await uploadtAtCloudinary(coverImageLocalFilePath);



        const newUser = await Users.create({

            username,
            fullname,
            password,
            email,
            role,
            avatar: profilePicture,
            coverImage: coverPicture
        });

        return res.status(201).json({ success: true, message: "user created succesfully", newUser });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }




})



const showUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()

    if (!users || users.length === 0) {
        return res.status(404).json({ success: false, message: "No users found" })

    }
    return res.json(users)
})


const search = asyncHandler(async (req, res) => {
    const { username, email, } = req.query


    if (!username && !email) {
        return res.status(400).json("no data found")
    }


    const queryObject = {}

    if (username) {
        queryObject.username = {
            $regex: username, $options: "i"
        }
    }

    if (email) {
        queryObject.email = {
            $regex: email, $options: "i"
        }
    }

    const users = await Users.find(queryObject)

    if (!users || users.length === 0) {
        return res.status(404).json({ success: false, message: "No users found" })
    }
    return res.json(users)
})



const sorting = asyncHandler(async (req, res) => {
    const { order } = req.query;
    try {
        if (!order) {
            return res.status(400).json({ success: false, message: "No order found" });
        }

        let users;

        users = await Users.find({});
    } catch (err) {
        return res.status(400).json({ success: false, message: "Error finding users" });
    }

    if (users.length === 0) {
        return res.status(400).json({ success: false, message: "No users found to sort" });
    }

    let sortedUsers;
    if (order === "asc") {
        try {
            sortedUsers = await Users.aggregate([
                { $sort: { fullname: 1 } }
            ]);
        } catch (err) {
            return res.status(400).json({ success: false, message: "Error sorting users in ascending order" });
        }
        return res.status(200).json({ success: true, message: "Users sorted in ascending order", sortedUsers });
    }

    if (order === "dsc") {
        try {
            sortedUsers = await Users.aggregate([
                { $sort: { fullname: -1 } }
            ]);
        } catch (err) {
            return res.status(400).json({ success: false, message: "Error sorting users in descending order" });
        }
        return res.status(200).json({ success: true, message: "Users sorted in descending order", sortedUsers });
    }


    return res.status(400).json({ success: false, message: "Invalid order parameter" });
});









const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    if (!email || !password) {
        return res.status(401).json({ sucess: false, error: "Please provide email and password" })
    }


    const user = await Users.findOne({ email })


    if (!user) {
        return res.status(400).json({ sucess: false, message: "User does not exist" })
    }


    const checkPassword = await user.iscorrect(password)


    if (!checkPassword) {
        return res.status(402).json({ sucess: false, message: "Incorrect password" })
    }

    const newuser = await Users.findById(user._id)

    const token = newuser.genrateToken(newuser._id)

    const refereshtoken = newuser.genrateRefreshToken(newuser._id)

    newuser.refreshtoken = refereshtoken

    await newuser.save({ validateBeforeSave: false })

    const logedinuser = await Users.findById(newuser._id)
    console.log(logedinuser)

    const options = {
        httpOnly: true,
        secure: true
    };

    res.cookie('token', token, options);
    res.cookie('refreshToken', refereshtoken, options);

    return res.status(200).json({
        success: true,
        message: "User login successful",
        logedinuser
    });
})

const logoutUser = asyncHandler(async (req, res) => {
    const id = req.user._id

    const user = await Users.findByIdAndUpdate(id, {
        $set: {
            refreshtoken: ""
        }
    }, { new: true })




    return res.clearCookie("token").clearCookie("refereshtoken")
        .json({ sucess: true, message: "user logout succesfull" })

})



const updatePassword = asyncHandler(async (req, res) => {

    const id = req.user._id

    const user = await Users.findById(id)
    console.log(user)
    const { oldpassword, newpassword, confirmpassword } = req.body
    const checkPassword = await user.iscorrect(oldpassword)
    if (!true === checkPassword) {
        return res.status(400).json({ sucess: false, message: "old password is incorrect" })
    }
    if (newpassword === confirmpassword) {
        user.password = newpassword;

        await user.save({ validateBeforeSave: false })
        return res.status(200).json({ sucess: true, message: " password is changed" })
    }
    else {
        return res.status(400).json({ sucess: false, message: "new password and confirm password is not same" })
    }

})




const updateUser = asyncHandler(async (req, res) => {
    const { username, fullname, email } = req.body
    if (!username || !fullname || !email) {
        return res.status(400).json({ sucess: true, message: "Please fill all fields" })
    }

    const id = req.user._id

    const user = await Users.findByIdAndUpdate(id, {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email
    }, { new: true })

    const newuser = await user.save();


    return res.json({ sucess: true, message: "userupdated succesfully", newuser })

})


const updateavatar = asyncHandler(async (req, res) => {
    const id = req.user._id

    const avatarLocalFilePath = req.file?.avatar[0]?.path;
    if (!avatarLocalFilePath) {
        return res.status(400).json({ sucess: false, error: "Profile picture  not found" });
    }



    const profilePicture = await uploadtAtCloudinary(avatarLocalFilePath);


    const user = await Users.findByIdAndUpdate(id, {
        $set: {
            avatar: profilePicture


        }
    }, { new: true })


    return res.status(201).json({ sucess: true, message: "avatar updated succesfully", user });
})




const deleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await Users.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).json({ sucess: false, message: "user not found" })
    }
    Users.deleteOne(user)
    return res.json({ sucess: true, message: "user  deleted succesfully" })

})

const userCount = asyncHandler(async (req, res) => {
    try {
        const totalCount = await Users.countDocuments();
        res.status(200).json({ sucess: true, message: "total users", totalUser: totalCount });
    } catch (error) {
        res.status(500).json({ sucess: true, message: "Internal Server Error" });
    }

})

export { registerUser, loginUser, showUsers, search, logoutUser, updateUser, deleteUserById, updatePassword, updateavatar, sorting, userCount }