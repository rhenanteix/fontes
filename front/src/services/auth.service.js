import api from "./index";

class authService {
    async set(
        json,
        onSucces,
        onError
    ) {
        return await api.post('users/auth', json).then(response => onSucces(response)).catch(error => onError(error));
    }

    async create(
        json,
        onSuccess,
        onError
    ) {
        return await api.post('users', json).then(response => onSuccess(response)).catch(error => onError(error));
    }
}

export const loginService = new authService();