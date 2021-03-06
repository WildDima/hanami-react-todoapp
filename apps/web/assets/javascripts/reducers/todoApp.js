import { 
  visibilityFilters,
  SET_VISIBILITY_FILTER,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_SUCCESS,
  CREATE_TODOS_REQUEST,
  CREATE_TODOS_FAILURE,
  CREATE_TODO_SUCCESS,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE
 } from '../actions/todos'

 import { combineReducers } from 'redux'


const { SHOW_ALL } = visibilityFilters

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return(state)
  }
}

const update = (todo, todos) => todos.map(val => (val.id !== todo.id ? val : todo))

const todos = (
  state = { isFetching: false, errors: {}, entities: []},
  action) => {
  switch(action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_TODOS_SUCCESS:
      return { ...state, entities: action.response.todos, isFetching: false }
    case FETCH_TODOS_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }
    case CREATE_TODOS_REQUEST:
      return { ...state, isFetching: true }
    case CREATE_TODO_SUCCESS:
      return { ...state, entities: [ ...state.entities, action.todo] }
    case CREATE_TODOS_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }
    case TOGGLE_TODO_REQUEST:
      return { ...state,
               isFetching: true,
               entities: state.entities.map(val => {
                 if (val.id !== action.id) {
                   return val
                 }
                 return { ...val, finished: !val.finished}
               })
             }
    case TOGGLE_TODO_SUCCESS:
      return { ...state, isFetching: false, entities: update(action.response.data, state.entities) }
    case TOGGLE_TODO_FAILURE:
      return { ...state, isFetching: false, errors: action.errors }
    default:
      return(state)
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp