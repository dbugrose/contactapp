export interface Contacts {
    id: number
    userId: number
    name: string
    email: string
    phone: string
}

export interface Contact {
    userId: number
    name: string
    email: string
    phone: string
}
export interface Token {
    token: string
}

export interface UserData {
    id: number
    username: string
}

export interface UserInfo {
    username: string
    password: string
}

export interface AuthContextType {
  token: string;
  userId: number;
  username: string;
}