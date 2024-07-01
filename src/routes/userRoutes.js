import express, { Router } from "express"
const router = Router()
import { deleteUserById, loginUser, logoutUser, registerUser, search, showUsers,  sorting, updatePassword, updateUser, updateavatar, userCount } from "../controllers/userController.js"
import { upload } from "../middlewares/multer.js"
import { auth } from "../middlewares/auth.js"



router.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1

    }

]),


    registerUser

)
router.get("/show", showUsers)
router.post("/login", loginUser)
router.post("/updateuser", auth, updateUser)
router.post("/updateavatar", auth, upload.single([
    {
        name: "avatar",
        maxCount: 1
    }])
    , updateavatar)

router.get("/sorting",sorting)    
router.get("/search",search)    
router.post("/updatepassword", auth, updatePassword)
router.delete("/delete/:id", deleteUserById)
router.post("/logout",  logoutUser)
router.get("/totaluser", userCount )




export default router