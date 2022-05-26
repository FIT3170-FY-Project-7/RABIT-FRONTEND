import { Typography } from '@mui/material'

import AviAvatar from 'assets/images/avatars/avivajpeyi.png'

function PageHeader() {
    const user = {
        name: 'Avi Vajpeyi',
        avatar: AviAvatar
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
