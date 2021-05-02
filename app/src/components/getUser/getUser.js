import jwt_decode from "jwt-decode";

//
export default function parseJWT() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user !== null) {
        let decodeToken = jwt_decode(user.token);
        return decodeToken;
    }
    else {
        return null;
    }
        
}