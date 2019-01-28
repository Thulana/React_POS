import React from 'react'

class Home extends React.Component {

    render() {

        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            console.log('Authentication successful');
        } else {
            this.props.history.push('/login')
        }

        return (

            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home
