import axios from 'axios';

const Actions = {}

export const SET_NAME = "SET_NAME"
export const GET_LIST = "GET_LIST"

Actions.setName = function setName(selected_name) {
  return {
    type: SET_NAME,
    selected_name
  }
}

Actions.getList = function getList() {
  return dispatch => {
    /* mocking api call - don't change */
    const list = ["You", "Cole", "James", "Radu"]
    setTimeout(function() {
      dispatch({
        type: GET_LIST,
        payload: {
          list
        }
      })
    }, 1500);
    /* End mock */
  }
}

Actions.getOrderedListFromApi = function getOrderedList() {
  return dispatch => {
    const list = [ "James", "Jono", "John", "Radu", "Cole", "Italo" ]
    const payload = { names: list };

    axios.post(
      'http://localhost:3001/sort-names',
      payload,
      )
      .then((resp) => {
        if (resp.data) {
          dispatch({
            type: GET_LIST,
            payload: {
              list: resp.data
            }
          })
        } else {
          throw new Error('no data returned')
        }
      })
      .catch(err => console.log(err));
  }
}

export default Actions
