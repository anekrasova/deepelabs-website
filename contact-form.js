(function () {
  var form = document.getElementById("contact-mail-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("contact-name").value;
    var email = document.getElementById("contact-email").value;
    var message = document.getElementById("contact-message").value;

    var subject = "New message from deepelabs.com";
    var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;

    window.location.href = "mailto:hello@deepelabs.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
