
  function deletedVendor(id) {
    $.post('/deletevendor', {
      id: id
    }, ((data) => {
      if (data.success) {
        findallVendors()
      } else {
        alert('something wrong');
      }
    })
    )
  }



  function findallVendors() {
    $.get('/vendor', (data)=>{
      $('#vendorlist').empty()
      for (let todo of data) {
      $('#vendorlist').append(
        `<li> ${todo.name} 
        
        <button id="${todo.id}" onclick="deletedVendor(this.id)" style="background-color:red" >Delete</button>
        <br>
        </li>`
      )
    }
    })
  }

  function addVendor() {
    $('#addtask').click(() => {
      $.post('/vendor', {
        name: $('#vendorname').val()
      },(data)=>{
    if (data.success) {
      findallVendors()
    } else {
      alert('Some error occurred');
    }
  }
)
  })
  }
  
  

$(() => {

  findallVendors()
  addVendor()
  

})
