
const selectElement = selector => {
    const element = document.querySelector(selector);
    if(element) 
      return element;

    throw new Error(`Something went wrong! Make sure that ${selector} exists.`);  
};