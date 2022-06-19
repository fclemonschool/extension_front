import {Extension, ExtensionUpdate} from "../types/extension.types";
import axios from "axios";
import {ListResponse} from "../types/response.types";

class ExtensionService {
  private baseUrl = '/api/v1/extensions'

  async create(data: Extension): Promise<Extension> {
    const response = await axios.post<Extension>(this.baseUrl, data)
    return response.data
  }

  async updateUsed(id: string, data: ExtensionUpdate): Promise<Extension> {
    const response = await axios.patch<Extension>(this.baseUrl.concat(`/${id}`), data)
    return response.data
  }

  async delete(id: string): Promise<Extension> {
    const response = await axios.delete<Extension>(this.baseUrl.concat(`/${id}`))
    return response.data
  }

  async listByType(type: 'FIXED' | 'CUSTOM'): Promise<ListResponse<Extension>> {
    const response = await axios.get<ListResponse<Extension>>(this.baseUrl.concat(`?type=${type}`))
    return response.data
  }
}

export default new ExtensionService()
