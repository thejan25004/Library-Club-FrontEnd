import type {User, UserWithOutPassword} from "../types/User"
import apiClient from "./apiClient"

export interface SignUpResponse {
    message: string
}

export interface LoginResponse {
    accessToken: string
    user: {
        _id: string,
        email: string,
    }
}

export interface LogoutResponse {
    message: string
}

export interface PasswordChangeData {
    userId: string
    currentPassword: string
    newPassword: string
}

export const signUp = async (userData: User): Promise<SignUpResponse> => {
    const response = await apiClient.post("/auth/register", userData)
    return response.data
}

export const login = async (loginData: Omit<User, "role" | "name">): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", loginData)
    return response.data
}

export const logout = async (): Promise<LogoutResponse> => {
    const response = await apiClient.post("/auth/logout")
    return response.data
}

export const getAllUsers = async () : Promise<UserWithOutPassword[]> => {
    const response = await apiClient.get("/auth/")
    return response.data
}

export const changePassword = async (passwordData : PasswordChangeData) : Promise<void> => {
    await apiClient.post("/auth/changePassword", passwordData)
}
