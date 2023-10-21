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

    async request (method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE', endpoint: string[], headers: AxiosHeaders = new AxiosHeaders(), body?: Object) {
        const url = `${this.baseUrl}${endpoint.join('/')}`;

        headers.set('Content-Type', 'application/json');
        if (this.token) headers.set('Authorization', this.token);

        const response = await axios({
            method: method.toLowerCase(),
            url: url,
            data: body,
            headers: headers
        });

        return response;
    };
}