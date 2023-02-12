import api from "./index";

class project {
    async get(
        onSuccess,
        onError) {
        return await api.get('projects').then(response => onSuccess(response)).catch(error => onError(error));
    }

    async set(
        json,
        onSuccess,
        onError
    ) {
        return await api.post('project', json).then(response => onSuccess(response)).catch(error => onError(error));
    }

    async update(
        id,
        json,
        onSuccess,
        onError
    ) {
        return await api.put(`projects/${id}`, json).then(response => onSuccess(response)).catch(error => onError(error));
    }

    async makeDone(
        id,
        onSuccess,
        onError
    ) {
        return await api.patch(`projects/${id}/done`).then(response => onSuccess(response)).catch(error => onError(error));
    }

    async delete(
        id,
        onSuccess,
        onError
    ) {
        return await api.delete(`projects/${id}`).then(response => onSuccess(response)).catch(error => onError(error));
    }

    async getWithZipCode(
        id,
        onSuccess,
        onError
    ) {
        return await api.get(`project`).then(response => onSuccess(response)).catch(error => onError(error));
    }
}

export const projectService = new project();