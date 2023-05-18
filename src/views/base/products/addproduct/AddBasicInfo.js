import React from 'react'
import './_addproduct.scss'
import { useState, useEffect, useCallback } from 'react'
import { CCol, CRow, CCardHeader, CCard, CCardBody, CContainer, CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

function AddBasicInfo() {
  const [selectedImages, setSelectedImages] = useState([])

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files)

    // Kiểm tra nếu đã đạt đến số lượng tối đa 4 ảnh
    if (selectedImages.length + files.length > 4) {
      alert('Không thể thêm quá 4 ảnh!')
      return
    }

    const imageFiles = files.map((file) => {
      return {
        name: file.name,
        src: URL.createObjectURL(file),
      }
    })

    setSelectedImages((prevImages) => [...prevImages, ...imageFiles])
  }

  const handleRemoveImage = (imageName) => {
    setSelectedImages((prevImages) => prevImages.filter((image) => image.name !== imageName))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-16">
          <CCardHeader className="vh-15">
            <strong className="text-uppercase fs-5">Thông tin cơ bản</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer xxl style={{ height: '20vh' }}>
              <CRow className="fs-6 h-100">
                <CCol className="text-end" xs="2">
                  Hình ảnh sản phẩm
                </CCol>
                <CCol xs="10">
                  <div className="d-flex flex-row">
                    {selectedImages.map((image) => (
                      <div key={image.name} className="img-product">
                        <img
                          className="img-thumbnail"
                          src={image.src}
                          alt={image.name}
                          style={{ width: '100px', height: '83px', objectFit: 'cover' }}
                        />
                        <button
                          onClick={() => handleRemoveImage(image.name)}
                          className=" btn-image"
                        >
                          {' '}
                          <CIcon icon={icon.cilTrash} size="s" />
                        </button>
                      </div>
                    ))}
                    {selectedImages.length < 4 && (
                      <>
                        <CFormInput
                          type="file"
                          id="fileInput"
                          style={{ display: 'none' }}
                          onChange={handleImageChange}
                          multiple
                          accept="image/*"
                        />
                        <label htmlFor="fileInput" className="btn btn-primary">
                          Thêm ảnh
                        </label>
                      </>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CContainer>
            <CContainer xxl style={{ height: '8vh' }}>
              <CRow className="fs-6 h-100">
                <CCol className="text-end" xs="2">
                  Tên sản phẩm
                </CCol>
                <CCol xs="10">
                  <CFormInput
                    type="text"
                    style={{ width: '80%' }}
                    id="exampleFormControlInput1"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CCol>
              </CRow>
            </CContainer>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddBasicInfo
