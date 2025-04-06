import { combineReducers, createStore } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ''
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: ''
}

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/create':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt
      }
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer)

// store.dispatch({ type: 'account/deposit', payload: 1000 })
// console.log(store.getState()) // { balance: 1000, loan: 0, loanPurpose: '' };

// store.dispatch({ type: 'account/withdraw', payload: 200 })
// console.log(store.getState()) // { balance: 800, loan: 0, loanPurpose: '' };

// store.dispatch({ type: 'account/requestLoan', payload: { amount: 500, purpose: 'car' } })
// console.log(store.getState()) // { balance: 800, loan: 500, loanPurpose: 'car' };

// store.dispatch({ type: 'account/payLoan' })
// console.log(store.getState()) // { balance: 300, loan: 0, loanPurpose: '' };

function deposit(amount) {
  return {
    type: 'account/deposit',
    payload: amount
  }
}
function withdraw(amount) {
  return {
    type: 'account/withdraw',
    payload: amount
  }
}
function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose }
  }
}
function payLoan() {
  return {
    type: 'account/payLoan'
  }
}

// Example usage
store.dispatch(deposit(1000))
store.dispatch(withdraw(200))
store.dispatch(requestLoan(500, 'car'))
store.dispatch(payLoan())

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/create',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() }
  }
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName
  }
}

store.dispatch(createCustomer('John Doe', '123456789'))
store.dispatch(updateName('Jane Doe'))
console.log(store.getState()) // { account: { balance: 300, loan: 0, loanPurpose: '' }, customer: { fullName: 'Jane Doe', nationalID: '123456789', createdAt: '2023-10-03T12:34:56.789Z' } }
