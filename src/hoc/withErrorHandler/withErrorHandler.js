import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary'

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        UNSAFE_componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req //needs to work fine
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                Promise.reject(error); //needs to work fine
            })
        };

        errorHandler = () => {
            this.setState({error: null})
        };
        
        render() {
            return (
                <Auxiliary>
                    <Modal 
                        show={this.state.error}
                        hideModal={this.errorHandler}>
                        {this.state.error ? this.state.error.message : null}  
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
} 

export default withErrorHandler