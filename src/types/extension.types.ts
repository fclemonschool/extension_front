export type {Extension, ExtensionUpdate}

interface Extension {
  id?: string
  fileExtension: string
  type: 'FIXED' | 'CUSTOM'
  used: boolean
}

interface ExtensionUpdate {
  used: boolean
}
