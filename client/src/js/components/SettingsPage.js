import React from 'react'


class SettingsPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        picture: this.props.picture,
        name: this.props.name,
        company: this.props.name,
        phone: this.props.phone,
        email: this.props.email,
        isOpen: false,
      };
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }


  render() {
    return (
        <div className="profile">
            <form className="profile-form" onSubmit={this.handleSubmit}>
                <img
                    className="profile__image profile-image"
                    src={this.state.picture}
                    alt="profile"
                 />
                 <form className="profile-form-input">
                    <label htmlFor='name'>
                    Name
                    </label>
                    <input type='text' value={this.state.name} onChange={this.handleChange} name='name' />
                    <label htmlFor='company'>
                    Company
                    </label>
                    <input type='text' value={this.state.company} onChange={this.handleChange} name='company' />
                    <label htmlFor='phone'>
                    Phone
                    </label>
                    <input type='text' value={this.state.phone} onChange={this.handleChange} name='phone' />
                    <label htmlFor='email'>
                      Email
                    </label>
                    <input type="text" value={this.state.email} onChange={this.handleChange} name='email' />
                    </form>
                <button className='cta-primary' type='submit'>
                Update
                </button>
            </form>
        </div>

       
        
   
        
        )
    }
        

    
}
export { SettingsPage }