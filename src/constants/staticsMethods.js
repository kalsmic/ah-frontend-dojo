/**
* This is a function.
* @param {none} - An dictionary param*
* @return {style}
* @example
*      foo = () => {}
*  open or close the modal
*/
export const closeOpenModalFunction = (backdropId) => {
  const modal = document.getElementById(backdropId);
  if (modal.style.display === 'none') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
};

export const dummy = '';
