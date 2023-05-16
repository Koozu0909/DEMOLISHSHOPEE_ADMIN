import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CTabPane,
  CNavLink,
  CTabContent,
  CTable,
  CForm,
  CFormInput,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormSelect,
  CContainer,
} from '@coreui/react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [categoriesName, setCategoriesName] = useState('')
  const [categoriesID, setCategoriesID] = useState('')
  const [parentID, setParentID] = useState(0)
  const [roleID, setRoleID] = useState('')
  const [q, setQ] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [viewImage, setViewImage] = useState(null)
  const [viewFirst, setViewFirst] = useState(null)
  // Delete
  const [deleteID, setDeleteID] = useState(0)
  const roles = [
    {
      tenRole: 'LoaiSPCap1',
      role: 1,
    },
    {
      tenRole: 'LoaiSPCap2',
      role: 2,
    },
    {
      tenRole: 'LoaiSPCap3',
      role: 3,
    },
  ]
  // define the URL of the API endpoint
  const url = 'https://localhost:44325/api/Categories'

  function handleSubmit(event) {
    event.preventDefault() // prevent the form from submitting normally
    const formData = new FormData()
    formData.append('image', selectedFile) // fileInput là đối tượng input file
    formData.append('parent', parentID)
    formData.append('role', roleID)
    formData.append('tenLoaiSp', categoriesName)

    // set the request headers (optional)
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    // send a POST request
    axios
      .post(url, formData, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setCategories([...categories, response.data]) // add new categories to existing categories
        setRoleID(0)
        setParentID(0)
        setViewFirst(null)
        setSelectedFile(null)
        setCategoriesName('') // clear the categoriesname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  const data = Object.values(categories)

  function search(items) {
    return items.filter((item) => {
      return item.role == roleID
    })
  }

  function handleUpdate(event) {
    event.preventDefault() // prevent the form from submitting normally
    const formData = new FormData()
    formData.append('image', selectedFile) // fileInput là đối tượng input file
    formData.append('tenLoaiSp', categoriesName)
    formData.append('maLoaiSp', categoriesID)

    // set the request headers (optional)
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    // send a PUT request
    axios
      .put(url, formData, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)

        // update the state with the updated categories
        setCategories(
          categories.map((categories) => {
            if (categories.maLoaiSp === categoriesID) {
              return {
                ...categories,
                tenLoaiSp: categoriesName,
                imagePath: response.data.imagePath,
              }
            }
            return categories
          }),
        )
        setViewImage('https://localhost:44325/api/Categories/images/' + response.data.imagePath)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  function handleDelete(event, categoriesID) {
    event.preventDefault() // prevent the form from submitting normally
    const headers = {
      'Content-Type': 'application/json',
    }
    // send a DELETE request
    axios
      .delete(`https://localhost:44325/api/Categories/${categoriesID}`, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setCategories(
          categories.filter(
            (categories) => parseInt(categories.maLoaiSp) !== parseInt(categoriesID),
          ),
        ) // remove deleted categories from existing categories
        setRoleID(0)
        setParentID(0)
        setDeleteID(0)
        setSelectedCategoryId(0)
        setSelectedSubCategoryId(0)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  const fetchData = useCallback(() => {
    axios
      .get(url)
      .then((response) => {
        setCategories(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const columns = [
    { key: 'maLoaiSp', label: 'MaLoaiSp', _props: { scope: 'col' } },
    { key: 'tenLoaiSp', label: 'TenLoaiSp', _props: { scope: 'col' } },
    { key: 'tenParent', label: 'TenParent', _props: { scope: 'col' } },
  ]

  const [activeKey, setActiveKey] = useState(1)
  function handleRowClick(item) {
    console.log(item.maLoaiSp)
    setCategoriesID(item.maLoaiSp)
    setCategoriesName(item.tenLoaiSp)
    setViewImage('https://localhost:44325/api/Categories/images/' + item.imagePath)
  }

  const [selectedCategoryId, setSelectedCategoryId] = useState('')
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('')

  function handleChange(event) {
    setSelectedCategoryId(event.target.value)
    console.log(activeKey)
    if (activeKey === 1) {
      setParentID(event.target.value)
      console.log(parentID)
    }
    if (activeKey === 2) {
      setDeleteID(event.target.value)
    }
  }
  function handleChangeSub(event) {
    setSelectedSubCategoryId(event.target.value)
    if (activeKey == 1) {
      setParentID(event.target.value)
    }
    if (activeKey == 2) {
      setDeleteID(event.target.value)
    }
  }
  function handleChangeRole(event) {
    setRoleID(event.target.value)
    setParentID(0)
  }
  function handleChangeDelete(event) {
    setDeleteID(event.target.value)
  }

  function filterSubcategories() {
    if (!selectedCategoryId) {
      return []
    }
    return categories.filter(
      (category) => category.role === 2 && category.parent === parseInt(selectedCategoryId),
    )
  }
  function filterSecondSubcategories() {
    if (!selectedSubCategoryId) {
      return []
    }
    return categories.filter(
      (category) => category.role === 3 && category.parent === parseInt(selectedSubCategoryId),
    )
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setViewFirst(URL.createObjectURL(file))
    setSelectedFile(file)
  }

  useEffect(() => {
    console.log('RoleID đã thay đổi:', roleID)
    setViewFirst(null)
    setSelectedFile(null)
    setViewImage(null)
  }, [roleID])
  useEffect(() => {
    setRoleID(0)
    setSelectedCategoryId(0)
    setSelectedSubCategoryId(0)
  }, [activeKey])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Categories</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 1}
                  onClick={() => setActiveKey(1)}
                >
                  Add
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 2}
                  onClick={() => setActiveKey(2)}
                >
                  Delete
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={activeKey === 3}
                  onClick={() => setActiveKey(3)}
                >
                  Update
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              {/* Add */}
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                <CForm onSubmit={handleSubmit}>
                  <CContainer>
                    <CRow>
                      <CCol xs={7} style={{ paddingLeft: '0px', marginTop: '20px' }}>
                        {' '}
                        <CFormSelect
                          label="Loại Sản Phẩm LV1"
                          className="form-input"
                          style={{ width: '87%', marginLeft: '0px' }}
                          name="categories"
                          value={selectedCategoryId}
                          onChange={handleChange}
                          {...(roleID < 2 && { disabled: true })}
                        >
                          <option value="0">-- Select category --</option>
                          {categories
                            .filter((category) => category.role === 1)
                            .map((category) => (
                              <option key={category.maLoaiSp} value={category.maLoaiSp}>
                                {category.tenLoaiSp}
                              </option>
                            ))}
                        </CFormSelect>
                        <CFormSelect
                          label="Loại Sản Phẩm LV2"
                          name="subcategories"
                          className="form-input"
                          value={selectedSubCategoryId}
                          onChange={handleChangeSub}
                          {...(roleID < 3 && { disabled: true })}
                        >
                          <option value="0">-- Select subcategory --</option>
                          {filterSubcategories().map((subcategory) => (
                            <option key={subcategory.maLoaiSp} value={subcategory.maLoaiSp}>
                              {subcategory.tenLoaiSp}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormSelect
                          label="Loại Sản Phẩm LV3"
                          name="secondsubcategories"
                          className="form-input"
                          disabled
                          {...(roleID == 3 && { disabled: false })}
                        >
                          <option value="">-- Select subcategory --</option>
                          {filterSecondSubcategories().map((secondsubcategory) => (
                            <option
                              key={secondsubcategory.maLoaiSp}
                              value={secondsubcategory.maLoaiSp}
                            >
                              {secondsubcategory.tenLoaiSp}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormInput
                          className="form-input"
                          type="file"
                          id="exampleFormControlInput1"
                          placeholder="Add here"
                          onChange={handleFileChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          // eslint-disable-next-line
                          disabled={roleID != 1}
                        />
                        <CFormInput
                          className="form-input"
                          type="text"
                          id="exampleFormControlInput1"
                          label="Add categories"
                          placeholder="Add here"
                          aria-describedby="exampleFormControlInputHelpInline"
                          value={categoriesName}
                          onChange={(event) => setCategoriesName(event.target.value)}
                          // eslint-disable-next-line
                          {...(roleID == 0 && { disabled: true })}
                        />
                      </CCol>
                      <CCol xs={5} style={{ marginTop: '20px' }}>
                        <CFormSelect
                          label=" Chọn Cấp Độ Loại Sản Phẩm Muốn Thêm"
                          className="form-input"
                          name="categories"
                          value={roleID}
                          onChange={handleChangeRole}
                        >
                          <option value="0">-- Select Role --</option>
                          {roles.map((role) => (
                            <option key={role.role} value={role.role}>
                              {role.tenRole}
                            </option>
                          ))}
                        </CFormSelect>
                        <picture>
                          {viewFirst && (
                            <img
                              style={{ width: '250px', height: '200px' }}
                              src={viewFirst}
                              alt="cate-img"
                              className="img-thumbnail"
                            />
                          )}
                        </picture>
                      </CCol>
                    </CRow>
                  </CContainer>

                  <CButton type="submit" color="success">
                    Add
                  </CButton>
                </CForm>
              </CTabPane>
              {/* Add */}
              {/* Delete */}
              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                <CForm>
                  <CContainer>
                    <CRow>
                      <CCol xs={7} style={{ paddingLeft: '0px', marginTop: '20px' }}>
                        {' '}
                        <CFormSelect
                          label="Loại Sản Phẩm LV1"
                          className="form-input"
                          style={{ width: '87%', marginLeft: '0px' }}
                          name="categories"
                          value={selectedCategoryId}
                          onChange={handleChange}
                          {...(roleID < 1 && { disabled: true })}
                        >
                          <option value="0">-- Select category --</option>
                          {categories
                            .filter((category) => category.role === 1)
                            .map((category) => (
                              <option key={category.maLoaiSp} value={category.maLoaiSp}>
                                {category.tenLoaiSp}
                              </option>
                            ))}
                        </CFormSelect>
                        <CFormSelect
                          label="Loại Sản Phẩm LV2"
                          name="subcategories"
                          className="form-input"
                          value={selectedSubCategoryId}
                          onChange={handleChangeSub}
                          {...(roleID < 2 && { disabled: true })}
                        >
                          <option value="0">-- Select subcategory --</option>
                          {filterSubcategories().map((subcategory) => (
                            <option key={subcategory.maLoaiSp} value={subcategory.maLoaiSp}>
                              {subcategory.tenLoaiSp}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormSelect
                          label="Loại Sản Phẩm LV3"
                          name="secondsubcategories"
                          className="form-input"
                          onChange={handleChangeDelete}
                          disabled
                          {...(roleID == 3 && { disabled: false })}
                        >
                          <option value="0">-- Select subcategory --</option>
                          {filterSecondSubcategories().map((secondsubcategory) => (
                            <option
                              key={secondsubcategory.maLoaiSp}
                              value={secondsubcategory.maLoaiSp}
                            >
                              {secondsubcategory.tenLoaiSp}
                            </option>
                          ))}
                        </CFormSelect>
                        <CButton onClick={(e) => handleDelete(e, deleteID)}>Delete</CButton>
                      </CCol>
                      <CCol xs={5} style={{ marginTop: '20px' }}>
                        <CFormSelect
                          label=" Chọn Cấp Độ Loại Sản Phẩm Muốn Xóa"
                          className="form-input"
                          name="categories"
                          value={roleID}
                          onChange={handleChangeRole}
                        >
                          <option value="">-- Select Role --</option>
                          {roles.map((role) => (
                            <option key={role.role} value={role.role}>
                              {role.tenRole}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CForm>
              </CTabPane>
              {/* Delete */}
              {/* Update */}
              <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                <CForm onSubmit={handleUpdate}>
                  <CContainer>
                    <CRow>
                      <CCol xs={7} style={{ paddingLeft: '0px', marginTop: '20px' }}>
                        {' '}
                        <CFormInput
                          type="text"
                          className="form-input"
                          id="exampleFormControlInput1"
                          label="Add categories"
                          placeholder="Add here"
                          aria-describedby="exampleFormControlInputHelpInline"
                          value={categoriesName}
                          onChange={(event) => setCategoriesName(event.target.value)}
                          {...(roleID < 1 && { disabled: true })}
                        />
                        <CFormInput
                          className="form-input"
                          type="file"
                          id="exampleFormControlInput1"
                          placeholder="Add here"
                          onChange={handleFileChange}
                          aria-describedby="exampleFormControlInputHelpInline"
                          disabled={roleID != 1}
                        />
                        <CFormInput
                          type="search"
                          className="form-input"
                          name="search-form"
                          id="search-form"
                          placeholder="Search for..."
                          value={q}
                          onChange={(e) => setQ(e.target.value)}
                        />
                        <CButton type="submit" color="success">
                          Update
                        </CButton>
                      </CCol>
                      <CCol xs={5} style={{ marginTop: '20px' }}>
                        <CFormSelect
                          label=" Chọn Cấp Độ Loại Sản Phẩm Muốn Sửa"
                          className="form-input"
                          name="categories"
                          value={roleID}
                          onChange={handleChangeRole}
                        >
                          <option value="">-- Select Role --</option>
                          {roles.map((role) => (
                            <option key={role.role} value={role.role}>
                              {role.tenRole}
                            </option>
                          ))}
                        </CFormSelect>
                        <picture>
                          {viewImage && (
                            <img
                              style={{ width: '250px', height: '200px' }}
                              src={viewImage}
                              alt="cate-img"
                              className="img-thumbnail"
                            />
                          )}
                        </picture>
                      </CCol>
                    </CRow>
                  </CContainer>
                </CForm>
              </CTabPane>
              {/* Update */}
            </CTabContent>
          </CCardBody>
        </CCard>
        <CTable hover>
          <CTableHead>
            <CTableRow style={{ border: '3px solid black' }}>
              {columns.map((column) => (
                <CTableHeaderCell style={{ border: '3px solid black' }} key={column.key}>
                  {column.label}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {search(data).map((item, index) => (
              <CTableRow
                style={{ border: '3px solid black' }}
                key={index}
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column) => (
                  <CTableDataCell style={{ border: '3px solid black' }} key={column.label}>
                    {item[column.key]}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default Categories
