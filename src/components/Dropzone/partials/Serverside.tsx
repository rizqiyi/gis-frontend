/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { useDropzone } from 'react-dropzone'
import imageCompressor from '@helpers/image-compression'
import truncate from '@helpers/truncate'
import api from '@/services/common'
import { getAccessToken } from '@/helpers/jwt-decode'
import CSnackbar from '@/components/Snackbar/Snackbar'
import Dialog from '../../Dialog'

interface IDropzone {
  name?: string
  setImages: React.Dispatch<React.SetStateAction<{ [key: string]: File[] }>>
  isSubmitting: boolean
  images: File[]
  imagesFromServer: File[]
  setLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>
  loadingDelete: boolean
  loadNewData: boolean
}

const ServersideDropzone: React.FC<IDropzone> = ({
  name,
  setImages,
  isSubmitting,
  images,
  imagesFromServer = [],
  setLoadingDelete,
  loadingDelete,
  loadNewData,
}: IDropzone): JSX.Element => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState<boolean>(false)
  const [openSnackbarError, setOpenSnackbarError] = useState<boolean>(false)
  const [dataToDialog, setDataToDialog] = useState<any>({})
  const [key, setKey] = useState<string>('')
  const [progressOuter, setProgressOuter] = useState<{ [key: number]: number }>(
    {}
  )

  useEffect(() => {
    if (openSnackbarSuccess) {
      setTimeout(() => setOpenSnackbarSuccess(false), 3000)
    }

    if (openSnackbarError) {
      setTimeout(() => setOpenSnackbarError(false), 3000)
    }
  }, [openSnackbarSuccess, openSnackbarError])

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    onDropAccepted: async <T extends File>(e: T[]) => {
      try {
        const imagesTemp: File[] = []

        e.map(async (data: File, idx) => {
          const compressedImage = await imageCompressor({
            idx,
            data,
            setProgressOuter,
            isMultiple: true,
          })

          imagesTemp.push(compressedImage)

          if (imagesTemp.length === e?.length) {
            setImages((prev) => ({
              ...prev,
              [name as string]: imagesTemp,
            }))
          }
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
  })

  const imagesDone: boolean[] = Object.values(progressOuter).map(
    (data) => data === 100 && Boolean(Object.keys(progressOuter).length)
  )

  const files = useMemo(() => {
    return [...imagesFromServer, ...images]?.map((file: any) => (
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #DDDFE5',
          boxShadow: '0px 16px 40px rgba(175, 195, 216, 0.2)',
          p: 0,
          width: '192px',
          height: '256px',
          borderRadius: '4px',
        }}
        key={
          typeof file === 'object' && !(file instanceof Blob)
            ? `${file.image_name}`
            : `${file.name}`
        }
      >
        <Box>
          <img
            width="100%"
            height="142px"
            style={{ objectFit: 'cover' }}
            src={
              typeof file === 'object' && !(file instanceof Blob)
                ? `${process.env.REACT_APP_API_URI_IMAGEKIT}/${file.image_path}`
                : URL.createObjectURL(file)
            }
            alt={`drainase-${
              typeof file === 'object' && !(file instanceof Blob)
                ? `${file.image_name}`
                : `${file.name}`
            }`}
          />
        </Box>
        <Box
          sx={{
            padding: '10px 10px 20px 10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '84px',
          }}
        >
          <Tooltip
            title={
              typeof file === 'object' && !(file instanceof Blob)
                ? `${file.image_name}`
                : `${file.name}`
            }
          >
            <Typography variant="body2">
              {truncate(
                typeof file === 'object' && !(file instanceof Blob)
                  ? `${file.image_name}`
                  : `${file.name}`,
                20,
                14
              )}
            </Typography>
          </Tooltip>
          <Button
            sx={{
              width: '172px',
              minHeight: '44px',
              borderRadius: '12px',
              border: '1px solid #F44436',
            }}
            onClick={() => {
              setOpenDialog(true)

              setDataToDialog(file)

              setKey(name as string)
            }}
            variant="outlined"
            color="error"
          >
            <Typography variant="body2" fontWeight={400}>
              Hapus
            </Typography>
          </Button>
        </Box>
      </Paper>
    ))
  }, [imagesFromServer, images, loadingDelete])

  return (
    <Box sx={{ mt: '40px' }}>
      <Typography sx={{ mb: '24px' }} fontWeight={600} variant="subtitle2">
        Upload Gambar Drainase
      </Typography>
      <Box
        sx={{
          border: '1px dashed #DDDFE5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: '50px 0',
          backgroundColor: '#FAFAFA',
          borderRadius: '12px',
        }}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Box sx={{ color: '#929292' }}>
            <Typography variant="body2" fontWeight={400}>
              Drag n drop some files here, or click to select files
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              disableElevation
              disabled={isSubmitting}
              variant="contained"
              sx={{
                color: 'white',
                minHeight: '44px',
                borderRadius: '12px',
                mt: '24px',
                padding: '14px 24px',
                boxShadow: '0px 8px 20px rgba(31, 169, 231, 0.12)',
              }}
              onClick={open}
            >
              <Typography variant="body2" fontWeight={400}>
                Upload Gambar
              </Typography>
            </Button>
          </Box>
        </div>
      </Box>
      <Box sx={{ color: '#929292', mt: '24px' }}>
        <Typography variant="caption" fontWeight={400}>
          Note : Dapat mengupload gambar lebih dari 1 kali. Format gambar JPG,
          JPEG, PNG
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '40px', mt: '24px', flexWrap: 'wrap' }}>
        {imagesDone.includes(false) || loadingDelete || loadNewData ? (
          <CircularProgress />
        ) : (
          files
        )}
      </Box>
      <Dialog
        // eslint-disable-next-line consistent-return
        handleOk={(data) => {
          if (typeof data === 'object' && !(data instanceof Blob)) {
            setOpenDialog(false)

            setLoadingDelete(true)

            return api({
              method: 'delete',
              url: `/drainase/delete/${
                name === 'left_drainase' ? 'left-image' : 'right-image'
              }/${data.id}`,
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getAccessToken(),
              },
            })
              .then((res) => {
                if (res?.success) {
                  setLoadingDelete(false)

                  return setOpenSnackbarSuccess(true)
                }

                throw new Error('Gagal menghapus gambar')
              })
              .catch(() => {
                setLoadingDelete(false)

                setOpenSnackbarError(true)
              })
          }

          const newFiles = [...acceptedFiles]

          newFiles.splice(newFiles.indexOf(dataToDialog as File), 1)

          setImages((p) => ({
            ...p,
            [key as string]: p[key as string]?.filter(
              (d) => d.name !== dataToDialog?.name
            ),
          }))

          setOpenDialog(false)
        }}
        open={openDialog}
        dataToDialog={dataToDialog}
        okText="Hapus"
        cancelText="Cancel"
        handleClose={() => setOpenDialog(false)}
      />
      <CSnackbar
        open={openSnackbarSuccess}
        status="success"
        autoHideDuration={3000}
        message="Berhasil menghapus gambar"
      />
      <CSnackbar
        open={openSnackbarError}
        status="error"
        autoHideDuration={3000}
        message="Gagal menghapus gambar"
      />
    </Box>
  )
}

export default ServersideDropzone
