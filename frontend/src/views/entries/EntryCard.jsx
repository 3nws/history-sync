import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OpenInNew } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteRecord, useUpdateRecord } from 'api/records';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@emotion/react';

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '320px',
  [theme.breakpoints.up('md')]: {
    width: '512px'
  },
  boxSizing: 'border-box',
  fontFamily: `'IBM Plex Sans', sans-serif`,
  fontSize: '1.875rem',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: '12px',
  borderRadius: '12px 12px 0 12px',
  color: theme.palette.grey[800],
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[200]}`,
  boxShadow: `0px 2px 2px ${theme.palette.grey[50]}`,
  '&:hover': {
    borderColor: theme.palette.primary.main
  },
  '&:focus': {
    outline: 0,
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary}`
  },
  '&:focus-visible': {
    outline: 0
  }
}));

export default function EntryCard({ entry }) {
  const theme = useTheme();

  const [text, setText] = React.useState(entry.text);
  const [open, setOpen] = React.useState(false);

  const { mutate: updateRecord } = useUpdateRecord();
  const { mutate: deleteRecord } = useDeleteRecord();

  const handleUpdate = () => {
    setOpen(false);
    if (entry.text == text.trim()) return;
    updateRecord({ id: entry.id, data: { text: text.trim() } });
  };
  const handleDelete = () => deleteRecord(entry.id);
  const handleChange = (event) => setText(event.target.value);

  return (
    <Box sx={{ minWidth: 250 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {new Date(entry.created_at).toUTCString()}
            </Typography>
            <Typography variant="body2">{entry.text}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              startIcon={<OpenInNew />}
              target="_blank"
              color="inherit"
              href={`https://jisho.org/search?keyword=${entry.text}`}
            >
              See on Jisho
            </Button>
            <Button
              size="small"
              startIcon={<EditIcon />}
              color="info"
              onClick={() => {
                setOpen(true);
                setText(entry.text);
              }}
            >
              Edit
            </Button>
            <Dialog open={open} onClose={handleUpdate}>
              <DialogTitle>Update the record</DialogTitle>
              <DialogContent>
                <Textarea
                  sx={{ marginTop: '1em' }}
                  required
                  id={`text-${entry.id}`}
                  label="Text"
                  minRows={3}
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={entry.text}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button sx={{ color: theme.palette.primary.dark }} onClick={handleUpdate}>
                  Update
                </Button>
              </DialogActions>
            </Dialog>
            <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
