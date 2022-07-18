import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { FC, ReactNode } from 'react'

const PageTitle = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(4, 0)};`
)

interface PageTitleWrapperProps {
    children?: ReactNode
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
    return (
        <>
            <PageTitle>
                <Container maxWidth='lg'>{children}</Container>
            </PageTitle>
        </>
    )
}

PageTitleWrapper.propTypes = {
    children: PropTypes.node.isRequired
}

export default PageTitleWrapper
