export interface ISendOTP {
    email: string
}

export interface IVerifyOTP{
    email: string;
    otp: string;
}

export interface ILoginInfo {
    email: string;
    password: string;
}

export interface ILoginResponseData {
  accessToken: string
  refreshToken: string
  user: User
}

export interface IRegisterInfo {
    name: string
    email: string
    password: string
    phone?: string
    address?:string
}

export interface IUpdateUserInfo {
    _id: string,
    name?: string
    email?: string
    password?: string
    phone?: string
    address?:string
}

export interface IRegisterResponseData {
  name: string
  email: string
  password: string
  role: string
  phone: string
  address: string
  isDeleted: boolean
  isActive: string
  isVerified: boolean
  auths: Auth[]
  _id: string
  createdAt: string
  updatedAt: string
}

export interface Auth {
  provider: string
  providerId: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  phone: string
  address: string
}