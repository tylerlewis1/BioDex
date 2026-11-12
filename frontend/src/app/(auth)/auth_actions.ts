type signup_input = {
    username: string,
    email: string,
    password: string
    setIsLoading: (value: boolean) => void,
};
type login_input = {
    username: string,
    password: string
    setIsLoading: (value: boolean) => void,
    saveKey: (token: string) => void
};
type AuthResponse = {
  success: boolean;
  data?: any;
  error?: string;
};
export default function authActions(){
    const signup = async(input: signup_input): Promise<AuthResponse> => {
        if(input.username == "" || input.password == "" || input.email == ""){
            return{success: false, error: "All inputs must be filled"}  
        }
        input.setIsLoading(true);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": input.username,
                    "email": input.email,
                    "password": input.password,
                }),
            });
            let resJson = await response.json();
            if(resJson.error){
                input.setIsLoading(false);
                return ({success: false, error: resJson.error});
            } 
            if(resJson.success == true){
                input.setIsLoading(false);
                return ({success: true, data: resJson.id});
            }
        } catch (error){
            console.log(error);
            input.setIsLoading(false);
            return{success: false, error: "There was a error"};
        }
    }

    const login = async(input: login_input): Promise<AuthResponse> => {
        if(input.password == "" || input.username == ""){
            return{success: false, error: "All inputs must be filled"}  
        }
        input.setIsLoading(true);
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": input.username,
                    "password": input.password,
                }),
            });
            let resJson = await response.json();
            if(resJson.error){
                input.setIsLoading(false);
                return ({success: false, error: resJson.error});
            } 
            if(resJson.success == true){
                input.setIsLoading(false);
                input.saveKey(resJson.JWT);
                return ({success: true, data: resJson});
            }
        } catch (error){
            console.log(error);
            input.setIsLoading(false);
            return{success: false, error: "There was a error"};
        }
    }
    return { signup, login };
}
