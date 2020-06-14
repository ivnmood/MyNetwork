import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "7178d77c-d634-460c-94ef-2f90ebb75b52"
    }

})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    }
}

export const followAPI = {
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
    }
}


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("data", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)

    },
    loginUser(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logoutUser() {
        return instance.delete(`auth/login`)
    }

}


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}