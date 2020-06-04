import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "085d8bea-09cb-43a3-9bc5-5b7b76e2e1d4"
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
        return instance.put(`profile/status`, { status: status })
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)

    },
    loginUser(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logoutUser(id) {
        return instance.delete(`auth/login`)
    }

}
