/* eslint-disable prefer-const */
$(document).ready(() => {
  // blogContainer holds all of our posts
  const commentContainer = $("#comment-container");
  const nameInput = $("#name");
  const titleInput = $("#title");
  const commentInput = $("#comment-box");
  const topic = $("#topicTitle");
  const topicURL = $("#topicURL");
  let score = 0;

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);

  $(".pointUp").on("click", () => {
    scoreUp(plusOne);
  });

  let comments;

  // This function grabs posts from the database and updates the view
  function getComments() {
    $.ajax({
      method: "GET",
      url: "/api/comments"
    }).then(res => {
      console.log(res);
      comments = res;

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

  function getTopic() {
    $.ajax({
      method: "GET",
      url: "/api/topics/1"
    }).then(res => {
      console.log(res.topic);
      console.log(res.URL);
      topic.text(res.topic);
      topicURL.text(res.URL);
    });
  }

  getTopic();

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
    commentContainer.prepend(commentsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(comment) {
    const newCommentCard = $("<div>");
    newCommentCard.addClass("card");
    const newCommentCardHeading = $("<div>");
    newCommentCardHeading.addClass("card-header");
    const deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger");
    const newCommentName = $("<h2>");
    const newCommentTitle = $("<h3>");
    const newCommentDate = $("<small>");
    const arrowup = $("<i class='fas fa-arrow-circle-up'></i>");
    const arrowdown = $("<i class='fas fa-arrow-circle-down'></i>'");
    // eslint-disable-next-line prefer-const

    const newCommentCardBody = $("<div>");
    newCommentCardBody.addClass("card-body");
    const newCommentBody = $("<p>");
    const upArrowHTML = $("<button class='pointUp'>");
    const downArrowHTML = $("<button class='pointDown'>");
    const pointUpBox = $("<h3 type='input' class='score'>");

    newCommentName.text(comment.name + " ");
    newCommentTitle.text(comment.title + " ");
    newCommentBody.text(comment.content);
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();
    newCommentDate.text(formattedDate);
    upArrowHTML.html(arrowup);
    pointUpBox.text(score);
    downArrowHTML.html(arrowdown);
    newCommentName.append(newCommentName);
    newCommentTitle.append(newCommentDate);
    newCommentCardHeading.append(newCommentName);
    newCommentCardHeading.append(newCommentTitle);
    newCommentCardBody.append(newCommentBody);
    newCommentCardBody.append(upArrowHTML);
    newCommentCardBody.append(pointUpBox);
    newCommentCardBody.append(downArrowHTML);
    newCommentCardBody.append(deleteBtn);
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
