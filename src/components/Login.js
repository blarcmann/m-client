import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './utils/Loader';
import Header from './layouts/Header';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import '../assets/styles/components/register.scss';

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('mcUserToken')) {
            this.props.history.push('/login');
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    submitForm = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        if (!this.state.email || !this.state.password) { return }
        let payload = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(this.props, payload);
        this.setState({ loading: false });
    }
    render() {
        return (
            <>
                <Header />
                <Loader loading={this.state.loading} />
                <div className="form-component">
                    <div className="overlay"></div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="kard mt-5">
                                <div className="form-heading  mt-2 mb-5">
                                    Let’s get you ready on journey in reading articles that fits your situation and goals.
                                </div>
                                <div className="form-container">
                                    <form onSubmit={this.submitForm}>
                                        <div className="form-item">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" name="email" id="email"
                                                onChange={e => this.handleChange("email", e.target.value)} />
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id="password"
                                                onChange={e => this.handleChange("password", e.target.value)} />
                                        </div>
                                        <button
                                            type="button"
                                            disabled={this.props.initialized}
                                            onClick={this.submitForm}
                                            className="mx-auto mr-3 slide-in bttn primary">Submit
                                             <span className={this.props.initialized ? "loader" : 'hide'}></span>
                                        </button>
                                    </form>
                                    <div className="auth-extra">Don't have an account yet? <Link to='/register'>Register</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    initialized: state.auth.initialized,
})

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login })(Login)