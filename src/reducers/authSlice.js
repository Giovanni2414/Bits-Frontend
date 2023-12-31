import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
	access_token: '',
	expire_in: '',
	token_type: '',
	username: ''
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		value: initialStateValue
	},
	reducers: {
		login: (state, action) => {
			state.value = {
				access_token: action.payload.access_token,
				expire_in: action.payload.expire_in,
				token_type: action.payload.token_type,
				username: action.payload.username
			}
		},
		logout: state => {
			state.value = initialStateValue
		}
	}
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer