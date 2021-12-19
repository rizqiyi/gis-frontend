import * as yup from 'yup'

const validation = yup.object().shape({
  username: yup.string().required('Nama pengguna wajib diisi'),
  password: yup.string().required('Kata sandi wajib diisi'),
})

export default validation
