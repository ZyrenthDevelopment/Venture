import axios, { AxiosHeaders } from "axios";
import ApiConfig from "./types/ApiConfig";

export default class Api {
    apiConfig: ApiConfig;
    token: string;
    uId: string;
    private baseUrl: string;

    constructor (apiConfig: ApiConfig, token?: string) {
        this.apiConfig = apiConfig;

        if (token) {
            this.token = token;
            this.uId = Buffer ? Buffer.from(token.split('.')[0], 'base64').toString() : atob(token.split('.')[0]);
        }

        this.baseUrl = `${apiConfig.baseUrl}v${apiConfig.version}/`;
    }

    private async request (method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE', endpoint: string[], headers: AxiosHeaders = new AxiosHeaders(), body?: Object) {
        const url = `${this.baseUrl}${endpoint.filter(x => x.replaceAll(' ', '') !== '').join('/')}`;

        headers.set('Content-Type', 'application/json');
        if (this.token) headers.set('Authorization', this.token);
        else throw new Error('No token provided');

        const response = await axios({
            method: method.toLowerCase(),
            url: url,
            data: body,
            headers: headers
        });

        return response;
    };

    async get (endpoint: string, headers?: AxiosHeaders) {
        return await this.request('GET', endpoint.split('/'), headers);
    }

    async post (endpoint: string, body?: Object, headers?: AxiosHeaders) {
        return await this.request('POST', endpoint.split('/'), headers, body);
    }

    async patch (endpoint: string, body?: Object, headers?: AxiosHeaders) {
        return await this.request('PATCH', endpoint.split('/'), headers, body);
    }

    async put (endpoint: string, body?: Object, headers?: AxiosHeaders) {
        return await this.request('PUT', endpoint.split('/'), headers, body);
    }

    async options (endpoint: string, headers?: AxiosHeaders) {
        return await this.request('OPTIONS', endpoint.split('/'), headers);
    }

    async delete (endpoint: string, headers?: AxiosHeaders) {
        return await this.request('DELETE', endpoint.split('/'), headers);
    }
}