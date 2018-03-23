var lsm_open = true;

function toggle_lsm() {

    var categories = $(".lsm_category");
    if (lsm_open) {
        for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            category.innerHTML = category.getAttribute("name")[0];
        }

        $(".lsm_subcat_dropdown").slideUp("fast");
        $("#section_lsm").animate({width: "5%"}, function () {
            $("#lsm_slider_icon").removeClass("fa fa-angle-double-left")
                    .addClass("fa fa-angle-double-right");
        });
    } else {
        $("#section_lsm").animate({width: "20%"}, function () {
            $("#lsm_slider_icon").removeClass("fa fa-angle-double-right")
                    .addClass("fa fa-angle-double-left");
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                category.innerHTML = category.getAttribute("name");
            }
        });

    }
    lsm_open = !lsm_open;
}

function search(category, term) {
    $("#section_main").append(document.createTextNode("you serached for " + term + " in " + category + "."));
}

function toggle_subcat(el) {
    if (!lsm_open)
        toggle_lsm();
    var dropdown = $(el).parent().find(".lsm_subcat_dropdown");
    dropdown.slideToggle("fast");
    //dropdown.animate({height: "60px"});
}

function setup_categories(data) {
    Object.keys(data).forEach(function (key) {
        var el = document.createElement("a");
        el.href = data[key]["link"];
        el.innerHTML = key;
        $("#selection_area").append(el);

        el = document.createElement("option");
        el.value = el.innerHTML = key;
        $("#search_category").append(el);

        var cat = document.createElement("div");
        cat.innerHTML = key;
        cat.setAttribute("name", key);
        cat.className = "pointer lsm_category";
        cat.addEventListener("click", function () {
            toggle_subcat(this);
        });
        el = document.createElement("div");
        el.append(cat);

        if (data[key]["subcat"]) {
            var subcat = data[key]["subcat"];
            var subcat_dropdown = document.createElement("div")
            subcat_dropdown.className = "lsm_subcat_dropdown";
            subcat_dropdown.id = key;
            Object.keys(subcat).forEach(function (key) {
                var subcat_el = document.createElement("a");
                subcat_el.innerHTML = key;
                subcat_el.className = "lsm_subcat pointer";
                subcat_el.href = subcat[key]["link"];
                subcat_dropdown.append(subcat_el);
            });
            el.append(subcat_dropdown);
        }

        $("#section_lsm").append(el);

    });
}

$(document).ready(function () {
    $.get("categories.json", (data) => {
        setup_categories(data);
    });
});

