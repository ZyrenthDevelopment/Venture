import axios from "axios";
import mergeObjects from "./objectMerger";
import ApiConfig from "./types/ApiConfig";
import User from "./types/User";

export default function fetchUserNext(apiConfig: ApiConfig, token: string, setUser: Function, defaultUser: User) {
    axios.get(`${apiConfig.baseUrl}v${apiConfig.version}/users/${atob(token.split('.')[0])}/profile`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        validateStatus: (status) => true
    }).then(response => {
        const user = mergeObjects(defaultUser, response.data?.user, response.data?.user_profile, {
            premium_since: response.data?.premium_since,
            premium: response.data?.premium,
            premium_type: response.data?.premium_type
        }) ?? defaultUser;
        
        setUser(user);
    }).catch(error => setUser(defaultUser));
}