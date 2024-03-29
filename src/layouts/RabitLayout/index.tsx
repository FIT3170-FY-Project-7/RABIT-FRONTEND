import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'

interface SidebarLayoutProps {
  children?: ReactNode
}

const MainWrapper = styled(Box)(
    // wrapper to store the main content
    ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;

        @media (min-width: ${theme.breakpoints.values.xs}px) {
            padding-left: ${theme.sidebar.width};
        }
        
        @media (min-width: ${theme.breakpoints.values.sm}px) {
            padding-left: ${theme.sidebar.width};
        }

        @media (min-width: ${theme.breakpoints.values.md}px) {
            padding-left: ${theme.sidebar.width};
        }
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }

        @media (min-width: ${theme.breakpoints.values.xl}px) {
            padding-left: ${theme.sidebar.width};
        }
        `
        
)

const MainContent = styled(Box)(
    // main content goes here
    ({ theme }) => `
        flex: 1 1 auto;
        margin: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
        `
)

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent sx={{ margin: '3rem' }}>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  )
}

export default SidebarLayout
