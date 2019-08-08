$(document).ready(function () {
  var location = window.location.href.split("/");
  console.log("current route: " + location[location.length - 1]);

  // & Event Listener for adding A Note
  $(".addNote").on("click", function (e) {
    e.preventDefault();
    var $note = $(this).attr("isNote");
    var thisId = $(this).attr("note-id");

    Swal.fire({
      title: 'Do you want to save the article?',
      input: 'textarea',
      inputPlaceholder: 'Want to add a Note?',
      confirmButtonText: 'Add Note',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Save',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        if ($note !== true) {
          $note = true
          console.log($note)
        }
        $.ajax({
          method: "POST",
          url: "/notes/" + thisId,
          data: {
            body: result.value
          }
        }).then(function (data) {
          Swal.fire(
            'Added Note!',
          )
          console.log(data);
        });
        window.location.reload()
      }
    })
  });

  $(".viewNote").on("click", function () {

    var $thisId = $(this).attr("note-id");
    $.ajax({
        method: "Get",
        url: "/getnote/" + $thisId
      })
      .then(function (data) {
        console.log(data.body);

        Swal.fire({
          type: 'info',
          // text: 'Note',
          text: data.body
        });
      });
  });

  // @ Event Listener for Saving an Article
  $(".saveArticle").on("click", function (event) {
    event.preventDefault();
    var $saveId = $(this).attr("save-id");
    var $saved = $(this).attr("issaved");
    Swal.fire({
      title: 'Do you want to save the article?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save'
    }).then((result) => {
      if (result.value) {
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
            });
          }
        });
        window.location.reload()
      }
    });

  });

  // ! Event Listener for Deleting an Article
  $(".deleteArticle").on("click", function () {
    var $deleteId = $(this).attr("delete-id");

    Swal.fire({
      title: 'Are you sure you want to delete this article?',
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
      setTimeout(
        window.location.reload(), 5000)
    })
  });



});
