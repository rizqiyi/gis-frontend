import * as yup from 'yup'

const validation = yup.object().shape({
  fullname: yup.string().required('Nama lengkap wajib diisi'),
  username: yup.string().required('Nama pengguna wajib diisi'),
  email: yup.string().required('Email wajib diisi'),
  manage: yup.string().required('Jalur wajib diisi'),
  role_name: yup.string().required('Role wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
  passwordVerify: yup.string().required('Ulangi password wajib diisi'),
})

export default validation
