/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Slider from 'react-slick'
import { Box, Fade, Skeleton } from '@mui/material'
import { IDrainaseImages } from '@/interfaces/drainase'
import sliderConfig from '@helpers/react-slick/config'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import useStyles from '../../DetailDrainase.styles'
import DetailStreet from '../DetailStreet/DetailStreet'

interface ITabContent {
  data: any
  name: string
  loading: boolean
}

const TabContent: React.FC<ITabContent> = ({
  data,
  name,
  loading,
}: ITabContent): JSX.Element => {
  const classes = useStyles()
  const [focused, setFocused] = useState<{ [key: string]: boolean }>({})

  return (
    <Box>
      <Box padding="40px" display="flex" justifyContent="center">
        {loading ? (
          <Skeleton variant="rectangular" height="250px" width="400px" />
        ) : (
          <Slider
            className={classes.slider}
            {...sliderConfig}
            variableWidth
            infinite
            slidesToShow={
              (
                (name === 'right'
                  ? data?.right_images_drainase
                  : data?.left_images_drainase) || []
              ).length === 1
                ? 1
                : 2
            }
            slidesToScroll={1}
          >
            {(
              (name === 'right'
                ? data?.right_images_drainase
                : data?.left_images_drainase) || []
            ).map(
              ({ image_path, image_name }: IDrainaseImages, idx: number) => (
                <Box
                  onMouseEnter={() => setFocused({ [idx]: true })}
                  onMouseLeave={() => setFocused({ [idx]: false })}
                  key={image_name}
                >
                  <img
                    height="250px"
                    src={`${process.env.REACT_APP_API_URI_IMAGEKIT}${image_path}`}
                    alt={image_name}
                  />
                  <Fade in={focused[idx]}>
                    <Box className={classes.sliderImage}>
                      <Box
                        onClick={() =>
                          focused[idx] &&
                          window.open(
                            `${process.env.REACT_APP_API_URI_IMAGEKIT}${image_path}`,
                            `${image_name}`,
                            'height=400,width=400'
                          )
                        }
                        sx={{
                          position: 'relative',
                          zIndex: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          top: '40%',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '4px',
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          width: '48px',
                          height: '48px',
                        }}
                      >
                        <SearchOutlinedIcon />
                      </Box>
                    </Box>
                  </Fade>
                </Box>
              )
            )}
          </Slider>
        )}
      </Box>
      <Box borderBottom="1px solid #DDDFE5" margin="20px 0 20px 0" />
      <DetailStreet
        data={
          name === 'right'
            ? {
                typical: data.right_typical,
                drainase_depth: data.right_drainase_depth,
                drainase_width: data.right_drainase_width,
                drainase_condition: data.right_drainase_condition,
              }
            : {
                typical: data.left_typical,
                drainase_depth: data.left_drainase_depth,
                drainase_width: data.left_drainase_width,
                drainase_condition: data.left_drainase_condition,
              }
        }
        loading={loading}
        description={data.description}
        note={data.note}
      />
    </Box>
  )
}

export default TabContent
