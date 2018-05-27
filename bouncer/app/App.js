import React from 'react'
import {
    AragonApp,
    AppBar,
    Button,
    Text,
    observe
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'

const AppContainer = styled(AragonApp)`
  padding: 30px;
`
export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          newAddress: ""
      };
      this.handleNewAddress = this.handleNewAddress.bind(this);
      this.handleNewAddressSubmit = this.handleNewAddressSubmit.bind(this);
      this.handleRevokeAccess = this.handleNewAddressSubmit.bind(this);
  }


  handleNewAddress(event) {
    this.setState({newAddress: event.target.value});
  }

  handleNewAddressSubmit(event) {
    this.props.app.giveAccess(this.state.newAddress);
  }

  handleRevokeAccess(addressToRevoke) {
    console.log("revoke", addressToRevoke);
    this.props.app.giveAccess(addressToRevoke);
  }

  render () {
    return (
        <AppContainer>
            <h1 class="app-title">Bouncer</h1>
            <h2 class="section-title">DAO Members physical access</h2>
            <table className="table">
                <thead>
                    <th>Address</th>
                    <th>Access</th>
                </thead>
                <tbody>
                    <ObservedAddresses observable={this.props.observable} />
                </tbody>
            </table>
            <h2>Add New Address</h2>
            <input type="text" value={this.state.newAddress} onChange={this.handleNewAddress} />
            <button onClick={ this.handleNewAddressSubmit }>Add New Address</button>

        </AppContainer>
    )
  }
  renderButton(hasAccess) {
      if(!hasAccess){
          return <Button mode="secondary">Give Access</Button>
      } else {
          return <Button mode="outline">Revoke Access</Button>
      }
  }
}


const ObservedAddresses = observe(
    (state$) => state$,
    { allowedAddresses: [] }
  )(
    ({ allowedAddresses }) =>

        allowedAddresses.map((address, i) =>
            <tr>
                <td>
                    { address }
                </td>
                <td>
                    <Button mode="outline">Revoke Access</Button>
                </td>
            </tr>
        )
)
