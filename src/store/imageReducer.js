const initialState = {
  images: [],
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_IMAGES":
      return { ...state, images: action.payload };
    default:
      return state;
  }
};

export default imagesReducer;
