#!/usr/bin/env node
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db-instance')

// Create express app
const app = express()

// Use json
app.use(express.json())

// Use CORS
app.use(
  cors({
    exposedHeaders: 'evaljs'
  })
)

// Setup server port
const HTTP_PORT = 3000

// Start server
app.listen(HTTP_PORT, () => {
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

// API endpoints
app.get('/', (req, res) => {
  console.log('ok')
  res.json({ message: 'Ok' })
})

app.get('/checks', async (req, res) => {
  const data = await db.q(`SELECT * FROM checks`)

  res.json(data)
})

app.get('/check_stats', async (req, res) => {
  const data = await db.q(
    ` SELECT * FROM check_stats WHERE checkId = $checkId AND timestamp >= $timestamp_gte AND timestamp <= $timestamp_lte `,
    {
      $checkId: req.query.checkId,
      $timestamp_gte: req.query.timestamp_gte,
      $timestamp_lte: req.query.timestamp_lte
    }
  )

  res.json(data)
})

// Default response for any other request
app.use((req, res) => {
  res.status(404)
})
