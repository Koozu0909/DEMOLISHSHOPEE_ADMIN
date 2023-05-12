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
} from '@coreui/react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Brand = () => {
  const [brands, setBrands] = useState([])
  const [brandName, setBrandName] = useState('')
  const [brandID, setBrandID] = useState('')
  const [q, setQ] = useState('')

  // define the URL of the API endpoint
  const url = 'https://localhost:44325/api/Brand'
  function handleSubmit(event) {
    event.preventDefault() // prevent the form from submitting normally
    // define the data you want to send
    const data = {
      tenThuongHieu: brandName,
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
        setBrands([...brands, response.data]) // add new brand to existing brands

        setBrandName('') // clear the brandname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  const data = Object.values(brands)

  function search(items) {
    return items.filter((item) => {
      return item.tenThuongHieu.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    })
  }

  function handleUpdate(event) {
    event.preventDefault() // prevent the form from submitting normally

    // define the data you want to send
    const data = {
      maThuongHieu: brandID,
      tenThuongHieu: brandName,
    }

    // set the request headers (optional)
    const headers = {
      'Content-Type': 'application/json',
    }

    // send a PUT request
    axios
      .put(url, data, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)

        // update the state with the updated brand
        setBrands(
          brands.map((brand) => {
            if (brand.maThuongHieu === brandID) {
              return {
                ...brand,
                tenThuongHieu: brandName,
              }
            }
            return brand
          }),
        )

        setBrandName('') // clear the brandname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  function handleDelete(event, brandID) {
    event.preventDefault() // prevent the form from submitting normally
    // define the data you want to send
    // set the request headers (optional)
    const headers = {
      'Content-Type': 'application/json',
    }
    // send a DELETE request
    axios
      .delete(`https://localhost:44325/api/Brand/${brandID}`, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setBrands(brands.filter((brand) => brand.maThuongHieu !== brandID)) // remove deleted brand from existing brands
        setBrandName('') // clear the brandname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBrands(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const columns = [
    { key: 'maThuongHieu', label: 'MaThuongHieu', _props: { scope: 'col' } },
    { key: 'tenThuongHieu', label: 'TenThuongHieu', _props: { scope: 'col' } },
  ]

  const [activeKey, setActiveKey] = useState(1)
  function handleRowClick(item) {
    console.log(item.maThuongHieu)
    setBrandID(item.maThuongHieu)
    setBrandName(item.tenThuongHieu)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Brands</strong>
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
                <CForm onSubmit={handleSubmit}>
                  <CFormInput
                    className="form-input"
                    type="text"
                    id="exampleFormControlInput1"
                    label="Add brand"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={brandName}
                    onChange={(event) => setBrandName(event.target.value)}
                  />
                  <CButton type="submit" color="success">
                    Add
                  </CButton>
                </CForm>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                <CForm>
                  <CFormInput
                    type="text"
                    className="form-input"
                    id="exampleFormControlInput1"
                    label="Delete brand"
                    placeholder="Choice brand To Delete"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={brandName}
                    disabled
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
                  <CButton onClick={(e) => handleDelete(e, brandID)}>Delete</CButton>
                </CForm>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                <CForm onSubmit={handleUpdate}>
                  <CFormInput
                    type="text"
                    className="form-input"
                    id="exampleFormControlInput1"
                    label="Add brand"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={brandName}
                    onChange={(event) => setBrandName(event.target.value)}
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

export default Brand
