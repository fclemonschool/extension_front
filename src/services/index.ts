import axios, {AxiosError, AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {ErrorResponse} from "../types/response.types";

export {default as extensionService} from './extension'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const method = response?.config.method?.toUpperCase()
    const status = response?.status
    if (status === 201 && method === 'POST') {
      toast.success('등록에 성공했습니다.')
    } else if (status === 204 && method === 'DELETE') {
      toast.success('삭제에 성공했습니다.')
    } else if (status === 200 && method === 'PUT') {
      toast.success('수정에 성공했습니다.')
    }
    return response
  },
  (error: AxiosError) => {
    let message = '요청을 처리할 수 없습니다.'
    const status = error.response?.status
    if (status === 401) {
      message = '인증 정보가 없습니다.'
    } else if (status === 404) {
      message = '찾을 수 없습니다.'
    } else if (status === 400) {
      let errorData: ErrorResponse = error.response?.data as ErrorResponse
      if (errorData.detail) {
        for (const [, value] of Object.entries(errorData.detail)) {
          message = `${value}`
        }
      } else {
        message = errorData.errorMessage
      }
    }
    toast.error(message)
    throw new Error()
  },
)
