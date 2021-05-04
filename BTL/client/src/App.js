import React from 'react'
import { SocketProvider } from './context/SocketProvider'
import IOScreen from './pages/IOScreen'

const App = () => {
    return (
        <SocketProvider>
            <IOScreen />
        </SocketProvider>
    )
}

export default App