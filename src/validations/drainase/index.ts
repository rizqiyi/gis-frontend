import * as yup from 'yup'

const validation = yup.object().shape({
  street_name: yup.string().required('Nama jalan wajib diisi'),
  district: yup.string().required('Kabupaten wajib diisi'),
  sub_district: yup.string().required('Kecamatan wajib diisi'),
  street_width: yup.string().required('Lebar jalan wajib diisi'),
  sta: yup.string().required('STA wajib diisi'),
  latitude: yup.string().required('Latitude wajib diisi'),
  longitude: yup.string().required('Longitude wajib diisi'),
  left_typical: yup.string().required('Tipikal drainase kiri wajib diisi'),
  left_drainase_depth: yup
    .string()
    .required('Kedalaman drainase kiri wajib diisi'),
  left_drainase_width: yup.string().required('Lebar drainase kiri wajib diisi'),
  left_drainase_condition: yup
    .string()
    .required('Kondisi drainase kiri wajib diisi'),
  right_typical: yup.string().required('Tipikal drainase kanan wajib diisi'),
  right_drainase_depth: yup
    .string()
    .required('Kedalaman drainase kanan wajib diisi'),
  right_drainase_width: yup
    .string()
    .required('Lebar drainase kanan wajib diisi'),
  right_drainase_condition: yup
    .string()
    .required('Kondisi drainase kanan wajib diisi'),
  description: yup.string().required('Deskripsi wajib diisi'),
  note: yup.string().required('Catatan wajib diisi'),
})

export default validation
