import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthInitialState = {
  itemId: string | number | null;
  showDeleteModal: boolean;
  showSuccessModal: boolean;
};
const initialState: AuthInitialState = {
  itemId: null,
  showDeleteModal: false,
  showSuccessModal: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setItemId: (state, { payload }) => {
      state.itemId = payload;
    },
    setShowDeleteModal: (state, { payload }) => {
      state.showDeleteModal = payload;
    },
    setShowSuccessModal: (state, { payload }) => {
      state.showSuccessModal = payload;
    },
    removeItemId: (state) => {
      state.itemId = null;
    },
  },
});

const generalState = (state: RootState) => state.general;

const { setItemId, removeItemId, setShowDeleteModal, setShowSuccessModal } =
  generalSlice.actions;

export {
  generalState,
  setItemId,
  removeItemId,
  setShowDeleteModal,
  setShowSuccessModal,
};

export default generalSlice.reducer;