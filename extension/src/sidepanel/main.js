import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import { SidePanel } from './SidePanel';
createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(SidePanel, {}) }));
