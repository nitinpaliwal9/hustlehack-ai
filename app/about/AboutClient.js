'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'
import { useEffect, useState } from 'react'
import './about.css'
import Footer from '../components/Footer'

export default function AboutClient() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    tools: 0,
    success: 0
  })
  const [visibleElements, setVisibleElements] = useState(new Set())

  // ... (copy all useEffect and interactive logic from page.js)

  // (Copy the full AboutPage component body here)
  // ... existing code ...
} 