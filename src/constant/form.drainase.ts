export const drainaseForm = [
  {
    label: 'Kabupaten',
    name: 'district',
    placeholder: 'Masukkan kabupaten',
    required: true,
  },
  {
    label: 'Kecamatan',
    name: 'sub_district',
    placeholder: 'Masukkan kecamatan',
    required: true,
  },
  {
    label: 'Lebar (m)',
    name: 'street_width',
    required: true,
    placeholder: 'Masukkan lebar',
  },
  {
    label: 'STA (m)',
    name: 'sta',
    required: true,
    placeholder: 'Masukkan STA',
  },
  {
    label: 'Latitude',
    name: 'latitude',
    required: true,
    placeholder: 'Masukkan latitude',
  },
  {
    label: 'Longitude',
    name: 'longitude',
    required: true,
    placeholder: 'Masukkan longitude',
  },
]

export const leftDrainase = [
  {
    label: 'Tipikal',
    type: 'select',
    placeholder: 'Pilih Tipical',
    name: 'left_typical',
    options: [
      { label: 'Trapesium', value: 1 },
      { label: 'Bentuk U', value: 2 },
      { label: 'Bronjong', value: 3 },
      { label: 'Kotak/Tertutup', value: 4 },
    ],
    required: true,
  },
  {
    label: 'Kedalaman',
    type: 'input',
    placeholder: 'Masukkan kedalaman',
    required: true,
    name: 'left_drainase_depth',
  },
  {
    label: 'Lebar',
    type: 'input',
    placeholder: 'Masukkan lebar',
    required: true,
    name: 'left_drainase_width',
  },
  {
    label: 'Kondisi',
    type: 'select',
    placeholder: 'Pilih kondisi',
    required: true,
    name: 'left_drainase_condition',
    options: [
      { label: 'Baik', value: 5 },
      { label: 'Rusak Ringan', value: 6 },
      { label: 'Rusak Ringan', value: 7 },
      { label: 'Rusak Berat', value: 8 },
    ],
  },
]

export const rightDrainase = [
  {
    label: 'Tipikal',
    type: 'select',
    placeholder: 'Pilih Tipical',
    required: true,
    name: 'right_typical',
    options: [
      { label: 'Trapesium', value: 1 },
      { label: 'Bentuk U', value: 2 },
      { label: 'Bronjong', value: 3 },
      { label: 'Kotak/Tertutup', value: 4 },
    ],
  },
  {
    label: 'Kedalaman',
    type: 'input',
    placeholder: 'Masukkan kedalaman',
    required: true,
    name: 'right_drainase_depth',
  },
  {
    label: 'Lebar',
    type: 'input',
    placeholder: 'Masukkan lebar',
    required: true,
    name: 'right_drainase_width',
  },
  {
    label: 'Kondisi',
    type: 'select',
    placeholder: 'Pilih kondisi',
    required: true,
    name: 'right_drainase_condition',
    options: [
      { label: 'Baik', value: 5 },
      { label: 'Rusak Ringan', value: 6 },
      { label: 'Rusak Ringan', value: 7 },
      { label: 'Rusak Berat', value: 8 },
    ],
  },
]
