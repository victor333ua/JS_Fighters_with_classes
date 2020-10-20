import {API_URL} from "../constants/url";

export class FighterService {

    async callApi(endpoint, method) {
        const options = { method };

        const response = await fetch(API_URL + endpoint, options);
        if(!response.ok) throw new Error("failed to fetch");
        const fighters = await response.json();
        return JSON.parse(atob(fighters.content));
    }

    async getFighters() {
        try {
            const endpoint = 'fighters.json';
            return await this.callApi(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        const endpoint = `details/fighter/${id}.json`;

        try  {
            return await this.callApi(endpoint, 'GET');
        } catch (error) {
            throw error;
        }
    }
}