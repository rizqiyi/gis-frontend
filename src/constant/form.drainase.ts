export const drainaseForm = [
  { label: 'Kabupaten', name: 'district', placeholder: 'Masukkan kabupaten' },
  {
    label: 'Kecamatan',
    name: 'sub_district',
    placeholder: 'Masukkan kecamatan',
  },
  { label: 'Lebar (m)', name: 'street_width', placeholder: 'Masukkan lebar' },
  { label: 'STA (m)', name: 'sta', placeholder: 'Masukkan STA' },
  { label: 'Latitude', name: 'latitude', placeholder: 'Masukkan latitude' },
  { label: 'Longitude', name: 'longitude', placeholder: 'Masukkan longitude' },
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
  },
  {
    label: 'Kedalaman',
    type: 'input',
    placeholder: 'Masukkan kedalaman',
    name: 'left_drainase_depth',
  },
  {
    label: 'Lebar',
    type: 'input',
    placeholder: 'Masukkan lebar',
    name: 'left_drainase_width',
  },
  {
    label: 'Kondisi',
    type: 'select',
    placeholder: 'Pilih kondisi',
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
    name: 'right_drainase_depth',
  },
  {
    label: 'Lebar',
    type: 'input',
    placeholder: 'Masukkan lebar',
    name: 'right_drainase_width',
  },
  {
    label: 'Kondisi',
    type: 'select',
    placeholder: 'Pilih kondisi',
    name: 'right_drainase_condition',
    options: [
      { label: 'Baik', value: 5 },
      { label: 'Rusak Ringan', value: 6 },
      { label: 'Rusak Ringan', value: 7 },
      { label: 'Rusak Berat', value: 8 },
    ],
  },
]
