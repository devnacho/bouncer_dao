import React from 'react'
import {
  AragonApp,
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
    return (
      <AppContainer>
        <h1 class="app-title">Bouncer</h1>
        <h2 class="section-title">DAO Members physical access</h2>
        <table className="table">
          <thead>
            <th>Address</th>
            <th>Has Access</th>
          </thead>
          <tbody>
            <tr>
              <td>Hardcoded Address</td>
              <td>true</td>
            </tr>
            <tr>
              <td>hardcoded address 2</td>
              <td>false</td>
            </tr>
            <tr>
              <td>Hardcoded Address 3</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>

        <ObservedCount observable={this.props.observable} />
        <Button onClick={() => this.props.app.decrement(1)}>Decrement</Button>
        <Button onClick={() => this.props.app.increment(1)}>Increment</Button>
      </AppContainer>
    )
  }
}

const ObservedCount = observe(
    (state$) => state$,
    { count: 0 }
)(
    ({ count }) => <Text.Block style={{ textAlign: 'center' }} size='xxlarge'>{count}</Text.Block>
)
