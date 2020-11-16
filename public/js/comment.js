$(document).ready(() => {
  // blogContainer holds all of our posts
  const commentContainer = $("#comment-container");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);
  $(document).on("click", "button.edit", handleCommentEdit);
  let comments;

  // This function grabs posts from the database and updates the view
  function getComments() {
    $.get("/comments", data => {
      console.log("Comments", data);
      comments = data;
      if (!comments || !comments.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost() {
    $.ajax({
      method: "DELETE",
      url: "/comments/id"
    }).then(() => {
      getComments();
    });
  }

  // Getting the initial list of posts
  getComments();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    commentContainer.empty();
    const commentsToAdd = [];
    for (let i = 0; i < comments.length; i++) {
      commentsToAdd.push(createNewRow(comments[i]));
    }
    commentContainer.append(commentsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(comment) {
    const newCommentCard = $("<div>");
    newCommentCard.addClass("card");
    const newCommentCardHeading = $("<div>");
    newCommentCardHeading.addClass("card-header");
    const deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    const editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    const newCommentTitle = $("<h2>");
    const newCommentDate = $("<small>");

    const newCommentCardBody = $("<div>");
    newCommentCardBody.addClass("card-body");
    const newCommentBody = $("<p>");
    newCommentTitle.text(comment.title + " ");
    newCommentBody.text(comment.content);
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();
    newCommentDate.text(formattedDate);
    newCommentTitle.append(newCommentDate);
    newCommentCardHeading.append(deleteBtn);
    newCommentCardHeading.append(editBtn);
    newCommentCardHeading.append(newCommentTitle);
    newCommentCardBody.append(newCommentBody);
    newCommentCard.append(newCommentCardHeading);
    newCommentCard.append(newCommentCardBody);
    newCommentCard.data("comment", comment);
    return newCommentCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleCommentDelete() {
    const currentComment = $(this)
      .parent()
      .parent()
      .data("comment");
    deletePost(currentComment.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleCommentEdit() {
    const currentComment = $(this)
      .parent()
      .parent()
      .data("comment");
    console.log(currentComment);
  }
});
