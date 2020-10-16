import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory , Redirect} from "react-router-dom";
import ProfilePageLayout from '../Components/ProfilePage/ProfilePage'


const ProfilePage = () => {
    return(
        <div>
            <ProfilePageLayout />
        </div>
    )
}


export default ProfilePage;

