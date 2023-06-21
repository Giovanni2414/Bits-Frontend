require("dotenv").config();

module.exports = {
    env: {
        REACT_APP_BACKEND_URL1: process.env.REACT_APP_BACKEND_URL,
        REACT_APP_BACKEND_PORT: process.env.REACT_APP_BACKEND_PORT
    }
}