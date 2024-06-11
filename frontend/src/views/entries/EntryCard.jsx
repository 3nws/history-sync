import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OpenInNew } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteRecord, useUpdateRecord } from 'api/records';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function EntryCard({ entry }) {
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
            <Modal
              open={open}
              onClose={handleUpdate}
              aria-labelledby={`modal-modal-title-${entry.id}`}
              aria-describedby={`modal-modal-description-${entry.id}`}
            >
              <Box sx={style} component="form" noValidate autoComplete="off">
                <Typography id={`modal-modal-title-${entry.id}`} variant="h6" component="h2">
                  Update the record
                </Typography>
                <TextField
                  sx={{ marginTop: '1em' }}
                  required
                  id={`text-${entry.id}`}
                  label="Text"
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={entry.text}
                />
                <div style={{ marginTop: '1em' }}>
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </div>
              </Box>
            </Modal>
            <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
