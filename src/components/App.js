import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { getNotes, saveNote, deleteNote } from '../actions/notesAction';
import NoteCard from './NoteCard';
import { getUser } from '../actions/userAction';

class App extends Component {
  state = {
      title: "",
      body: "",
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
     })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
      uid: this.props.user.uid
    }

    this.props.saveNote(note);
    this.setState({
      title: "",
      body: '',
    })
  }


  //render notes
  renderNotes = () => {
    return _.map(this.props.notes, (note, key) => {
      console.log("note:", note);
      console.log("key:", key)
      return (
        <NoteCard key={key}>
                    <Link to={`/${key}`}>
                        <h2>{note.title}</h2>
                    </Link>
                    <p>{note.body}</p>
                    {note.uid === this.props.user.uid && (
                      <div>
                        <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteNote(key)}>
                            Delete
                        </button>
                        <button className="btn btn-info btn-xs pull-right">
                          <Link to={`/${key}/edit`} >Update</Link>
                        </button>
                     </div>
                    )}
      </NoteCard>
      )
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-2 text-center'>
              <img
                  className="img-responsive img-circle rounded"
                  src={this.props.user.photoURL}
                  height="100px"
                  style={{ padding: '20px' }}
              />
            <h4 className='username'>Welcome back <span>{this.props.user.displayName}</span></h4>
          </div>
          <div className='col-sm-10'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input
                  onChange={this.handleChange}
                  value={this.state.title}
                  type="text"
                  name="title"
                  className='form-control no-border'
                  placeholder="Title..."
                  required
                />
              </div>

              <div className='form-group'>
                <textarea
                  onChange={this.handleChange}
                  value={this.state.body}
                  type="text"
                  name="body"
                  className='form-control no-border'
                  placeholder="Body..."
                  required
                />
              </div>

              <div className='form-group'>
                <button className='btn btn-primary col-sm-12'>Save</button>
              </div>


            </form>
            <br />
            <br />
            <br />
            {this.renderNotes()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    notes: state.notes,
    user: state.user
  }
}

export default connect(mapStateToProps, {getNotes, saveNote, deleteNote, getUser})(App);
