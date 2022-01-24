const fields = [
  {
    name: 'username',
    placeholder: 'Masukkan nama pengguna',
    label: 'Nama Pengguna',
    type: 'input',
  },
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
  username: string
  email: string
  manage: string
  avatar: string
}

export default fields
