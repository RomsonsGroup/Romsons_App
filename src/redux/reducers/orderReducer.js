import { SET_ORDER, SET_SALE_RETURN,RESET_ORDER,RESET_RETURN,SET_MSD_ACTIVITY,RESET_MSD_ACTIVITY } from '../actiontypes/orderActionType';
import { lightTheme, darkTheme } from '../../utils';



const initialState = {
    orderData: [],
    saleReturnData: [],
    msdActivityData: [],
    rejectedLeaves: [],
  };


  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      // case SET_ORDER:
      //   return {
      //     ...state,
      //     orderData: action.payload,  // Store the order data
      //   };

  //     case SET_ORDER:
  // return {
  //   ...state,
  //   orderData: [...state.orderData, ...action.payload],  // ✅ Old + new orders
  // };

  case SET_ORDER:
  return {
    ...state,
    orderData: [
      ...state.orderData.map(existingOrder => {
        const newItem = action.payload.find(order => order.sku_id === existingOrder.sku_id);
        return newItem
          ? { ...existingOrder, itemvalue: newItem.itemvalue, amount: newItem.amount }
          : existingOrder;
      }),
      ...action.payload.filter(order => !state.orderData.some(existing => existing.sku_id === order.sku_id))
    ],
  };



      //   case SET_SALE_RETURN: // New case for Sale Return
      // return {
      //   ...state,
      //   saleReturnData: action.payload, // Store the sale return data
      // };

      case SET_SALE_RETURN: 
  console.log("Payload received:", action.payload);
  console.log("Existing state:", state.saleReturnData);

  return {
    ...state,
    saleReturnData: [
      ...state.saleReturnData.map(existingReturn => {
        const newItem = action.payload.find(returnItem => returnItem.itemId === existingReturn.itemId);
        console.log("New Item:", newItem); // Check if newItem exists

        return newItem
          ? { 
              ...existingReturn, 
              unit: newItem.unit !== undefined ? newItem.unit : existingReturn.unit,
              ITM: newItem.ITM !== undefined ? newItem.ITM : existingReturn.ITM,
              value: newItem.value !== undefined ? newItem.value : existingReturn.value,
            }
          : existingReturn;
      }),
      ...action.payload.filter(returnItem => 
        !state.saleReturnData.some(existing => existing.itemId === returnItem.itemId)
      ),
    ],
  };



      // case SET_MSD_ACTIVITY: // New case for Sale Return
      // return {
      //   ...state,
      //   msdActivityData: action.payload, // Store the MSD  data
      // };

      case SET_MSD_ACTIVITY: 
  return {
    ...state,
    msdActivityData: [
      ...state.msdActivityData.map(existingActivity => {
        const newItem = action.payload.find(activity => activity.itemId === existingActivity.itemId);
        return newItem
          ? { ...existingActivity, value: newItem.value, followup: newItem.followup }
          : existingActivity;
      }),
      ...action.payload.filter(activity => 
        !state.msdActivityData.some(existing => existing.itemId === activity.itemId)
      ),
    ],
  };


      case RESET_ORDER:
        return {
          ...state,
          orderData: [],  // Store the order data
        };
  
        case RESET_RETURN:
            return {
              ...state,
              saleReturnData: [],  // Store the order data
            };

            case RESET_MSD_ACTIVITY:
            return {
              ...state,
              msdActivityData: [],  // Store the order data
            };

            case "REJECT_LEAVE":
      return {
        ...state,
        rejectedLeaves: [...state.rejectedLeaves, ...action.payload], // Add rejected leave
      };
      
      default:
        return state;
    }
  };

