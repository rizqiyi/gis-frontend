/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import imageCompression from 'browser-image-compression'

interface IImageCompressor {
  data: File
  setProgressOuter?: React.Dispatch<
    React.SetStateAction<{
      [key: number]: number
    }>
  >
  setProgressOuterSingle?: React.Dispatch<React.SetStateAction<number>>
  idx: number
  isMultiple?: boolean
}

const imageCompressor = async ({
  idx,
  data,
  setProgressOuter = () => {},
  setProgressOuterSingle = () => {},
  isMultiple = false,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
IImageCompressor): Promise<any> => {
  try {
    const compressedImage: File = await imageCompression(data, {
      maxSizeMB: 1,
      onProgress: (progress) => {
        if (isMultiple) {
          setProgressOuter((p) => ({ ...p, [idx]: progress }))
        } else {
          setProgressOuterSingle(progress)
        }
      },
    })

    return compressedImage
  } catch (err) {
    console.error(err)
  }
}

export default imageCompressor
