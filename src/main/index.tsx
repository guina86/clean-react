import React from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@main/routes/router'
import '@presentation/styles/global.scss'

const root = createRoot(document.getElementById('main')!)
root.render(<Router />)
