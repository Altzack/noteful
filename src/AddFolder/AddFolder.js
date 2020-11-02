import React from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import config from '../config'

import './AddFolder.css'
import NotefulError from '../NotefulError'
import ValidationError from '../ValidationError/ValidationError'


class AddFolder extends React.Component{

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
            const newfolder = {
                title: e.target['folder-section'].value
              }
      
              fetch(`${config.API_ENDPOINT}/api/folders`, {
                  method: 'POST',
                  body: JSON.stringify(newfolder),
                  headers: {
                    'content-type': 'application/json',
                  }
                })
                .then(foldersRes => {
                  if (!foldersRes.ok)
                      return foldersRes.json().then(e => Promise.reject(e)) //function that returns the Promise object that is rejected with a given reason.
                  return foldersRes.json()
                  })
                  .then(folder => {
                      this.context.addFolder(folder)
                      this.props.history.push('/')
                  })
              
              .catch(error => {
                  console.error({error});
              }) 
        }
    }

    // function will validate that the name is longer than 3 characters
   isNameValid = () => {
    const title = this.state.title.value.trim();
     if (title.length < 3) {
        this.setState({errorMessage: "Title must be at least 3 characters long"});
        return false;
    }
    return true;
}

    render(){
 
        return(
            <NotefulError>
                <div className="AddFolder">
                    <h2>Create A Folder</h2>
                    <NotefulForm onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor='title'>
                                Title
                                </label>
                                <input 
                                type='text' 
                                id='title' 
                                name="folder-section" 
                                aria-required="true"
                                aria-label="Title"
                                onChange={e => this.updateTitle(e.target.value)}
                                required  //requires the user inputs a name
                                />
                            </div>
                            <div className='buttons'>
                                <button 
                                type='submit'
                                >
                                Add folder
                                </button>
                                {this.state.errorMessage && <ValidationError message={this.state.errorMessage}/>}
                            </div>
                    </NotefulForm>
                </div>
            </NotefulError>
        )
    }
}

// AddFolder.propTypes = {
//     history: PropTypes.object,
//     title: PropTypes.string.isRequired,
// }

export default AddFolder;