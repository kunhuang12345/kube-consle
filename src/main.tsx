import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {PodList} from './components/PodList'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
        <PodList/>
    </StrictMode>
)
