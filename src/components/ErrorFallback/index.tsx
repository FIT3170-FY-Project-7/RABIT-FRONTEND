import { Box } from '@mui/material'
import { Error } from '@mui/icons-material'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Box>
      <Error />
      <div>RABIT has crashed</div>
      <div>{error.message}</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Box>
  )
}

export default ErrorFallback
