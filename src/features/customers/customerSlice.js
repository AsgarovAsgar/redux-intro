import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: ''
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalID = action.payload.nationalID
        state.createdAt = action.payload.createdAt
      },
      prepare(fullName, nationalID) {
        return {
          payload: { fullName, nationalID, createdAt: new Date().toISOString() }
        }
      }
    },
    updateName(state, action) {
      state.fullName = action.payload
    }
  }
})

export const { createCustomer, updateName } = customerSlice.actions
export default customerSlice.reducer

// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'customer/create':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt
//       }
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload
//       }
//     default:
//       return state
//   }
// }

// function createCustomer(fullName, nationalID) {
//   return {
//     type: 'customer/create',
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() }
//   }
// }

// function updateName(fullName) {
//   return {
//     type: 'customer/updateName',
//     payload: fullName
//   }
// }

// export { createCustomer, updateName }
