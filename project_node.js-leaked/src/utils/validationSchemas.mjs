export function validateRegistration(data) {
    const errors = {};

    // username
    if (!data.username || data.username.trim().length < 5) {
        errors.username = "Username має бути мінімум 5 символи";
    }

    // password
    if (!data.password || data.password.length < 8) {
        errors.password = "Пароль має бути мінімум 8 символів";
    }

    // confirmPassword
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Паролі не співпадають";
    }

    // email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
        errors.email = "Некоректний email";
    }

    // confirmEmail
    if (data.email !== data.confirmEmail) {
        errors.confirmEmail = "Email не співпадає";
    }

    return errors;
}
