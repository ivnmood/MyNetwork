import axios from "axios";
import {photosType, profileType, userType} from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "7178d77c-d634-460c-94ef-2f90ebb75b52"
    }

})


type PutDeleteRequestResponse = {
    data: {}
    resultCode: ResultCode
    messages: Array<string>
}


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<userType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}

export const followAPI = {
    unfollowUser(id: number) {
        return instance.delete<PutDeleteRequestResponse>(`follow/${id}`)
    },
    followUser(id: number) {
        return instance.post<PutDeleteRequestResponse>(`follow/${id}`)
    }
}


type SavePhotoResponse = {
    data: photosType
    resultCode: ResultCode
    messages: Array<string>
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<PutDeleteRequestResponse>(`profile/status`, {status})
    },
    saveProfile(profile: profileType) {
        return instance.put<PutDeleteRequestResponse>(`profile`, profile)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("data", photoFile)
        return instance.put<SavePhotoResponse>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}


export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCode
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCode
    messages: Array<string>

}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)

    },
    loginUser(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logoutUser() {
        return instance.delete<PutDeleteRequestResponse>(`auth/login`)
    }

}


type CaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>(`security/get-captcha-url`)
    }
}
