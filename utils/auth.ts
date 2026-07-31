import RequestService from "@/app/services/RequestService";
import Cookies from "universal-cookie"


const cookies = new Cookies(null, { path: '/' });
const requestService = new RequestService('/api/v1/auth');

export const sendOtpApi = async (email: string) => {
    return await requestService.post({ email });
}

export const verifyOtpApi = async (email: string, otp: string) => {
    const response = await requestService.post({ email, otp });

    if(response?.accessToken) {
        cookies.set('token', response.accessToken, {
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    }

    return response;
}

export const logout = () => {
    cookies.remove('token', { path: '/' });
    window.location.href = '/login';
}