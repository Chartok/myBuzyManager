export function validateAlpha(value) {
    const pattern = /^[a-zA-Z ]+$/;
    return pattern.test(value) || 'Please enter a valid value.';
}

export function validatePositiveInteger(value) {
    const pattern = /^[1-9]\d*$/;
    return pattern.test(value) || 'Please enter a valid positive integer.';
}
