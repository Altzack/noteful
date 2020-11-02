import React from 'react'
import CircleButton from '../CircleButton/CircleButton'
import {findNote,findFolder} from '../Notes-Helper'
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types'
import './NotePageNav.css'

class NotePageNav extends React.Component{
 
static defaultProps = {
  history: {
    goBack: () => { }
  },
  match: {
    params: {}
  }
}

static contextType = NotefulContext;

  render(){
const { notes, folders } = this.context
const { note_id } = this.props.match.params 
const note = findNote(notes, note_id) || {} 
const folder = findFolder(folders, note.folder_id)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        > 
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'> 
            {folder.title}
          </h3>
        )}
      </div>
    )
  }

}

NotePageNav.propTypes = {
  history: PropTypes.object
}

export default NotePageNav;