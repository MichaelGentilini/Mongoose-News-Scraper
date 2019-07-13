$(document).ready(function () {


  console.log(" Document ready!");
  console.log(this);

  // & Event Listener for adding A Note
  $(".addNote").on("click", function () {
    console.log("Add Note requested");
    var noteId = $(this).attr("note-id");
    console.log(noteId)
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Add Note',
      showCancelButton: true,
        }).queue([
      {
        title: 'Add Note',
              },
          ]).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Adding Note!',
          html:
            '<br><pre><code>' +
            result.value ,
          // confirmButtonText: 'Thanks'
        })
      }
    })



  });

  // @ Event Listener for Saving an Article
  $(".saveArticle").on("click", function (event) {
    event.preventDefault();
    var $saveId = $(this).attr("save-id");
    var $saved = $(this).attr("isSaved");
   


    console.log($saved)
    Swal.fire({
      title: 'Do you want to save the article?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save'
    }).then((result) => {
      if (result.value) {
        // $saved = !($saved);
console.log($saved)
console.log($saved === false)



        if ($saved !== true) {
          $saved = true
        }

        $.ajax({
          method: "Get",
          url: "/saved/" + $saveId + "/" + $saved,
          success: function () {
            Swal.fire({
              type: 'success',
              text: 'Article Saved'
            })
          }
        })
      }
    })

  });

  // ! Event Listener for Deleting an Article
  $(".deleteArticle").on("click", function () {
    var $deleteId = $(this).attr("delete-id");

    Swal.fire({
      title: 'Are you sure you want to save this?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        $.ajax({
          method: "Get",
          url: "/delete/" + $deleteId,
          success: function () {},
        })

        Swal.fire({
          type: 'success',
          text: 'Article Deleted'
        })
      }
    })
  });



































});