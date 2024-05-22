export function extractFieldErrorsMessages(errors = { error: "invalid filesds" }) {
  const fieldErrors = [];
  
  for (const field in errors) {
    const errorMessage = errors[field];

    const fieldError = {
      field,
      message: errorMessage,
    };

    fieldErrors.push(fieldError);
  }

  return fieldErrors;
}
