import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Link,
    Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'

import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone'
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone'
import Text from '../../../../components/Text'

import Avatar5 from 'assets/images/avatars/avatar5.jpg'
import Cover6 from 'assets/images/placeholders/covers/cover6.jpg'

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};`
)

function ActivityTab() {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar src={Avatar5} />}
                action={
                    <IconButton color='primary'>
                        <MoreHorizTwoToneIcon fontSize='medium' />
                    </IconButton>
                }
                titleTypographyProps={{ variant: 'h4' }}
                subheaderTypographyProps={{ variant: 'subtitle2' }}
                title='Allison Lipshutz'
                subheader={
                    <>
                        Managing Partner,{' '}
                        <Link href='#' underline='hover'>
                            #software
                        </Link>
                        ,{' '}
                        <Link href='#' underline='hover'>
                            #managers
                        </Link>
                        , Google Inc.
                    </>
                }
            />
            <Box px={3} pb={2}>
                <Typography variant='h4' fontWeight='normal'>
                    Welcome to organizing your remote office for maximum productivity.
                </Typography>
            </Box>
            <CardMedia sx={{ minHeight: 280 }} image={Cover6} title='Card Cover' />
            <Box p={3}>
                <Typography variant='h2' sx={{ pb: 1 }}>
                    Organizing Your Remote Office for Maximum Productivity
                </Typography>
                <Typography variant='subtitle2'>
                    <Link href='#' underline='hover'>
                        example.com
                    </Link>{' '}
                    • 4 mins read
                </Typography>
            </Box>
            <Divider />
            <CardActionsWrapper
                sx={{
                    display: { xs: 'block', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <Button startIcon={<ThumbUpAltTwoToneIcon />} variant='contained'>
                        Like
                    </Button>
                    <Button startIcon={<CommentTwoToneIcon />} variant='outlined' sx={{ mx: 2 }}>
                        Comment
                    </Button>
                    <Button startIcon={<ShareTwoToneIcon />} variant='outlined'>
                        Share
                    </Button>
                </Box>
                <Box sx={{ mt: { xs: 2, md: 0 } }}>
                    <Typography variant='subtitle2' component='span'>
                        <Text color='black'>
                            <b>485</b>
                        </Text>{' '}
                        reactions •{' '}
                        <Text color='black'>
                            <b>63</b>
                        </Text>{' '}
                        comments
                    </Typography>
                </Box>
            </CardActionsWrapper>
        </Card>
    )
}

export default ActivityTab
