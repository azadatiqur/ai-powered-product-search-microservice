import { Router } from 'express'
import { prisma } from './db'
import { ProductDTO } from './models'

export const router = Router()

router.get('/health', (_, res) => res.json({ status: 'ok' }))

// Create product
router.post('/products', async (req, res) => {
  try {
    const data = req.body as ProductDTO
    const product = await prisma.product.create({ data })
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// List products
router.get('/products', async (req, res) => {
  try {
    const list = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get product
router.get('/products/:id', async (req, res) => {
  try {
    const p = await prisma.product.findUnique({ where: { id: req.params.id } })
    if (!p) return res.status(404).json({ message: 'Not found' })
    res.json(p)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const p = await prisma.product.update({ where: { id: req.params.id }, data: req.body })
    res.json(p)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } })
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})
