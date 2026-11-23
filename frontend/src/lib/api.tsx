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
type Response = { 
    data: JSON| null; 
    error?: ErrorResponse | null;
};
export async function apiFetch(path: string, options: Options): Promise<Response> {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    
    if (options.auth) {
        const token = await SecureStore.getItemAsync("biodex_jwt");
        if (token) headers.Authorization = `Bearer ${token}`;
        else return { data: null, error: { code: 401, msg: "Unauthorized" } };
    }

    const res = await fetch(`${baseUrl}${path}`, {
        method: options.method,
        headers,
        body: options.body ? JSON.stringify(options.body) : null,
    });
    
    const data = await res.json().catch(() => null)
    
    if (!res.ok) return { data: null, error: { code: res.status, msg: data.error?  data.error : "There was an error"} }
    
    return {data: data};
}