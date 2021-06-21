import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getVegPizzas = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PIZZA_VEG_REQUEST });

      const { data } = await axios.get("/api/pizzas/veg");
      dispatch({ type: actionTypes.PIZZA_VEG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_VEG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getNonVegPizzas = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PIZZA_NONVEG_REQUEST });

      const { data } = await axios.get("/api/pizzas/nonveg");
      dispatch({ type: actionTypes.PIZZA_NONVEG_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_NONVEG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getPizzamaniaPizzas = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PIZZA_PIZZAMANIA_REQUEST });

      const { data } = await axios.get("/api/pizzas/pizzamania");
      dispatch({ type: actionTypes.PIZZA_PIZZAMANIA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_PIZZAMANIA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getAllPizzas = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.PIZZA_ALL_REQUEST });

      const { data } = await axios.get("/api/pizzas");
      dispatch({ type: actionTypes.PIZZA_ALL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_ALL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deletePizza = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PIZZA_DELETE_REQUEST });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`/api/pizzas/${id}`, config);

      dispatch({
        type: actionTypes.PIZZA_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const pizzaCreate = (formData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PIZZA_CREATE_REQUEST });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(`/api/pizzas`, formData, config);

      dispatch({
        type: actionTypes.PIZZA_CREATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updatePizza = (formData, id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PIZZA_UPDATE_REQUEST });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`/api/pizzas/${id}`, formData, config);

      dispatch({
        type: actionTypes.PIZZA_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const pizzaInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PIZZA_DETAILS_REQUEST });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/pizzas/${id}`, config);

      dispatch({
        type: actionTypes.PIZZA_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PIZZA_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
