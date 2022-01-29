/* eslint-disable react/no-array-index-key */
import { Box, Skeleton } from '@mui/material'
import React from 'react'

const RenderLoading = (): JSX.Element => {
  return (
    <Box>
      <Box display="flex" gap="10px">
        {Array(5)
          .fill('')
          .map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width="100%"
              height={50}
            />
          ))}
      </Box>
      <Box marginTop="10px">
        <Box display="flex" flexDirection="column" gap="10px">
          {Array(5)
            .fill('')
            .map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width="100%"
                height={50}
              />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

export default RenderLoading
