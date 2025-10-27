'use client'

import { useState, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import {
  getAllAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  toggleAdvertisementStatus,
} from '@/app/api/advertisement'
import { Advertisement, AdvertisementCreate } from '@/interfaces/advertisement'
import AdvertisementHeader from '@/app/components/advertisement/AdvertisementHeader'
import AdvertisementStats from '@/app/components/advertisement/AdvertisementStats'
import AdvertisementTable from '@/app/components/advertisement/AdvertisementTable'
import AdvertisementDialog from '@/app/components/advertisement/AdvertisementDialog'

interface FormData {
  title: string
  author: string
  description: string
  price: string
  pageCount: string
  originalPrice: string
  coverImageUrl: string
  isActive: boolean
}

const emptyFormData: FormData = {
  title: '',
  author: '',
  description: '',
  price: '',
  pageCount: '',
  originalPrice: '',
  coverImageUrl: '',
  isActive: true,
}

export default function AdvertisementPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyFormData)
  const [useCoverUrlInput, setUseCoverUrlInput] = useState(true)
  const [coverImageFileName, setCoverImageFileName] = useState('')

  useEffect(() => {
    loadAdvertisements()
  }, [])

  const loadAdvertisements = async () => {
    try {
      const data = await getAllAdvertisements()
      setAdvertisements(data)
    } catch (error) {
      console.error('Failed to load advertisements:', error)
    }
  }

  const handleOpenDialog = (ad?: Advertisement) => {
    if (ad) {
      setEditingAd(ad)
      setFormData({
        title: ad.title,
        author: ad.author,
        description: ad.description,
        price: ad.price.toString(),
        pageCount: ad.pageCount?.toString() || '',
        originalPrice: ad.originalPrice?.toString() || '',
        coverImageUrl: ad.coverImageUrl || '',
        isActive: ad.isActive,
      })
      setUseCoverUrlInput(Boolean(ad.coverImageUrl))
      setCoverImageFileName('')
    } else {
      setEditingAd(null)
      setFormData(emptyFormData)
      setUseCoverUrlInput(true)
      setCoverImageFileName('')
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingAd(null)
    setFormData(emptyFormData)
    setCoverImageFileName('')
  }

  const handleFormChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleToggleCoverSource = (useUrl: boolean) => {
    setUseCoverUrlInput(useUrl)
    if (!useUrl) {
      setFormData((prev) => ({ ...prev, coverImageUrl: '' }))
    }
  }

  const handleCoverFileSelect = (file: File | null) => {
    if (!file) return

    setCoverImageFileName(file.name)

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        handleFormChange('coverImageUrl', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    try {
      const adData: AdvertisementCreate = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        price: parseFloat(formData.price),
        pageCount: formData.pageCount ? parseInt(formData.pageCount) : undefined,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        coverImageUrl: formData.coverImageUrl || undefined,
        isActive: formData.isActive,
      }

      if (editingAd) {
        const updated = await updateAdvertisement(editingAd.id, adData)
        setAdvertisements((prev) => prev.map((ad) => (ad.id === editingAd.id ? updated : ad)))
      } else {
        const created = await createAdvertisement(adData)
        setAdvertisements((prev) => [...prev, created])
      }

      handleCloseDialog()
    } catch (error) {
      console.error('Failed to save advertisement:', error)
      alert('Failed to save advertisement. Please try again.')
    }
  }

  const handleDelete = async (adId: string) => {
    if (!confirm('Are you sure you want to delete this advertisement?')) return

    try {
      await deleteAdvertisement(adId)
      setAdvertisements((prev) => prev.filter((ad) => ad.id !== adId))
    } catch (error) {
      console.error('Failed to delete advertisement:', error)
      alert('Failed to delete advertisement. Please try again.')
    }
  }

  const handleToggleStatus = async (adId: string) => {
    try {
      const updated = await toggleAdvertisementStatus(adId)
      setAdvertisements((prev) => prev.map((ad) => (ad.id === adId ? updated : ad)))
    } catch (error) {
      console.error('Failed to toggle status:', error)
      alert('Failed to toggle advertisement status. Please try again.')
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <AdvertisementHeader onAddAdvertisement={() => handleOpenDialog()} />
        <AdvertisementStats advertisements={advertisements} />
      </Box>

      <AdvertisementTable
        advertisements={advertisements}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <AdvertisementDialog
        open={dialogOpen}
        editingAd={editingAd}
        formData={formData}
        useCoverUrlInput={useCoverUrlInput}
        coverImageFileName={coverImageFileName}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
        onToggleCoverSource={handleToggleCoverSource}
        onCoverFileSelect={handleCoverFileSelect}
      />
    </Container>
  )
}
