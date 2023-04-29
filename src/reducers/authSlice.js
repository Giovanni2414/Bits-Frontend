import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: false,
	},
	reducers: {
		login: (state, action) => {
			state.value = {
				access_token: action.payload.token,
				expire_in: action.payload.expireIn,
				token_type: action.payload.tokenType,
				username: action.payload.username
			}
		},
		logout: state => {
			state.value = false
		}
	}
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer