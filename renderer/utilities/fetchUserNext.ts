import axios from "axios";
import mergeObjects from "./objectMerger";
import ApiConfig from "./types/ApiConfig";
import User from "./types/User";

export default async function fetchUserNext(apiConfig: ApiConfig, token: string, setUser: Function, defaultUser: User, async?: boolean) {
    let req;
    try {
        req = axios.get(`${apiConfig.baseUrl}v${apiConfig.version}/users/${atob(token.split('.')[0])}/profile`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            validateStatus: (status) => true
        });
    } catch (err) {
        setUser(defaultUser)
    }
    
    
    if (async) {
        const response = (await req).data;

        const user = mergeObjects(defaultUser, response.data?.user, response.data?.user_profile, {
            premium_since: response.data?.premium_since,
            premium: response.data?.premium,
            premium_type: response.data?.premium_type
        }) ?? defaultUser;
        
        setUser(user);
    }

    if (!async) req.then(response => {
        const user = mergeObjects(defaultUser, response.data?.user, response.data?.user_profile, {
            premium_since: response.data?.premium_since,
            premium: response.data?.premium,
            premium_type: response.data?.premium_type
        }) ?? defaultUser;
        
        setUser(user);
    }).catch(error => setUser(defaultUser));
}