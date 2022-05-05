import { Button, Box, Badge, alpha} from '@mui/material';

import { styled } from '@mui/material/styles';

import ForumIcon from '@mui/icons-material/Forum';


const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function DiscussionIcon() {
  return (
    
    <NotificationsBadge
            badgeContent={1}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
            }}>
        <ForumIcon>
        </ForumIcon>
    </NotificationsBadge>
    
  );
}

export default DiscussionIcon;
