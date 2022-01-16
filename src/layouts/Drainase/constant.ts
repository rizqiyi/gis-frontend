const headData = [
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

const sortScore = {
  createdAt: 1,
  district: 2,
  sub_district: 3,
  street_name: 4,
  street_width: 5,
  sta: 6,
  is_published: 7,
}

export { headData, sortScore }
