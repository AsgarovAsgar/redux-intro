import { createStore } from 'redux'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload
      }
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload
      }
    case 'account/requestLoan':
      if (state.loan > 0) return state
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan
      }
    default:
      return state
  }
}

const store = createStore(reducer)

store.dispatch({ type: 'account/deposit', payload: 1000 })
console.log(store.getState()) // { balance: 1000, loan: 0, loanPurpose: '' };

store.dispatch({ type: 'account/withdraw', payload: 200 })
console.log(store.getState()) // { balance: 800, loan: 0, loanPurpose: '' };

store.dispatch({ type: 'account/requestLoan', payload: { amount: 500, purpose: 'car' } })
console.log(store.getState()) // { balance: 800, loan: 500, loanPurpose: 'car' };

store.dispatch({ type: 'account/payLoan' })
console.log(store.getState()) // { balance: 300, loan: 0, loanPurpose: '' };
