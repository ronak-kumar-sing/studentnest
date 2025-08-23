import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react'

const ImageUpload = ({ images = [], onImagesChange, maxImages = 10, maxSize = 5 * 1024 * 1024 }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = async (files) => {
    const newErrors = []
    const validFiles = []

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        newErrors.push(`${file.name} is not an image file`)
        continue
      }

      if (file.size > maxSize) {
        newErrors.push(`${file.name} is too large (max ${Math.round(maxSize / (1024 * 1024))}MB)`)
        continue
      }

      if (images.length + validFiles.length >= maxImages) {
        newErrors.push(`Maximum ${maxImages} images allowed`)
        break
      }

      validFiles.push(file)
    }

    setErrors(newErrors)

    if (validFiles.length === 0) return

    setUploading(true)

    try {
      // Process files (create preview URLs)
      const processedImages = await Promise.all(
        validFiles.map(async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              resolve({
                id: Date.now() + Math.random(),
                file,
                preview: e.target.result,
                name: file.name,
                size: file.size
              })
            }
            reader.readAsDataURL(file)
          })
        })
      )

      onImagesChange([...images, ...processedImages])
    } catch (error) {
      setErrors(['Error processing images'])
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId)
    onImagesChange(updatedImages)
  }

  const moveImage = (dragIndex, dropIndex) => {
    const draggedImage = images[dragIndex]
    const newImages = [...images]
    newImages.splice(dragIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)
    onImagesChange(newImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-zinc-300 hover:border-zinc-400'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-zinc-600">Processing images...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 mx-auto bg-zinc-100 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-zinc-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-zinc-900 mb-2">
                Upload Room Photos
              </h4>
              <p className="text-zinc-600 mb-4">
                Drag and drop images here, or{' '}
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  browse files
                </button>
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
                <span>Max {maxImages} images</span>
                <span>•</span>
                <span>Up to {Math.round(maxSize / (1024 * 1024))}MB each</span>
                <span>•</span>
                <span>JPG, PNG, WEBP</span>
              </div>
            </div>

            {images.length < maxImages && (
              <button
                type="button"
                onClick={openFileDialog}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Choose Images
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h5 className="font-medium text-red-900">Upload Errors</h5>
            </div>
            <ul className="space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm text-red-700">
                  • {error}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium text-zinc-900">
              Uploaded Images ({images.length}/{maxImages})
            </h5>
            {images.length > 0 && (
              <p className="text-sm text-zinc-600">
                The first image will be used as the cover photo
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden"
                >
                  {/* Cover Photo Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Cover Photo
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 z-10 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image */}
                  <div className="aspect-square relative">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                  </div>

                  {/* Image Info */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-zinc-600">
                      {(image.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h6 className="font-medium text-blue-900 mb-2">Photography Tips</h6>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Take photos in good lighting (natural light preferred)</li>
          <li>• Show different angles of the room</li>
          <li>• Include photos of amenities and common areas</li>
          <li>• Ensure images are clear and not blurry</li>
          <li>• The first image will be used as the main cover photo</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload
