const headDataDrainase = [
  {
    title: 'Tanggal Dibuat',
    selector: 'createdAt',
    style: {
      minWidth: '120px',
    },
  },
  { title: 'Kabupaten', selector: 'district' },
  { title: 'Kecamatan', selector: 'sub_district' },
  {
    title: 'Nama Ruas Jalan',
    selector: 'street_name',
  },
  {
    title: 'Lebar Jalan',
    selector: 'street_width',
  },
  { title: 'STA', selector: 'sta' },
  { title: 'Status', selector: 'is_published' },
]

const sortScoreDrainase = {
  createdAt: 1,
  district: 2,
  sub_district: 3,
  street_name: 4,
  street_width: 5,
  sta: 6,
  is_published: 7,
}

const headDataUsers = [
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

const sortScoreUsers = {
  fullname: 1,
  email: 2,
  sub_district: 3,
  role_name: 4,
  manage: 5,
}

const dynamicData = {
  typicalTrapesium: 'typicalTrapesium',
  typicalShapeU: 'typicalShapeU',
  typicalRect: 'typicalRect',
  typicalBronjong: 'typicalBronjong',
  goodCondition: 'goodCondition',
  lightBroken: 'lightBroken',
  mediumBroken: 'mediumBroken',
  heavyBroken: 'heavyBroken',
}

export {
  headDataDrainase,
  sortScoreDrainase,
  headDataUsers,
  sortScoreUsers,
  dynamicData,
}
