
const AuthValidator = (component) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        console.log('Authentication successful');
    } else {
        component.props.history.push('/login')
    }
}

export default AuthValidator