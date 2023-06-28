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
  CFormTextarea,
} from '@coreui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Description() {
  const url = 'https://localhost:44325/api/Description'
  const [activeKey, setActiveKey] = useState(1)
  const [idProduct, setIdProduct] = useState()
  const [description, setDescription] = useState('')
  const [listDescription, setListDescription] = useState([])
  const [searchItem, setSearchItem] = useState(null)
  const [searchKey, setSearchKey] = useState()
  const [selectItem, setSelectItem] = useState()
  const columns = [
    { key: 'maSp', label: 'Mã Sản Phẩm', _props: { scope: 'col' } },
    { key: 'moTa', label: 'Mô Tả', _props: { scope: 'col' } },
  ]
  // handle add description for product
  // get data from database
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data)
        setListDescription(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  // const data = Object.values(listDescription)

  function handleSubmitAddDescription(event) {
    event.preventDefault()
    const data = {
      maSp: idProduct,
      moTa: description,
    }
    // set the request headers (optional)
    const headers = {
      'Content-Type': 'application/json',
    }
    // send a POST request
    axios
      .post(url, data, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setDescription('')
        setIdProduct('')
        setListDescription([...listDescription, response.data])
        // setBrandName('') // clear the brandname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  function handleInputIDProduct(event) {
    // event.preventDefault()
    console.log(event.target.value)
    setIdProduct(event.target.value)
    // console.log(idProduct)
  }
  function handleInputDescription(event) {
    // event.preventDefault()
    console.log(event.target.value)
    setDescription(event.target.value)
  }
  // handle search
  function handleSearch(event) {
    event.preventDefault()
    if (event.target.value === '') {
      setSearchItem(null)
      setSearchKey('')
      return
    }
    // set search key
    const searchKey = event.target.value
    setSearchKey(searchKey)

    // find the item with matching 'maSp'
    const tmpSearch = listDescription.find((element) => element.maSp == searchKey)

    if (tmpSearch) {
      console.log(tmpSearch)
      setSearchItem(tmpSearch)
    } else {
      console.log('Không tìm thấy')
      setSearchItem(null)
    }
  }

  function handleRowClick(item) {
    // event.preventDefault()
    console.log(item)
    console.log(selectItem)
    setSelectItem(item)
  }

  // handle deltete description after select item want to delete
  function handleDeleteDescription() {
    const headers = {
      'Content-Type': 'application/json',
    }
    // send a DELETE request
    axios
      .delete(`${url}/${selectItem.maMoTa}`, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setListDescription(listDescription.filter((des) => des.maMoTa !== selectItem.maMoTa)) // remove deleted brand from existing brands
        setSearchItem(null)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Description</strong>
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
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                <CForm onSubmit={handleSubmitAddDescription}>
                  <CFormInput
                    className="form-input"
                    type="text"
                    id="exampleFormControlInput1"
                    label="Input ID Product"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                    onChange={handleInputIDProduct}
                    value={idProduct}
                  />
                  <CForm>
                    <CFormTextarea
                      id="exampleFormControlTextarea1"
                      label="Input Description of Product"
                      rows={3}
                      text="Must be 8-20 words long."
                      value={description}
                      onChange={handleInputDescription}
                    ></CFormTextarea>
                  </CForm>
                  <CButton type="submit" color="success">
                    Add
                  </CButton>
                </CForm>
              </CTabPane>

              {/* this part for delete side */}
              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                <CForm>
                  <CFormInput
                    type="search"
                    label="Search"
                    className="form-input"
                    name="search-form"
                    id="search-form"
                    placeholder="Search ID product..."
                    onChange={handleSearch}
                    value={searchKey}
                  />
                  <label style={{ display: 'block' }}>
                    Select the item want to delete description
                  </label>
                  <CButton color="success" onClick={handleDeleteDescription}>
                    Delete
                  </CButton>
                </CForm>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                <CForm>
                  <CFormInput
                    type="text"
                    className="form-input"
                    id="IDProductToChange"
                    label="Select the item want to update"
                    placeholder="ID Product"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    label="Input Description of Product"
                    rows={3}
                    text="Must be 8-20 words long."
                    // value={}
                    onChange={handleInputDescription}
                  ></CFormTextarea>
                  <CButton type="submit" color="success">
                    Update
                  </CButton>
                </CForm>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>

        <CTable hover>
          <CTableHead class="thead-default">
            <CTableRow style={{ border: '3px solid black' }}>
              {columns.map((column) => (
                <CTableHeaderCell style={{ border: '3px solid black' }} key={column.key}>
                  {column.label}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {searchItem == null ? (
              listDescription.map((item, index) => (
                <CTableRow
                  style={{
                    border: '3px solid black',
                    background: selectItem && selectItem.maSp == item.maSp ? 'red' : 'white',
                  }}
                  key={index}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column) => (
                    <CTableDataCell style={{ border: '3px solid black' }} key={column.label}>
                      {item[column.key]}
                    </CTableDataCell>
                  ))}
                </CTableRow>
              ))
            ) : (
              <CTableRow
                style={{
                  border: '3px solid black',
                  background: selectItem && selectItem.maSp == searchItem.maSp ? 'red' : 'white',
                }}
                onClick={() => handleRowClick(searchItem)}
              >
                {columns.map((column) => (
                  <CTableDataCell style={{ border: '3px solid black' }} key={column.label}>
                    {searchItem[column.key]}
                  </CTableDataCell>
                ))}{' '}
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default Description
