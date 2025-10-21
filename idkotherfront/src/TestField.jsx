/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
export default function TestField({ field, type = "text", ...rest }) {
  const id = `input-${field.toLowerCase()}`;
  return (
    <>
      <label htmlFor={id}>Enter {field}:</label>{" "}
      <input
        id={id}
        name={field}                 
        type={type}
        placeholder={`Enter ${field}`}
        {...rest}
      />
      <hr />
    </>
  );
}