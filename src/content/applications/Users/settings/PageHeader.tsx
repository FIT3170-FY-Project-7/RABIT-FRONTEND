import { Typography } from '@mui/material'

import Avatar1 from 'assets/images/avatars/avatar1.jpg'

function PageHeader() {
    const user = {
        name: 'Catherine Pike',
        avatar: Avatar1
    }

    return (
        <>
            <Typography variant='h3' component='h3' gutterBottom>
                User Settings
            </Typography>
            <Typography variant='subtitle2'>{user.name}, this could be your user settings panel.</Typography>
        </>
    )
}

export default PageHeader
