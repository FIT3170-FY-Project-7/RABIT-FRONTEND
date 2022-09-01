import {
  Avatar,
  Grid,
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  ListItemButton,
  Divider
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import api from '../../../api'
import { useUserContext } from '../../Auth/UserContext'

const images = [
  'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  'https://images.unsplash.com/photo-1589225529399-8705282f98e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
  'https://images.unsplash.com/photo-1564053489865-3f7ddbf8551b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
  'https://images.unsplash.com/photo-1614314107768-6018061b5b72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
]

function UserPlots() {
  const navigate = useNavigate()
  const { getID } = useUserContext()
  const userID = 'temp'
  const [plots, setPlots] = useState([])

  useEffect(() => {
    getPlotDetails()
  }, [])

  const getPlotDetails = async () => {
    await api
      .get(`/raw-data/user/${userID}`)
      .then(response => {
        if (response.status == 200) {
          setPlots(response.data)
        }
      })
      .catch(e => {
        console.error('Getting Plots', e)
      })
  }

  const navigateToPlot = id => {
    console.log(id)
    navigate(`/visualise/${id}`)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant='h3'>Plots</Typography>
          <Typography variant='subtitle2'>View and delete your plots</Typography>
        </Box>
        <List>
          {plots.map(plot => (
            <div key={plot.collection_title}>
              <ListItem
                onClick={() => {
                  navigateToPlot(plot.collection_id)
                }}
                secondaryAction={
                  <IconButton color='primary' aria-label='delete plot' component='label'>
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar sx={{ pr: 2 }}>
                    <Avatar
                      sx={{ border: '1px solid white' }}
                      variant='rounded'
                      src={images[Math.floor(Math.random() * images.length)]}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{ variant: 'h4', lineHeight: 2 }}
                    secondaryTypographyProps={{
                      variant: 'h6',
                      lineHeight: 2,
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}
                    primary={plot.collection_title}
                    secondary={'Last Modified: ' + new Date(plot.last_modified).toUTCString()}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default UserPlots
