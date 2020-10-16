import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory , Redirect} from "react-router-dom";
import LedgerLayout from '../Components/Ledger/Layout'


const LedgerPage = () => {
    return(
        <LedgerLayout />
    )
}


export default LedgerPage;