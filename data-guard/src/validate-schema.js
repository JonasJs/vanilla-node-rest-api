import { extractFieldErrorsMessages } from "./extract-field-errors.js";

function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function validateSchema(schema, data) {
  if (!isObject(schema) || !isObject(data)) {
    return {
      success: false,
      errors: {
        params: "Schema and data must be objects.",
      },
    }
  }

  let validData = {};
  let validationErrors = {};

  for (let property in schema) {

    const schemaPropertyType = schema[property]?.type ?? schema[property];
    const propertyValue = data[property];

    const hasParamRequired = typeof schema[property]?.required === "boolean";
    const isRequired = hasParamRequired && schema[property].required;

    if(isRequired && propertyValue === undefined ) {
      validationErrors[property] = `${property} is required.`;
      continue;
    }

    if(propertyValue !== undefined && typeof propertyValue !== schemaPropertyType) {
      validationErrors[property] = `${property} has invalid type.`;
      continue;
    }

    if (propertyValue !== undefined) {
      validData[property] = propertyValue;
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    return {
      success: false,
      errors: validationErrors,
      formattedError: extractFieldErrorsMessages(validationErrors) 
    };
  }

  return {
    success: true,
    data: validData,
  };
}
