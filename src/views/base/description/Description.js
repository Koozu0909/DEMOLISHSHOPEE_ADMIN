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
                    type="text"
                    className="form-input"
                    id="exampleFormControlInput1"
                    label="Delete Tag"
                    placeholder="Choice Tag To Delete"
                    aria-describedby="exampleFormControlInputHelpInline"
                    disabled
                  />
                  <CFormInput
                    type="search"
                    className="form-input"
                    name="search-form"
                    id="search-form"
                    placeholder="Search for..."
                    // onChange={(e) => setQ(e.target.value)}
                  />
                  <CButton>Delete</CButton>
                </CForm>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                <CForm>
                  <CFormInput
                    type="text"
                    className="form-input"
                    id="exampleFormControlInput1"
                    label="Add Tag"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                  <CFormInput
                    type="search"
                    className="form-input"
                    name="search-form"
                    id="search-form"
                    placeholder="Search for..."
                    // value={q}
                  />
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
            {listDescription.map((item, index) => (
              <CTableRow
                style={{ border: '3px solid black' }}
                key={index}
                // onClick={() => handleRowClick(item)}
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

export default Description
