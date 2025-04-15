import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      reducer(state, action) {
        if (state.loan > 0) return
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      },
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose }
        }
      }
    },
    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    }
  }
})

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions

export default accountSlice.reducer

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false
//       }
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload
//       }
//     case 'account/requestLoan':
//       if (state.loan > 0) return state
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount
//       }
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan
//       }
//     case 'account/convertCurrency':
//       return { ...state, isLoading: true }
//     default:
//       return state
//   }
// }

// function deposit(amount, currency) {
//   const BASE_CURRENCY = 'USD'
//   if (currency === BASE_CURRENCY) {
//     return { type: 'account/deposit', payload: amount }
//   }

//   // behaves like a middleware
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertCurrency' })

//     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=${BASE_CURRENCY}`)
//     const data = await res.json()
//     console.log('data', data)
//     const converted = data.rates[BASE_CURRENCY]
//     dispatch({ type: 'account/deposit', payload: converted })
//   }
// }
// function withdraw(amount) {
//   return {
//     type: 'account/withdraw',
//     payload: amount
//   }
// }
// function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount, purpose }
//   }
// }
// function payLoan() {
//   return {
//     type: 'account/payLoan'
//   }
// }

// export { deposit, withdraw, requestLoan, payLoan }
