export const orderReducer = (state, action) => {
    switch(action.type) {
        case 'SAVE_ORDER':
            return {
                ...state,
                unitInputs: action.payload.unitInputs,
                totalUnits: action.payload.totalUnits,
                orderValue: action.payload.orderValue,
            };
            default:
      return state;
    }
}