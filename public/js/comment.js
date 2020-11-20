$(document).ready(() => {
  // blogContainer holds all of our posts
  const commentContainer = $("#comment-container");
  const nameInput = $("#name");
  const titleInput = $("#title");
  const commentInput = $("#comment-box");
  const topic = $("#topicTitle");
  const topicURL = $("#topicURL");
  const topicTag = $("#topicTag");
  // Click events for the delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);
  //making comment a global variable
  let comments;
  // This function grabs comments from the database and updates the view
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
  // This function does an API call to delete comments
  function deleteComment(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
    }).then(() => {
      getComments();
    });
  }
  //function to get topic1
  function getTopic1() {
    $.ajax({
      method: "GET",
      url: "/api/topics/1"
    }).then(res => {
      console.log(res.topic);
      console.log(res.URL);
      topic.text(res.topic);
      topicURL.text(res.URL);
      topicTag.attr("target", "_blank");
      topicTag.attr("href", `${res.URL}`);
    });
  }
  //function to get topic2

  function getTopic2() {
    $.ajax({
      method: "GET",
      url: "/api/topics/2"
    }).then(res => {
      console.log(res.topic);
      console.log(res.URL);
      topic.text(res.topic);
      topicURL.text(res.URL);
      topicTag.attr("target", "_blank");
      topicTag.attr("href", `${res.URL}`);
    });
  }
  //function to get topic3
  function getTopic3() {
    $.ajax({
      method: "GET",
      url: "/api/topics/3"
    }).then(res => {
      console.log(res.topic);
      console.log(res.URL);
      topic.text(res.topic);
      topicURL.text(res.URL);
      topicTag.attr("target", "_blank");
      topicTag.attr("href", `${res.URL}`);
    });
  }
  //function to get first topic on page load
  getTopic1();
  // Getting the initial list of Comments
  getComments();
  // InitializeRows handles appending all of our constructed comment HTML inside
  function initializeRows() {
    commentContainer.empty();
    const commentsToAdd = [];
    for (let i = 0; i < comments.length; i++) {
      commentsToAdd.push(createNewRow(comments[i]));
    }
    commentContainer.prepend(commentsToAdd);
  }
  // This function constructs a coments's HTML
  function createNewRow(comment) {
    const newCommentCard = $("<div>");
    newCommentCard.addClass("card");
    const newCommentCardHeading = $("<div>");
    newCommentCardHeading.addClass("card-header");
    const deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("delete btn btn-danger float-right");
    const newCommentName = $("<h2>");
    const newCommentTitle = $("<h3>");
    const newCommentDate = $("<small>");
    const newCommentCardBody = $("<div>");
    newCommentCardBody.addClass("card-body");
    const newCommentBody = $("<p>");
    newCommentName.text(comment.name + " ");
    newCommentTitle.text(comment.title + " ");
    newCommentBody.text(comment.content);
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();
    newCommentDate.text(formattedDate);
    newCommentName.append(newCommentName);
    newCommentTitle.append(newCommentDate);
    newCommentCardHeading.append(newCommentName);
    newCommentCardHeading.append(newCommentTitle);
    newCommentCardBody.append(newCommentBody);
    newCommentCardBody.append(deleteBtn);
    newCommentCard.append(newCommentCardHeading);
    newCommentCard.append(newCommentCardBody);
    newCommentCard.data("comment", comment);
    return newCommentCard;
  }
  // This function figures out which comment we want to delete
  function handleCommentDelete() {
    const currentComment = $(this)
      .parent()
      .parent()
      .data("comment");
    deleteComment(currentComment.id);
  }

  //Creates a new comment to submit to the Database
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
  //Submits a new comment and posts it to the api, then refreshes the page with new comment.
  function submitComment(comment) {
    $.post("/api/comments", comment, () => {
      window.location.reload();
    });
  }
  //Displays message if comment container is empty
  function displayEmpty() {
    commentContainer.empty();
    const messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "30px" });
    messageH2.html("Start the Debate! Enter a Comment!`");
    commentContainer.append(messageH2);
  }
  //submit comment click events
  $("#comment-submit").on("click", event => {
    event.preventDefault();
    newComment();
  });
  //Changes topic
  $("#Topic1").on("click", () => {
    getTopic1();
  });

  $("#Topic2").on("click", () => {
    getTopic2();
  });

  $("#Topic3").on("click", () => {
    getTopic3();
  });
});
