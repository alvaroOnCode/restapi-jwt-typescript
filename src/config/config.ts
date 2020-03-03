export default {
    DB: {
        URI: process.env.DB_URI || 'mongodb://localhost/restapi-jwt-typescript',
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD
    },

    JWT: {
        SECRET: process.env.JWT_SECRET || 'ssshhhhh!!!'
    },

    SERVER: {
        PORT: process.env.SERVER_PORT || 3000
    }
}