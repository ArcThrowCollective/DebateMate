/* eslint-disable @typescript-eslint/no-explicit-any */

export const handleFormSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  extraData: Record<string, any> = {}
) => {
  e.preventDefault();

  // Get all form feilds
  const formData = new FormData(e.currentTarget);

  // Merge additional data - like the stars
  console.log('This is formData ', formData);
  for (const key in extraData) {
    formData.append(key, extraData[key].toString());
  }

  const formObject = Object.fromEntries(formData.entries());

  console.log('Form submitted:', formObject);

  // Return the form data!
  return formObject;
};
