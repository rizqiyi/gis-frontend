const fields = [
  {
    name: 'fullname',
    placeholder: 'Masukkan nama',
    label: 'Nama',
    type: 'input',
  },
  {
    name: 'email',
    placeholder: 'Masukkan email',
    label: 'Email',
    type: 'input',
  },
  {
    name: 'password',
    placeholder: 'Masukkan password',
    label: 'Password Baru',
    type: 'input-password',
  },
  {
    name: 'role_name',
    placeholder: 'Pilih role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'Admin' },
      { label: 'Super Admin', value: 'Super Admin' },
    ],
  },
  {
    name: 'manage',
    placeholder: 'Pilih jalur',
    label: 'Jalur',
    type: 'select',
    options: [
      { label: 'Jalur A', value: 'A' },
      { label: 'Jalur B', value: 'B' },
    ],
  },
]

export interface IUserForm {
  fullname: string
  email: string
  manage: string
  role_name: string
  password: string
  avatar: Blob | string
}

export default fields
