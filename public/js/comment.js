// When user clicks add-btn
$(document).ready(() => {
  // blogContainer holds all of our posts
  const commentContainer = $("#comment-container");
  const nameInput = $("#name");
  const titleInput = $("#title");
  const commentInput = $("#comment-box");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);
  $(document).on("click", "button.edit", handleCommentEdit);
  let comments;

  // This function grabs posts from the database and updates the view
  function getComments(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/comments", data => {
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
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
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
    const newCommentName = $("<h2>");
    const newCommentTitle = $("<h2>");
    const newCommentDate = $("<small>");

    const newCommentCardBody = $("<div>");
    newCommentCardBody.addClass("card-body");
    const newCommentBody = $("<p>");
    newCommentName.text(comment.name);
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

  function newComment() {
    const newComment = {
      name: nameInput.val(),
      title: titleInput.val(),
      content: commentInput.val()
    };
    console.log(newComment);
    comment = newComment;

    submitComment(comment);
  }

  function submitComment(comment) {
    $.post("/api/comments", comment, () => {
      window.location.reload();
    });
  }

  $("#comment-submit").on("click", event => {
    event.preventDefault();

    newComment();
  });

  getComments();
});
