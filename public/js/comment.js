$(document).ready(() => {
  // blogContainer holds all of our posts
  const commentContainer = $("#comment-container");
  const nameInput = $("#name");
  const titleInput = $("#title");
  const commentInput = $("#comment-box");
  const topic = $("#topicTitle");
  const topicURL = $("#topicURL");
  const topicTag = $("#topicTag");
  const score = 0;

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleCommentDelete);

  //score up

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
  function deleteComment(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/comments/" + id
    }).then(() => {
      getComments();
    });
  }
  //function to get topic
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
  //function to refresh topic

  getTopic1();
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
    const newArrowIconUP = $("<i>");
    newArrowIconUP.addClass("fas fa-arrow-circle-up");
    const newArrowIconDown = $("<i>");
    newArrowIconDown.addClass("fas fa-arrow-circle-down");
    const newCommentCardBody = $("<div>");
    newCommentCardBody.addClass("card-body");
    const newCommentBody = $("<p>");
    const upArrowHTML = $("<button>");
    upArrowHTML.addClass("pointUp");
    const downArrowHTML = $("<button>");
    downArrowHTML.addClass("pointDown");
    const pointUpBox = $("<div>");
    pointUpBox.addClass("score");

    newCommentName.text(comment.name + " ");
    newCommentTitle.text(comment.title + " ");
    newCommentBody.text(comment.content);
    const formattedDate = new Date(comment.createdAt).toLocaleDateString();
    newCommentDate.text(formattedDate);
    upArrowHTML.html(newArrowIconUP);
    pointUpBox.text(score);
    downArrowHTML.html(newArrowIconDown);
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

  //submit comment
  $("#comment-submit").on("click", event => {
    event.preventDefault();

    newComment();
  });

  //Topic1
  $("#Topic1").on("click", () => {
    getTopic1();
  });

  $("#Topic2").on("click", () => {
    getTopic2();
  });

  $("#Topic3").on("click", () => {
    getTopic3();
  });

  $(".pointUp").on("click", event => {
    event.preventDefault();
    $("div > .car").each(function(index) {
      console.log(`${index}: ${this.id}`);
    });
  });
  //point up function
  /*$(document).on("click", "button.pointUp", event => {
    event.preventDefault();

    score += 1;
    $(".score").text(score);
  });

  $(document).on("click", "button.pointDown", event => {
    event.preventDefault();

    score -= 1;
    $(".score").text(score);
  });*/
});
