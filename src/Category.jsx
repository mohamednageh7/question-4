import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  containedGrid: {
    height: '100vh',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Category = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [catogerys, setCatogerys] = useState([
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]);
  const [catogeryName, setCatogeryName] = React.useState('');
  const [selectedCatogery, setSelectedCatogery] = useState([]);
  const [newCatogery, setNewCatogery] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Category select
  const handleChange = (event) => {
    if (event.target.value !== 'Create New Catogery') {
      setCatogeryName(event.target.value);
      if (!selectedCatogery.includes(event.target.value)) {
        setSelectedCatogery([...selectedCatogery, event.target.value]);
      }
    }
  };

  // Chip delete
  const handleDelete = (selected) => () => {
    setSelectedCatogery((chips) => chips.filter((chip) => chip !== selected));
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };
  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleAddNewCatogery = () => {
    if (
      !selectedCatogery.includes(newCatogery) &&
      !catogeryName.includes(newCatogery)
    ) {
      setCatogeryName(newCatogery);
      setCatogerys([...catogerys, newCatogery]);
      setSelectedCatogery([...selectedCatogery, newCatogery]);
    }
  };

  return (
    <>
      <Grid container justify='center' className={classes.containedGrid}>
        <Grid
          item
          container
          direction='column'
          alignItems='center'
          style={{ alignSelf: 'center' }}
        >
          <Grid item style={{ marginBottom: '1em' }}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleClickOpen}
            >
              Edit Post
            </Button>
          </Grid>

          <Grid item>
            {selectedCatogery.map((category) => (
              <Chip
                label={category}
                color='secondary'
                style={{ marginLeft: '1em' }}
              />
            ))}
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth='sm'
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Edit Post</DialogTitle>
          <DialogContent>
            <Grid container direction='column'>
              <Grid item>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id='mutiple-chip-label'>Category</InputLabel>

                  <Select
                    labelId='mutiple-chip-label'
                    id='mutiple-chip'
                    value={catogeryName}
                    onChange={handleChange}
                    input={<Input id='select-multiple-chip' />}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      variant='contained'
                      color='primary'
                      style={{ margin: '1em' }}
                      onClick={handleCreateOpen}
                      value='Create New Catogery'
                    >
                      Create New Catogery
                    </MenuItem>
                    {catogerys.map((catogery) => (
                      <MenuItem key={catogery} value={catogery}>
                        {catogery}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item style={{ marginTop: '2em' }}>
                {selectedCatogery.map((selected) => (
                  <Chip
                    label={selected}
                    key={selected}
                    component={Button}
                    onDelete={handleDelete(selected)}
                    style={{
                      marginLeft: '1em',
                      marginTop: '1em',
                      textTransform: 'none',
                    }}
                  />
                ))}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleClose} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create catogery Dialog */}
        <Dialog
          open={createOpen}
          onClose={handleCreateClose}
          aria-labelledby='form-dialog-title'
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle id='form-dialog-title'>Create New Catogery</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Catogery name'
              type='text'
              value={newCatogery}
              onChange={(e) => setNewCatogery(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleCreateClose();
                handleAddNewCatogery();
              }}
              color='primary'
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default Category;
