export interface IAuthenticateRequestDTO {
  email: string
  password: string
}

export interface IAuthenticateResponseDTO {
  user: {
    id: string
    email: string
  }
  token: string
}
