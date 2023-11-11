export interface IUpdateUserRequestDTO {
  id: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface IUpdateUserDTO {
  id: string
  email?: string
  password?: string
}
