import { IUser } from '@/interfaces/IUser';

const EMAIL = 'fulano@hotmail.com'
const PASSWORD = 'senha123'

export const authApi = {
    login(email: string, passorwd: string): IUser | string {
        if (email !== EMAIL || passorwd !== PASSWORD) {
            return 'Email ou senha inválidos'
        }
        console.log('email', email)
        return email
    }
}