import React, { useState } from 'react'
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import truncate from '@helpers/truncate'
import Dialog from '../Dialog'

interface IDropzone {
  name?: string
  setImages: React.Dispatch<React.SetStateAction<{ [key: string]: File[] }>>
  isSubmitting: boolean
  images: File[]
}

const Dropzone: React.FC<IDropzone> = ({
  name,
  setImages,
  isSubmitting,
  images,
}: IDropzone): JSX.Element => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dataToDialog, setDataToDialog] = useState<File | null>(null)
  const [key, setKey] = useState<string>('')
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/*',
    onDropAccepted: (e) => {
      setImages((prev) => ({ ...prev, [name as string]: e }))
    },
  })

  const files =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images.map((file: any) => (
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
        key={file.path}
      >
        <Box>
          <img
            width="100%"
            height="142px"
            style={{ objectFit: 'cover' }}
            src={URL.createObjectURL(file)}
            alt={`drainase-${file.path}`}
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
          <Tooltip title={file.name}>
            <Typography variant="body2">
              {truncate(file.name, 20, 14)}
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
      {images.length > 0 && (
        <Box sx={{ display: 'flex', gap: '40px', mt: '24px' }}>{files}</Box>
      )}
      <Dialog
        handleOk={() => {
          const newFiles = [...acceptedFiles]

          newFiles.splice(newFiles.indexOf(dataToDialog as File), 1)

          setImages((p) => ({
            ...p,
            [key as string]: p[key as string]?.filter(
              (data) => data.name !== dataToDialog?.name
            ),
          }))

          setOpenDialog(false)
        }}
        open={openDialog}
        okText="Hapus"
        cancelText="Cancel"
        handleClose={() => setOpenDialog(false)}
      />
    </Box>
  )
}

export default Dropzone
