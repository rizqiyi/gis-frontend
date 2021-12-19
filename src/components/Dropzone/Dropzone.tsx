import React from 'react'
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import truncate from '@helpers/truncate'

interface IDropzone {
  name?: string
  setImages: React.Dispatch<React.SetStateAction<{ [key: string]: File[] }>>
}

const Dropzone: React.FC<IDropzone> = ({
  name,
  setImages,
}: IDropzone): JSX.Element => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    onDropAccepted: (e) => {
      setImages((prev) => ({ ...prev, [name as string]: e }))
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files = acceptedFiles.map((file: any) => (
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
          <Typography variant="body2">{truncate(file.name, 20, 14)}</Typography>
        </Tooltip>
        <Button
          sx={{
            width: '172px',
            minHeight: '44px',
            borderRadius: '12px',
            border: '1px solid #F44436',
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
              variant="contained"
              sx={{
                color: 'white',
                minHeight: '44px',
                borderRadius: '12px',
                mt: '24px',
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
      <Box sx={{ display: 'flex', gap: '40px', mt: '24px' }}>{files}</Box>
    </Box>
  )
}

export default Dropzone
