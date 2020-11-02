import React from 'react'
import config from '../config'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'

import NotefulError from '../NotefulError'
import ValidationError from '../ValidationError/ValidationError'

class AddNote extends React.Component{
    static defaultProps = {
        history: {
            push: () => { },
        }
        
    }

    constructor(props) {
        super(props);
        this.state = {
          title: {
            value: '',
            touched:false
          },
          errorMessage: null
          
        }
    }


    static contextType = NotefulContext;

    updateTitle(title) {
        this.setState({title: {value: title, touched: true}});
      }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.isNameValid()){
            const getNote ={
                title: e.target['title-section'].value,
                content: e.target['content'].value,
                folder_id: e.target['folder-select'].value,
                modified: new Date()
            }
        
            fetch(`${config.API_ENDPOINT}/api/notes`,{
               method:'POST',
               body: JSON.stringify(getNote),
               headers:{
                   'content-type': 'application/json'
               }
                })
                .then(notesRes => {
                    if (!notesRes.ok)
                        return notesRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
                    return notesRes.json()
                })
                .then(note => {
                    this.context.addNote(note)
                    this.props.history.push('/')
                })
            .catch(error => {
                console.log(error)
            })
        }
        
    }

    // function will validate that the title is longer than 3 characters
   isNameValid = () => {
        const title = this.state.title.value.trim();
         if (title.length < 3) {
            this.setState({errorMessage: "Title must be at least 3 characters long"});
            return false;
        }
        return true;
    }

    render(){
        const { folders = [] } = this.context
        return(
            <NotefulError>
                <div className="AddNote">
                    <h2>Create A Note</h2>
                    <NotefulForm onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <label htmlFor='title'>Title</label>
                            <input 
                            type='text' 
                            id='title' 
                            name='title-section'
                            aria-required="true"
                            aria-label="Title"
                            onChange={e => this.updateTitle(e.target.value)}
                            required  //requires the user inputs a title 
                        />
                        </div>
                        <div className='field'>
                            <label htmlFor='content'>Content</label>
                            <textarea 
                            id='content' 
                            name='content'
                            aria-label="Content"/>
                        </div>
                        <div className='field'>
                            <label htmlFor='folder-select'>Folder</label>
                            <select 
                            id='folder-select' 
                            name='folder-select'
                            aria-label="Folder">
                                <option value={null}>...</option>
                                {folders.map( folder => 
                                <option key={folder.id} value={folder.id}>
                                    {folder.title}
                                </option>
                                )}
                            </select>
                        </div>
                        <div className='buttons'>
                            
                                <button 
                                    type='submit'
                                    to='/'
                                >
                                    Add Note
                                </button>
                            {this.state.errorMessage && <ValidationError message={this.state.errorMessage}/>}
                        </div>
                </NotefulForm>
             </div>
            </NotefulError>
        )
    }
}

// AddNote.propTypes = {
// history: PropTypes.object,
// title: PropTypes.string.isRequired,
// content: PropTypes.string,
// folder_id: PropTypes.number,
// modified: PropTypes.number,
// }

export default AddNote;
