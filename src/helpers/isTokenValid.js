import {jwtDecode} from "jwt-decode";

function isTokenValid(token){
    try {
        const decodedToken = jwtDecode(token);

        if(!decodedToken || !decodedToken.exp) {
            return false
        }
        const currentTime = Math.floor(Date.now()/1000);
        return currentTime < decodedToken.exp;
    } catch (e){
        console.error("Token expired", e)
        return false;
    }
}

export default isTokenValid;