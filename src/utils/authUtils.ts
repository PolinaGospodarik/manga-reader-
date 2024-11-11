// Сохранение токенов в localStorage
export function saveTokensToLocalStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
}

// Получение токенов из localStorage
export function getTokensFromLocalStorage() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    return { accessToken, refreshToken };
}

// Удаление токенов из localStorage
export function removeTokensFromLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}
