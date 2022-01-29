const fields = [
  {
    name: 'password',
    placeholder: 'Masukkan password lama',
    label: 'Password Lama',
    type: 'input-password',
  },
  {
    name: 'newPassword',
    placeholder: 'Masukkan password baru',
    label: 'Password Baru',
    type: 'input-password',
  },
  {
    name: 'verifyNewPassword',
    placeholder: 'Konfirmasi password',
    label: 'Konfirmasi Password',
    type: 'input-password',
  },
]

export interface IUserForm {
  password: string
  newPassword: string
  verifyNewPassword: string
}

export default fields
