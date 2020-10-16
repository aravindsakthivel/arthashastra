import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory , Redirect} from "react-router-dom";
import SideDrawer from '../SideDrawer'
import Transactions from './Transactions'
import FilterandSort from './FilterandSort'
import SimplePaper from './FunctionHolder'


const LedgerLayout = () => {
    return(
        <SideDrawer>
            <FilterandSort />
            <Transactions />
        </SideDrawer>
    )
}


export default LedgerLayout;