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

const Accordion = () => {
  const [tags, setTags] = useState([])
  const [tagName, setTagName] = useState('')
  const [tagID, setTagID] = useState('')
  const [q, setQ] = useState('')

  // define the URL of the API endpoint
  const url = 'https://localhost:44325/api/Tag'
  function handleSubmit(event) {
    event.preventDefault() // prevent the form from submitting normally
    // define the data you want to send
    const data = {
      tenTag: tagName,
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
        setTags([...tags, response.data]) // add new tag to existing tags

        setTagName('') // clear the tagname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  const data = Object.values(tags)

  function search(items) {
    return items.filter((item) => {
      return item.tenTag.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
    })
  }

  function handleUpdate(event) {
    event.preventDefault() // prevent the form from submitting normally

    // define the data you want to send
    const data = {
      maTag: tagID,
      tenTag: tagName,
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

        // update the state with the updated tag
        setTags(
          tags.map((tag) => {
            if (tag.maTag === tagID) {
              return {
                ...tag,
                tenTag: tagName,
              }
            }
            return tag
          }),
        )

        setTagName('') // clear the tagname input
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }
  function handleDelete(event, tagID) {
    event.preventDefault() // prevent the form from submitting normally
    // define the data you want to send
    // set the request headers (optional)
    const headers = {
      'Content-Type': 'application/json',
    }
    // send a DELETE request
    axios
      .delete(`https://localhost:44325/api/Tag/${tagID}`, { headers })
      .then((response) => {
        // handle success
        console.log(response.data)
        setTags(tags.filter((tag) => tag.maTag !== tagID)) // remove deleted tag from existing tags
        setTagName('') // clear the tagname input
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
        setTags(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const columns = [
    { key: 'maTag', label: 'MaTag', _props: { scope: 'col' } },
    { key: 'tenTag', label: 'TenTag', _props: { scope: 'col' } },
  ]

  const [activeKey, setActiveKey] = useState(1)
  function handleRowClick(item) {
    console.log(item.maTag)
    setTagID(item.maTag)
    setTagName(item.tenTag)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tags</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
                  Add
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
                  Delete
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
                  Update
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                <CForm onSubmit={handleSubmit}>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    label="Add Tag"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={tagName}
                    onChange={(event) => setTagName(event.target.value)}
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
                    id="exampleFormControlInput1"
                    label="Delete Tag"
                    placeholder="Choice Tag To Delete"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={tagName}
                    disabled
                  />
                  <CFormInput
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <CButton onClick={(e) => handleDelete(e, tagID)}>Delete</CButton>
                </CForm>
              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 3}>
                <CForm onSubmit={handleUpdate}>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    label="Add Tag"
                    placeholder="Add here"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={tagName}
                    onChange={(event) => setTagName(event.target.value)}
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
          <CTableHead>
            <CTableRow>
              {columns.map((column) => (
                <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {search(data).map((item, index) => (
              <CTableRow key={index} onClick={() => handleRowClick(item)}>
                {columns.map((column) => (
                  <CTableDataCell key={column.label}>{item[column.key]}</CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default Accordion
