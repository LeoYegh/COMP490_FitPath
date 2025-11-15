/**
 *
 * @author Feather Hoshizora
 * 10/09/2025
 * TestField
 * Function for input in forms, reused with different variables 
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
