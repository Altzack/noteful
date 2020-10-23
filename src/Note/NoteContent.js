import React from 'react';
import Note from './Note';

class NoteContent extends React.Component {
    render() {
        return(
            <section>
                <Note />
                <div className='Note_Content'>
                </div>
            </section>
        )
    }
}
export default NoteContent;