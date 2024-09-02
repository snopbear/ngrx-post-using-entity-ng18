export interface SharedState {
  showLoading: boolean; // show inspector
  errorMessage: string;
}

export const initialState: SharedState = {
  showLoading: false, // show inspector
  errorMessage: '',
};
