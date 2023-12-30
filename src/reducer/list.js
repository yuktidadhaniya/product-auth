import { createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const counterSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
  },

  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    },
    editList: (state, action) => {
      const updatedData = state.list.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      state.list = updatedData;
    },
    deleteList: (state, action) => {
      const itemId = action.payload;
      state.list = state.list.filter((item) => item.id !== itemId);
    },
    getCategory: (state, action) => {
      state.list = action.payload;
    },
    addProduct: (state, action) => {
      console.log('state: ', action);
      const AddList = [...current(state).list];
      const newList = action.payload;
      AddList.unshift(newList);
      state.list = AddList;
    },
  },
});

export const { setUserList, deleteList, editList, getCategory, addProduct } =
  counterSlice.actions;

export const fetchAllUsers = (handleSuccessFetchData) => (dispatch) => {
  axios
    .get('https://dummyjson.com/products')
    .then((response) => {
      dispatch(setUserList(response.data.products));
      handleSuccessFetchData();
    })
    .catch((error) => console.log(error));
};
export const editProduct = (body, id) => (dispatch) => {
  axios
    .put(`https://dummyjson.com/products/${id}`, body)
    .then((response) => {
      dispatch(editList(response.data));
    })
    .catch((error) => console.log(error));
};

export const deleteProduct = (id) => (dispatch) => {
  axios
    .delete(`https://dummyjson.com/products/${id}`)
    .then((response) => {
      dispatch(deleteList(response.data.id));
    })
    .catch((error) => console.log(error));
};

export const productCategory = (category) => (dispatch) => {
  axios
    .get(`https://dummyjson.com/products/category/${category}`)
    .then((response) => {
      dispatch(getCategory(response.data.products));
    })
    .catch((error) => console.log(error));
};
export const addProductList = (body) => (dispatch) => {
  console.log('body: ', body);

  axios
    .post('https://dummyjson.com/products/add', body)
    .then((response) => {
      console.log('response: ', response);
      dispatch(addProduct(response.data));
    })
    .catch((error) => console.log(error));
};

export default counterSlice.reducer;
