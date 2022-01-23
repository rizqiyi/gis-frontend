const headData = [
  {
    title: 'Nama',
    selector: 'fullname',
  },
  { title: 'Email', selector: 'email' },
  {
    title: 'Role',
    selector: 'role_name',
  },
  {
    title: 'Jalur',
    selector: 'manage',
  },
]

const sortScore = {
  fullname: 1,
  email: 2,
  sub_district: 3,
  role_name: 4,
  manage: 5,
}

export { headData, sortScore }
