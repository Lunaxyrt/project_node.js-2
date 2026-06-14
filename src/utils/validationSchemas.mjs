export function validateRegistration(data) {
    const errors = {};

    if (!data.username || data.username.trim().length < 5) {
        errors.username = "Username має бути мінімум 5 символи";
    }

    if (!data.password || data.password.length < 8) {
        errors.password = "Пароль має бути мінімум 8 символів";
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Паролі не співпадають";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
        errors.email = "Некоректний email";
    }

    if (data.email !== data.confirmEmail) {
        errors.confirmEmail = "Email не співпадає";
    }

    return errors;
}
