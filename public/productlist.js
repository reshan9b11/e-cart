function findAllproduct() {
  $.get('/product', (data) => {
    $('#productlist').empty()
    console.log(data, "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    for (let todo of data) {

      $('#productlist').append(
        `<li> ${todo.name} ${todo.price}  ${todo.quantity}
      <button id="${todo.id}" onclick="deleteproduct(this.id)" style="background-color:red" >Delete</button> 
      <br>
      <br> </li>`
      )
    }
  })
}

function populateVendors(){
  $.get('/vendor', (data)=>{
    $("#vendorlist").empty();
    for (let todo of data) {
      $("#vendorlist").append(
        `
        <option value="${todo.id}">${todo.name}</option>
      `
      )
    }
  })
}

function deleteproduct(id) {
  $.post('/deletproduct', {
    id: id
  }, (data) => {
    if (data.success) {
      findAllproduct()
    } else {
      alert('something wrong');
    }
  })
}


function addproduct() {
  $('#addtask').click(() => {
  $.post(
      '/product',
      {
        name: $('#productname').val(),
        price: $('#productprice').val(),
        quantity: $('#productquantity').val(),
        vendorId: $('#vendorlist :selected').val()
      },
      (data) => {
        if (data.success) {
          findAllproduct()
        } else {
          alert('Some error occurred')
        }
      }
    )
  })

}


$(() => {
  populateVendors();
  findAllproduct()
  addproduct()

})
