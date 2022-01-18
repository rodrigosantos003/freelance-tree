/*
  SMOOTH SCROLL (Script Externo)
  Quando o user clica num link, é feito o scroll para a secção indicada no link
*/
$(document).ready(function () {
  $("a.scrollLink").click(function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500
    );
  });
});
