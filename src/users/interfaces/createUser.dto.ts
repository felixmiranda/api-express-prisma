export interface ICreateUserDto {
  dni: string
  email: string
  name: string
  password: string
  roleId?: number
}
