import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { startNewNote } from '../../store/journal/journalThunks';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {
        (!!active)
          ? <NoteView/>
          : <NothingSelectedView/>
      }
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white", 
          backgroundColor: "error.main", 
          ":hover": {backgroundColor: "error.main", opacity: 0.9},
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 24}}/>
      </IconButton>
    </JournalLayout>
  )
}
