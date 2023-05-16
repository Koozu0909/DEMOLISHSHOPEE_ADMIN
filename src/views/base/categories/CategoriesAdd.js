// import React from 'react'
// import { CForm, CFormSelect, CFormInput, CButton, CContainer, CRow, CCol } from '@coreui/react'
// const CategoriesAdd = (
//   categories,
//   selectedCategoryId,
//   handleChange,
//   selectedSubCategoryId,
//   handleChangeSub,
//   filterSubcategories,
//   filterSecondSubcategories,
//   selectedFile,
//   handleFileChange,
//   categoriesName,
//   setCategoriesName,
//   roles,
//   roleID,
//   handleChangeRole,
//   handleSubmit,
// ) => {
//   return (
//     <CForm onSubmit={handleSubmit}>
//       <CContainer>
//         <CRow>
//           <CCol xs={7} style={{ paddingLeft: '0px', marginTop: '20px' }}>
//             {' '}
//             <CFormSelect
//               label="Loại Sản Phẩm LV1"
//               className="form-input"
//               style={{ width: '87%', marginLeft: '0px' }}
//               name="categories"
//               value={selectedCategoryId}
//               onChange={handleChange}
//               {...(roleID < 2 && { disabled: true })}
//             >
//               <option value="">-- Select category --</option>
//               {categories
//                 .filter((category) => category.role === 1)
//                 .map((category) => (
//                   <option key={category.maLoaiSp} value={category.maLoaiSp}>
//                     {category.tenLoaiSp}
//                   </option>
//                 ))}
//             </CFormSelect>
//             <CFormSelect
//               label="Loại Sản Phẩm LV2"
//               name="subcategories"
//               className="form-input"
//               value={selectedSubCategoryId}
//               onChange={handleChangeSub}
//               {...(roleID < 3 && { disabled: true })}
//             >
//               <option value="">-- Select subcategory --</option>
//               {filterSubcategories().map((subcategory) => (
//                 <option key={subcategory.maLoaiSp} value={subcategory.maLoaiSp}>
//                   {subcategory.tenLoaiSp}
//                 </option>
//               ))}
//             </CFormSelect>
//             <CFormSelect
//               label="Loại Sản Phẩm LV3"
//               name="secondsubcategories"
//               className="form-input"
//               disabled
//               {...(roleID == 3 && { disabled: false })}
//             >
//               <option value="">-- Select subcategory --</option>
//               {filterSecondSubcategories().map((secondsubcategory) => (
//                 <option key={secondsubcategory.maLoaiSp} value={secondsubcategory.maLoaiSp}>
//                   {secondsubcategory.tenLoaiSp}
//                 </option>
//               ))}
//             </CFormSelect>
//             <CFormInput
//               className="form-input"
//               type="file"
//               id="exampleFormControlInput1"
//               placeholder="Add here"
//               onChange={handleFileChange}
//               aria-describedby="exampleFormControlInputHelpInline"
//               {...(roleID == 0 && { disabled: true })}
//             />
//             <CFormInput
//               className="form-input"
//               type="text"
//               id="exampleFormControlInput1"
//               label="Add categories"
//               placeholder="Add here"
//               aria-describedby="exampleFormControlInputHelpInline"
//               value={categoriesName}
//               onChange={(event) => setCategoriesName(event.target.value)}
//               {...(roleID == 0 && { disabled: true })}
//             />
//           </CCol>
//           <CCol xs={5} style={{ marginTop: '20px' }}>
//             <CFormSelect
//               label=" Chọn Cấp Độ Loại Sản Phẩm Muốn Thêm"
//               className="form-input"
//               name="categories"
//               value={roleID}
//               onChange={handleChangeRole}
//             >
//               <option value="0">-- Select Role --</option>
//               {roles.map((role) => (
//                 <option key={role.role} value={role.role}>
//                   {role.tenRole}
//                 </option>
//               ))}
//             </CFormSelect>
//             <picture>
//               {selectedFile && (
//                 <img
//                   style={{ width: '250px', height: '200px' }}
//                   src={selectedFile}
//                   alt="cate-img"
//                   className="img-thumbnail"
//                 />
//               )}
//             </picture>
//           </CCol>
//         </CRow>
//       </CContainer>

//       <CButton type="submit" color="success">
//         Add
//       </CButton>
//     </CForm>
//   )
// }

// export default CategoriesAdd
