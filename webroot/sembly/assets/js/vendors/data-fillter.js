(function($) {
    ("use strict");

    /*Data Fillter*/
    $(".btn-filter").on("click", (e) => {
        const dataFilter = $(e.target).attr("data-filter");
        const filter = dataFilter.split(" ");

        console.log(dataFilter);
        console.log(filter);

        const items = $(".item-content").parent();
        for (item of items) {
            if (filter == "") {
                $(item).addClass("animate__animated animate__fadeIn");
                $(item).parent().addClass("animate__animated animate__fadeIn");
                $(item).removeClass("d-none");
                $(item).parent().removeClass("d-none");
            } else if ($(item).attr("data-category") == filter) {
                $(item).addClass("animate__animated animate__fadeIn");
                $(item).parent().addClass("animate__animated animate__fadeIn");
                $(item).removeClass("d-none");
                $(item).parent().removeClass("d-none");
            } else {
                $(item).addClass("d-none");
                $(item).parent().addClass("d-none");
                $(item).removeClass("animate__animated animate__fadeIn");
                $(item).parent().removeClass("animate__animated animate__fadeIn");
            }
        }
    });

    $(".filter-nav button").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
})(jQuery);
