import React from "react";
import SideDrawer from '../SideDrawer'
import Transactions from './Transactions'
import FilterandSort from './FilterandSort'


const LedgerLayout = () => {
    return(
        <SideDrawer>
            <FilterandSort />
            <Transactions />
        </SideDrawer>
    )
}


export default LedgerLayout;