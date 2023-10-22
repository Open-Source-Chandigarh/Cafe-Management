document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;
            const arrow = question.querySelector(".arrow");

            if (answer.style.display === "block" || getComputedStyle(answer).display === "block") {
                answer.style.display = "none";
                arrow.textContent = "+";
            } else {
                answer.style.display = "block";
                arrow.textContent = "-";
            }
        });
    });
});
