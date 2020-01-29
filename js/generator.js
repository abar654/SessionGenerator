checkCheckboxes();

function checkCheckboxes() {
  let inputs = document.getElementsByTagName("input");
  for(input of inputs){
    if(input.type == "checkbox") {
      input.checked = true;
    }
  }
}
