/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { message as Antdmessage } from "antd"
// import { useRouter } from "next/navigation"



interface AxiosInstanceType extends AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>

}


export const CreateAxiosInstance = (config?: AxiosRequestConfig): AxiosInstanceType => {
    const instance = axios.create({
        timeout: 100000,
        ...config
    })
    // const router = useRouter()

    instance.interceptors.request.use(

        function (config) {
            const userStorage = localStorage.getItem('user')
            // console.log(userStorage)
            const token = userStorage ? JSON.parse(userStorage).token : ''
            config.headers['Authorization'] = 'Bearer ' + token
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        function (response) {
            const { status, message } = response.data as any
            if (status === 200) {
                return response.data
            } else if (status == 401) {
                return window.location.href = '/login'
            } else {
                Antdmessage.error(message || '请求失败')
            }

        },
        function (error) {
            if (error.response && error.response.status === 401) {
                return window.location.href = '/login'
            }
            Antdmessage.error(error?.response?.message || '请求失败2')
            return Promise.reject(error)
        }
    )
    return instance
}

const request = CreateAxiosInstance({});
export default request