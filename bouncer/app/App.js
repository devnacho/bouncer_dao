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
  render () {
    console.log("PROPS", this.props);
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
            <tr>
              <td>Hardcoded Address</td>
              <td>
                { this.renderButton(true) }
              </td>
            </tr>
            <tr>
              <td>hardcoded address 2</td>
              <td>
                { this.renderButton(false) }
              </td>
            </tr>
            <tr>
              <td>Hardcoded Address 3</td>
              <td>
                { this.renderButton(true) }
              </td>
            </tr>
          </tbody>
        </table>
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
