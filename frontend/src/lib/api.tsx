import * as SecureStore from "expo-secure-store";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

type Options = { 
    method?: "GET" | "POST"; 
    body?: unknown; 
    auth?: boolean;
};
type ErrorResponse = {
    code: number;
    msg: string;
}
type Response<T> = { 
    data: T | null; 
    error: ErrorResponse | null;
};
export async function apiFetch<T>(path: string, options: Options): Promise<Response<T>> {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    
    if (options.auth) {
        const token = await SecureStore.getItemAsync("biodex_jwt");
        if (token) headers.Authorization = `Bearer ${token}`;
        else return { data: null, error: { code: 401, msg: "Unauthorized" } };
    }
    try {
        const res = await fetch(`${baseUrl}${path}`, {
            method: options.method,
            headers,
            body: options.body ? JSON.stringify(options.body) : null,
        });
        
        const data = await res.json().catch(() => null);
        
        if (!res.ok) return { data: null, error: { code: res.status, msg: data.error?  data.error : "There was an error"} }
        
        return {data: data, error: null };
    } catch (error){
        return {data: null, error: { code: 0, msg: "Network error" }};
    }
}