// import { SET_ORDER} from '../actiontypes/orderActionType'
// import { SET_SALE_RETURN } from '../actiontypes/orderActionType'
import { SET_ORDER, SET_SALE_RETURN,RESET_ORDER, RESET_RETURN, SET_MSD_ACTIVITY,RESET_MSD_ACTIVITY,REJECT_LEAVE} from '../actiontypes/orderActionType';



export const setOrder = (orderData) => ({
    /////////////////////used to identify the action in a Redux reducer//////////////
  type: SET_ORDER,

  /////////////////////////reducer will use this payload to update the state accordingly///////////
  payload: orderData,
});



export const setSaleReturn = (saleReturnData) => ({
    type: SET_SALE_RETURN,
    payload: saleReturnData,
  });


  export const msdActivity = (msdActivityData) => ({
    type: SET_MSD_ACTIVITY,
    payload: msdActivityData,
  });


  export const setResetOrder = (orderData) => ({
    type: RESET_ORDER,
    payload: orderData,
  });

  export const setResetReturn = (saleReturnData) => ({
    type: RESET_RETURN,
    payload: saleReturnData,
  });

  export const setResetMsdActivity = () => ({
    type: RESET_MSD_ACTIVITY,
  });


  export const rejectLeave = (leaveData) => ({
    type: REJECT_LEAVE,
    payload: leaveData,
  });
  
  