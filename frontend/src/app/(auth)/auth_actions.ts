import { apiFetch } from "@/lib/api";

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
type signupResponse = {success: boolean}
type loginResponse = { success: boolean; JWT: string};
type authResult = { success: true; data: loginResponse | signupResponse } | { success: false; error: string };

export default function authActions(){
    const signup = async(input: signup_input): Promise<authResult> => {
        if(input.username == "" || input.password == "" || input.email == ""){
            return{success: false, error: "All inputs must be filled"}  
        }
        try {
            input.setIsLoading(true);
            const { data, error } = await apiFetch<signupResponse>("/auth/signup", { 
                method: "POST", 
                auth: false, 
                body: { username: input.username, password: input.password, email: input.email }
            });
            input.setIsLoading(false);
            if(error) return{success: false, error: error.msg || "There was an error"};
            if(!data) return{success: false, error: "there was an error"};
            return {success: true, data: data};

        }catch(error){
            input.setIsLoading(false);
            return{success: false, error: "There was a error"};
        } 
    }
    const login = async(input: login_input): Promise<authResult> => {
        if(input.password == "" || input.username == ""){
            return{success: false, error: "All inputs must be filled"}  
        }
        input.setIsLoading(true);
        try {
            const { data, error } = await apiFetch<loginResponse>("/auth/login", { 
                method: "POST", 
                auth: false, 
                body: { username: input.username, password: input.password }
            });
            if (error) return { success: false, error: error.msg };
            if(!data) return {success: false, error: "There was a issue"}
            if (!data.success) return { success: false, error: "Invalid username or password" };
                input.setIsLoading(false);
                input.saveKey(data.JWT);
                return ({success: true, data});
        } catch (error){
            console.log(error);
            input.setIsLoading(false);
            return{success: false, error: "There was a error"};
        }
    }
    return { signup, login };
}
