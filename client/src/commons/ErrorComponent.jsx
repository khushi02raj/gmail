import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorComponent = () => {
    const error=useRouteError();//for developer side
    console.log(error);
  return (
    <Box style={{marginLeft:250}}>
      <Typography>There was an error loading this page!</Typography>
    </Box>
  )
}

export default ErrorComponent
