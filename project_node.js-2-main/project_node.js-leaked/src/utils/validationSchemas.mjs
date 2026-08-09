export function validateLogin(data) {
    const errors = {};

    if (!data.username || data.username.trim().length < 5) {
        errors.username = "login must be at least 5 symbols";
    }

    if (!data.password || data.password.length < 8) {
        errors.password = "password must contain atleast 8 symbols";
    }

    return errors;
}
