!function(){"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var t,n,i,o,a,r,s,c,l,d;t=jQuery,i=function(e,t){var n=0;return function(){for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];var r=(new Date).getTime();if(r-n<t)return!1;window.intervalID=setTimeout((function(){e.apply(void 0,o)}),t),n=r}},o=function(e,t){var n;return function(){for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];n&&clearTimeout(n),n=setTimeout((function(){e.apply(void 0,o)}),t)}},a=function(e){var t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)},r=function(e,t){if("undefined"==typeof Swiper)throw"Swiper JS is not found";new Swiper(e,t)},s=function(e){var n=e.name,i=e.classPrefix,o=e.setArray,a=e.addClass,r=new URLSearchParams(window.location.search);r.has(n)&&r.get(n).split(",").map((function(e){o.add(e);var n=t("".concat(i).concat(e));a&&a.length&&n.addClass(a),n.prop("checked",!0)}))},c=function(e){var n="target"in e?e.target.closest("a"):e[0];if(n){var i=t(n).parents(".wc-tabs"),o=i.find(".shopengine-tabs-line"),a=i[0].getBoundingClientRect(),r=n.getBoundingClientRect().x-a.x;o.animate({width:"".concat(r,"px")},100,(function(){o.animate({left:"".concat(r,"px"),width:"30px"},100)}))}},l={get_url:function(e,t){return e.wc_ajax_url.toString().replace("%%endpoint%%",t)},is_blocked:function(e){return e.is(".processing")||e.parents(".processing").length},block:function(e){this.is_blocked(e)||e.addClass("processing").block({message:null,overlayCSS:{background:"#fff",opacity:.6}})},unblock:function(e){e.removeClass("processing").unblock()},show_notice:function(e,n){n||(n=t(".woocommerce-notices-wrapper:first")||t(".cart-empty").closest(".woocommerce")||t(".woocommerce-cart-form")),n.prepend(e)},remove_duplicate_notices:function(e){var n=[],i=e;return e.each((function(e){var o=t(this).text();void 0===n[o]?n[o]=!0:i.splice(e,1)})),i},update_cart_totals_div:function(e){t(".cart_totals").replaceWith(e),t(document.body).trigger("updated_cart_totals")},update_wc_div:function(e,n){var i=t.parseHTML(e),o=t(".shopengine-cart-form",i),a=t(".cart_totals",i),r=this.remove_duplicate_notices(t(".woocommerce-error, .woocommerce-message, .woocommerce-info",i));if(0!==t(".shopengine-cart-form").length){if(n||t(".woocommerce-error, .woocommerce-message, .woocommerce-info").remove(),0===o.length){if(t(".woocommerce-checkout").length)return void window.location.reload();var s=t(".cart-empty",i).closest(".elementor-section");t(".elementor-section-wrap").html(s),r.length>0&&this.show_notice(r),t(document.body).trigger("wc_cart_emptied")}else t(".woocommerce-checkout").length&&t(document.body).trigger("update_checkout"),t(".shopengine-cart-form").replaceWith(o),t(".shopengine-cart-form").find(':input[name="update_cart"]').prop("disabled",!0).attr("aria-disabled",!0),r.length>0&&this.show_notice(r),this.update_cart_totals_div(a);t(document.body).trigger("updated_wc_div")}else window.location.reload()}},e(n={"gutenova/test":function(e){e.find(".easin")},"gutenova/checkout-coupon-form":function(e){e.on("click","a.showcoupon",(function(){return t(".shopengine-checkout-coupon").slideToggle(400,(function(){t(".shopengine-checkout-coupon").find(":input:eq(0)").focus()})),!1})),e.on("click",'button[name="apply_coupon"]',(function(n){n.preventDefault();var i,o=e.find(".shopengine-checkout-coupon-form").find(".shopengine-checkout-coupon"),a=!!t(document.body).hasClass("shopengine-cart"),r=a?wc_cart_params:wc_checkout_params,s={security:a?wc_cart_params.apply_coupon_nonce:wc_checkout_params.apply_coupon_nonce,coupon_code:o.find('input[name="coupon_code"]').val()};return l.is_blocked(o)||(l.block(o),i=t(document.body).find(".shopengine-woocommerce-checkout .woocommerce-notices-wrapper, .shopengine-cart-table .woocommerce-notices-wrapper"),t.ajax({type:"POST",url:l.get_url(r,"apply_coupon"),data:s,success:function(e){t(".woocommerce-error, .woocommerce-message").remove(),i.after(e),o.slideUp(),l.unblock(t(o)),e&&(a?(l.block(t("div.cart_totals")),t.ajax({url:l.get_url(wc_cart_params,"get_cart_totals"),dataType:"html",success:function(e){l.update_cart_totals_div(e)},complete:function(){l.unblock(t("div.cart_totals")),t.scroll_to_notices(t('[role="alert"]'))}})):(t(document.body).trigger("applied_coupon_in_checkout",[s.coupon_code]),t(document.body).trigger("update_checkout",{update_shipping_method:!1})))},dataType:"html"})),!1}))},"gutenova/advanced-search":function(e){var n=e.find(".shopengine-search-form"),o=n.attr("action"),a=n.find(".shopengine-search-result-container"),r="";n.on("submit",(function(i){i.preventDefault();var s=t(this).serialize(),c=new URLSearchParams(s),l=c.get("s"),d=c.get("nonce");r=l,t(this).data("submitted-data")!=s&&null!==l&&""!=l&&t.ajax({url:o,method:"GET",data:s,dataType:"html",beforeSend:function(e){e.setRequestHeader("X-WP-Nonce",d),n.addClass("is-loading").data("submitted-data",s)},success:function(i){t(".shopengine-search-product").hide(),n.removeClass("is-loading").addClass("sr-container-opened"),a.find(".shopengine-search-result").html(i);var o=a.find(".shopengine-search-result")[0].getBoundingClientRect().height;o<=500?a.css({height:"".concat(o,"px")}):a.css({height:"".concat(500,"px")}),"undefined"!=typeof SimpleScrollbar&&(SimpleScrollbar.unbindEl(a[0]),SimpleScrollbar.initEl(a[0])),t("body").addClass("shopengine-sr-container-open-body"),e.find(".shopengine-search-product__item--title a").map((function(e,n){var i=t(n).text();return i=i.replaceAll(r,"<strong>".concat(r,"</strong>")),t(n).html(i),!0}))}})})),t(document).on("click",".shopengine-sr-container-open-body",(function(e){t(e.target).parents(".shopengine-search-form").length>0||(n.removeClass("sr-container-opened"),t("body").removeClass("shopengine-sr-container-open-body"))})),n.on("keyup change",".shopengine-advanced-search-input, .shopengine-ele-nav-search-select",i((function(){n.submit()}),500))},"gutenova/product-image":function(e){void 0!==t.fn.wc_product_gallery&&e.find(".woocommerce-product-gallery").wc_product_gallery(),e.find(".flex-viewport").css("height","auto"),e.on("click",".shopengine-product-image .shopengine-product-image-toggle",(function(t){t.preventDefault();var n=e.find(".woocommerce-product-gallery__trigger");n.length?n.click():e.find(".flex-active-slide a").click()})),t(".pswp__button.pswp__button--close, .pswp__container").on("click",(function(){t(".pswp--open").removeClass("pswp--open")}))},"gutenova/add-to-cart":function(e){var n=e.find("form.cart");n.length&&n.on("click",".plus, .minus",(function(){var e=n.hasClass("grouped_form")?t(this).parents("tr").find(".qty"):t(n).find(".qty"),i=e.val()?parseFloat(e.val()):0,o=parseFloat(e.attr("max")),a=parseFloat(e.attr("min")),r=parseFloat(e.attr("step"));t(this).is(".plus")?o&&o<=i?e.val(o):e.val(i+r):a&&a>=i?e.val(a):i>1&&e.val(i-r)}))},"gutenova/cart-total":function(e){var t=e.find("tr.shipping > td");t.length&&t.attr("colspan","2")},"gutenova/filter-orderby":function(e){var t=e.find(".shopengine-filter");e.find(".orderby").on("change",(function(){t.trigger("submit")}))},"gutenova/filter-products-per-page":function(e){var t=e.find(".shopengine-products-per-page");t.on("change",(function(){t.trigger("submit")}))},"gutenova/archive-products":function(e){var n={main:e.find(".shopengine-archive-products"),product:e.find(".shopengine-archive-products ul.products"),pagi:e.find(".woocommerce-pagination"),style:e.find(".shopengine-archive-products").data("pagination"),is_tooltip:e.find(".archive-product-container").data("tooltip"),tooltip_container:e.find(".archive-product-container")};if("yes"===n.is_tooltip){var i=function(e,t){t="<p class='tooltiptext'>".concat(t,"</p>"),e.each((function(e,n){n.insertAdjacentHTML("beforeend",t)}))},r=t(n.tooltip_container).find(".button"),s=t(n.tooltip_container).find(".shopengine-quickview-trigger"),c=t(n.tooltip_container).find(".shopengine-wishlist"),l=t(n.tooltip_container).find(".shopengine-comparison");r.length>0&&i(r,"Add to Cart"),s.length>0&&i(s,"Quick View"),c.length>0&&i(c,"Add to Wishlist"),l.length>0&&i(l,"Compare")}function d(i,o,a){t.ajax({url:o,beforeSend:function(){n.main.addClass("is-loading"),"numeric"!==n.style&&"default"!==n.style||window.history.pushState({},document.title,o)},success:function(o){var r=t(o).find(".shopengine-archive-products").first();if("numeric"===i||"default"===i)n.main.html(r.html()),e[0].scrollIntoView();else if("load-more"===i){var s=t(o).find(".shopengine-archive-products ul.products"),c=t(o).find(".woocommerce-pagination");n.product.append(s.html()),n.pagi.html(c.html())}else if("load-more-on-scroll"===i&&a){var l=t(o).find(".shopengine-archive-products ul.products"),d=t(o).find(".woocommerce-pagination");n.product.append(l.html()),n.pagi.html(d.html())}var p=t(".shopengine-archive-result-count > p");p.length&&p.text(r.find("p.woocommerce-result-count").text())},complete:function(){n.main.removeClass("is-loading")}})}"load-more-on-scroll"===n.style&&t(document).on("scroll",o((function(){if(a(n.pagi[0])){var t=e.find(".woocommerce-pagination .next").attr("href");t&&d(n.style,t,!0)}}),500)),n.pagi.length&&t(e).on("click","a.page-numbers",(function(e){e.preventDefault(),e.stopPropagation(),d(n.style,this.href,!1)}))},"gutenova/cart-table":function(e){e.on("click",".minus-button, .plus-button",(function(n){n.preventDefault();var i=t(this).parent(".shopengine-cart-quantity").find("input.qty"),o=parseInt(i.val(),10),a=t(n.target).is(".minus-button"),r=t(n.target).find("input.qty");r.is("input.qty")&&r[0][a?"stepDown":"stepUp"](),a?o>0&&o--:o++,i.val(o),e.find("[name=update_cart]").prop("disabled",!1)})),e.on("change",".shopengine-cart-quantity input.qty",(function(t){e.find("[name=update_cart]").prop("disabled",!1)})),e.on("click","[name=empty_cart]",(function(t){t.preventDefault(),e.find(".qty").val(0).trigger("change"),e.find("[name=update_cart]").prop("disabled",!1).trigger("click")})),e.on("click","button[name=update_cart]",(function(n){n.preventDefault();var i=e.find("form.shopengine-cart-form");if(l.is_blocked(i))return!1;l.block(i),l.block(t("div.cart_totals")),t("<input />").attr("type","hidden").attr("name","update_cart").attr("value","Update Cart").appendTo(i),t.ajax({type:i.attr("method"),url:i.attr("action"),data:i.serialize(),dataType:"html",success:function(e){l.update_wc_div(e)},complete:function(){l.unblock(i),l.unblock(t("div.cart_totals")),t.scroll_to_notices(t('[role="alert"]'))}})})),t(document).on("click",".woocommerce-cart-form .product-remove > a",(function(e){return e.preventDefault(),window.location.href=t(this).attr("href")}))},"gutenova/checkout-form-shipping":function(e){var t=e.find("#ship-to-different-address-checkbox"),n=e.find(".shipping_address");n.hide(),t.change((function(){this.checked?n.slideDown():n.hide()}))}},"gutenova/product-image",(function(e){void 0!==t.fn.wc_product_gallery&&e.find(".woocommerce-product-gallery").wc_product_gallery(),e.find(".flex-viewport").css("height","auto"),e.on("click",".shopengine-product-image .shopengine-product-image-toggle",(function(t){t.preventDefault();var n=e.find(".woocommerce-product-gallery__trigger");n.length?n.click():e.find(".flex-active-slide a").click()})),t(".pswp__button.pswp__button--close, .pswp__container").on("click",(function(){t(".pswp--open").removeClass("pswp--open")}))})),e(n,"gutenova/product-review",(function(e){e.find(".stars").length||(e.find("#rating").before('<p class="stars">\t\t\t\t\t\t<span>\t\t\t\t\t\t\t<a class="star-1" href="#">1</a>\t\t\t\t\t\t\t<a class="star-2" href="#">2</a>\t\t\t\t\t\t\t<a class="star-3" href="#">3</a>\t\t\t\t\t\t\t<a class="star-4" href="#">4</a>\t\t\t\t\t\t\t<a class="star-5" href="#">5</a>\t\t\t\t\t\t</span>\t\t\t\t\t</p>'),e.find("#rating").hide()),e.find(".stars:not(:first)").remove()})),e(n,"gutenova/product-tabs",(function(e){e.find(".wc-tabs-wrapper, .woocommerce-tabs, #rating").trigger("init");var t=e.find(".tabs.wc-tabs");if(t.length){var n=document.createElement("div");n.setAttribute("class","shopengine-tabs-line"),t[0].appendChild(n),t.on("click",c),setTimeout((function(){c(t.find("li.active a"))}),250)}})),e(n,"gutenova/related",(function(e){var t=e.find(".shopengine-related.slider-enabled");if(t.length){var n=t.data("controls"),i=Boolean(n.slider_enabled),o=parseInt(n.slides_per_view),a=Boolean(n.slider_loop),s=Boolean(n.slider_autoplay),c=parseInt(n.slider_autoplay_delay),l=parseInt(n.slider_space_between),d=e.find(".slider-enabled .related"),p=e.find(".swiper-button-next"),u=e.find(".swiper-button-prev"),f=e.find(".swiper-pagination");r(d,{direction:"horizontal",slidesPerView:o,spaceBetween:l,loop:a,breakpoints:{320:{slidesPerView:1},540:{slidesPerView:2},770:{slidesPerView:3},900:{slidesPerView:o}},wrapperClass:"products",slideClass:"product",grabCursor:!0,freeMode:!0,centeredSlides:!1,allowTouchMove:i,speed:500,parallax:!0,autoplay:!!s&&{delay:c},effect:"slide",pagination:{el:f,type:"bullets",dynamicBullets:!0,clickable:!0},navigation:{nextEl:p,prevEl:u},on:{snapGridLengthChange:function(){var e=this.slidesSizesGrid[0];this.slides.each((function(){this.style.maxWidth=e-10+"px",-1!==this.className.indexOf(" last ")&&this.classList.remove("last")}))}}})}})),e(n,"gutenova/cross-sells",(function(e){var t=e.find(".shopengine-cross-sells.slider-enabled");if(t.length){var n=t.data("controls"),i=Boolean(n.slider_enabled),o=parseInt(n.slidesPerView),a=Boolean(n.slider_loop),s=Boolean(n.slider_autoplay),c=parseInt(n.slider_autoplay_delay),l=parseInt(n.slider_space_between),d=e.find(".slider-enabled .cross-sells"),p=e.find(".swiper-button-next"),u=e.find(".swiper-button-prev"),f=e.find(".swiper-pagination");r(d,{direction:"horizontal",slidesPerView:o,spaceBetween:l,loop:a,breakpoints:{320:{slidesPerView:1},540:{slidesPerView:2},770:{slidesPerView:3},900:{slidesPerView:o}},wrapperClass:"products",slideClass:"product",grabCursor:!0,freeMode:!0,centeredSlides:!1,allowTouchMove:i,speed:500,parallax:!0,autoplay:!!s&&{delay:c},effect:"slide",pagination:{el:f,type:"bullets",dynamicBullets:!0,clickable:!0},navigation:{nextEl:p,prevEl:u},on:{snapGridLengthChange:function(){var e=this.slidesSizesGrid[0];this.slides.each((function(){this.style.maxWidth=e-10+"px",-1!==this.className.indexOf(" last ")&&this.classList.remove("last")}))}}})}})),e(n,"gutenova/up-sells",(function(e){var t=e.find(".shopengine-up-sells.slider-enabled");if(t.length){var n=t.data("controls"),i=Boolean(n.slider_enabled),o=parseInt(n.slidesPerView),a=Boolean(n.slider_loop),s=Boolean(n.slider_autoplay),c=parseInt(n.slider_autoplay_delay),l=parseInt(n.slider_space_between),d=e.find(".slider-enabled .upsells"),p=e.find(".swiper-button-next"),u=e.find(".swiper-button-prev"),f=e.find(".swiper-pagination");r(d,{direction:"horizontal",slidesPerView:o,spaceBetween:l,loop:a,breakpoints:{320:{slidesPerView:1},540:{slidesPerView:2},770:{slidesPerView:3},900:{slidesPerView:o}},wrapperClass:"products",slideClass:"product",grabCursor:!0,freeMode:!0,centeredSlides:!1,allowTouchMove:i,speed:500,parallax:!0,autoplay:!!s&&{delay:c},effect:"slide",pagination:{el:f,type:"bullets",dynamicBullets:!0,clickable:!0},navigation:{nextEl:p,prevEl:u},on:{snapGridLengthChange:function(){var e=this.slidesSizesGrid[0];this.slides.each((function(){this.style.maxWidth=e-10+"px",-1!==this.className.indexOf(" last ")&&this.classList.remove("last")}))}}})}})),e(n,"gutenova/deal-products",(function(e){var n=e.find(".deal-products"),i=e.find(".deal-products__grap--line"),o=36e5,a=24*o;t.each(n,(function(e,n){return r=t(i=n),s=JSON.parse(i.dataset.dealData),c=new Date(s.end_time.replace(/-/g,"/")).getTime(),l=r.find(".clock-days"),d=r.find(".clock-hou"),p=r.find(".clock-min"),u=r.find(".clock-sec"),void(f=setInterval((function(){var e=(new Date).getTime(),t=c-e;l.text(Math.floor(t/a)),"yes"===s.show_days?d.text(Math.floor(t%a/o)):d.text(Math.floor(t/o)),p.text(Math.floor(t%o/6e4)),u.text(Math.floor(t%6e4/1e3)),t<0&&(clearInterval(f),i.css({display:"none"}))}),500));var i,r,s,c,l,d,p,u,f}));var r=new ResizeObserver((function(e){t.each(e,(function(e,t){return i=(n=t.target).getContext("2d"),o=n.parentNode.getBoundingClientRect().width,a=n.height,s=(r=JSON.parse(n.dataset.settings)).total_sell/r.stock_qty*o,n.setAttribute("width",o+10),i.beginPath(),i.moveTo(2,a/2),i.lineTo(o,a/2),i.lineCap=r.bg_line_cap,i.lineWidth=r.bg_line_height,i.strokeStyle=r.bg_line_clr,i.stroke(),void(s>0&&(i.beginPath(),i.moveTo(2,a/2),i.lineTo(s,a/2),i.lineCap=r.prog_line_cap,i.lineWidth=r.prog_line_height,i.strokeStyle=r.prog_line_clr,i.stroke()));var n,i,o,a,r,s}))}));t.each(i,(function(e,t){r.observe(t)}))})),e(n,"gutenova/filterable-product-list",(function(e){var n=e.find(".filter-nav-link"),i=e.find(".shopengine-filterable-product-wrap"),o=e.find(".filter-content"),a=JSON.parse(e.find(".shopengine-gutenova_filterable_product_list").attr("data-widget_settings"));e.on("click",".filter-nav-link",(function(e){e.preventDefault();var r=t(this),s=r.data("product-list"),c=r.data("filter-uid");n.removeClass("active"),r.addClass("active"),o.find(".filter-".concat(c)).length?(o.find(".filtered-product-list").removeClass("active"),o.find(".filter-"+c).addClass("active")):jQuery.ajax({data:{products:s,settings:a},type:"GET",dataType:"html",url:shopEngineApiSettings.resturl+"shopengine-builder/v1/widgets_partials/filter_cat_products/",beforeSend:function(){i.addClass("is-loading")},success:function(e){o.find(".filtered-product-list").removeClass("active"),o.find(".filter-".concat(c)).length||o.append('<div class="filter-content-row filtered-product-list active filter-'+c+'">'+e+"</div>")},complete:function(){i.removeClass("is-loading")}})}))})),e(n,"gutenova/categories",(function(e){t(".shopengine-categories ul.children").hide(),t(".shopengine-categories li").removeClass("active opened"),e.find(".shopengine-categories li").on("click",(function(e){if(void 0===e.target.href&&t(e.target).hasClass("cat-parent")){e.preventDefault(),e.stopPropagation();var n=t(e.target);n.hasClass("children-expended")?(n.removeClass("children-expended"),n.find("> .children").slideUp()):(n.addClass("children-expended"),n.find("> .children").slideDown())}}))})),e(n,"gutenova/flash-sale-products",(function(e){var n=e.find(".deal-products"),i=e.find(".deal-products__grap--line"),o=36e5,a=24*o;t.each(n,(function(e,n){return r=t(i=n),s=JSON.parse(i.dataset.dealData),c=new Date(s.end_time.replace(/-/g,"/")).getTime(),l=r.find(".clock-days"),d=r.find(".clock-hou"),p=r.find(".clock-min"),u=r.find(".clock-sec"),void(f=setInterval((function(){var e=(new Date).getTime(),t=c-e;l.text(Math.floor(t/a)),"yes"===s.show_days?d.text(Math.floor(t%a/o)):d.text(Math.floor(t/o)),p.text(Math.floor(t%o/6e4)),u.text(Math.floor(t%6e4/1e3)),t<0&&(clearInterval(f),i.css({display:"none"}))}),500));var i,r,s,c,l,d,p,u,f}));var r=new ResizeObserver((function(e){t.each(e,(function(e,t){return i=(n=t.target).getContext("2d"),o=n.parentNode.getBoundingClientRect().width,a=n.height,s=(r=JSON.parse(n.dataset.settings)).total_sell/r.stock_qty*o,n.setAttribute("width",o+10),i.beginPath(),i.moveTo(2,a/2),i.lineTo(o,a/2),i.lineCap=r.bg_line_cap,i.lineWidth=r.bg_line_height,i.strokeStyle=r.bg_line_clr,i.stroke(),void(s>0&&(i.beginPath(),i.moveTo(2,a/2),i.lineTo(s,a/2),i.lineCap=r.prog_line_cap,i.lineWidth=r.prog_line_height,i.strokeStyle=r.prog_line_clr,i.stroke()));var n,i,o,a,r,s}))}));t.each(i,(function(e,t){r.observe(t)}))})),e(n,"gutenova/advanced-coupon",(function(e){e.find(".shopengine-coupon-button").on("click",(function(e){var t,n=jQuery("<input>");jQuery("body").append(n);var i=n.val(jQuery("#shopengine-coupon-code").text()).select();null!==(t=navigator)&&void 0!==t&&t.clipboard?navigator.clipboard.writeText(i.val()):document.execCommand("copy"),n.remove(),jQuery(".shopengine-coupon").addClass("shopengine-coupon-active"),setTimeout((function(){jQuery(".shopengine-coupon").removeClass("shopengine-coupon-active")}),500)}))})),e(n,"gutenova/product-size-charts",(function(e){var n=e.find(".shopengine-product-size-chart-button"),i=e.find(".shopengine-product-size-chart");n.on("click",(function(){i.css({display:"flex"})})),i.on("click",(function(){"yes"===t(this).data("model")&&i.css({display:"none"})}))})),e(n,"gutenova/product-filters",(function(e){var n=e.find(".shopengine-product-filters-wrapper"),i=n.data("filter-price"),o=n.data("filter-rating"),a=n.data("filter-color"),r=n.data("filter-category"),c=n.data("filter-attribute"),l=n.data("filter-label"),d=n.data("filter-image"),p=n.data("filter-shipping"),u=n.data("filter-stock"),f=n.data("filter-onsale"),g=n.data("filter-view-mode"),h=e.find(".shopengine-filter-price"),m=e.find(".shopengine-filter-price-slider"),v=e.find(".shopengine-filter-price-reset"),_=e.find(".shopengine-filter-price-result"),w=n.find('input[name="min_price"]'),y=n.find('input[name="max_price"]'),b=_.data("sign"),k=h.data("default-range"),x=e.find(".shopengine-filter-rating__labels"),C=new Set,S=new Set,I=e.find(".shopengine-filter-group-toggle"),T=e.find(".shopengine-filter-group-content-wrapper"),q=e.find(".shopengine-filter-group-content-underlay"),P=e.find(".shopengine-filter-group-content-close");I.add(P).add(q).on("click",(function(){I.toggleClass("active"),T.toggleClass("isactive")})),t(document).on("click",(function(e){T.hasClass("isactive")&&(e.target.closest(".shopengine-filter-group-content-wrapper, .shopengine-filter-group-toggle")||(I.toggleClass("active"),T.toggleClass("isactive")),e.target==document.querySelector(".shopengine-filter-overlay")&&T.removeClass("isactive"))})),"collapse"===g&&e.find(".shopengine-collapse .shopengine-product-filter-title").on("click",(function(e){e.preventDefault(),e.stopPropagation();var t=e.target.closest(".shopengine-filter");t.classList.toggle("open"),t.nextElementSibling.classList.toggle("open")}));var D=function(e){var t=e.form,n=e.filterInput,i=e.formInput,o={};n.map((function(e,t){o[t.name]||(o[t.name]=new Set);var n={name:t.name,classPrefix:".".concat(t.name,"-"),setArray:o[t.name]};s(n)})),n.on("change",(function(e){var n=e.target.value,a=e.target.name;o[a]||(o[a]=new Set),o[a].has(n)?o[a].delete(n):o[a].add(n),i.attr("name",a),i.attr("value",Array.from(o[a])),t.trigger("submit")}))};if("yes"===i){var j=e.find(".shopengine-filter-price"),A=!1;m.asRange("val",[10,300]);var R=new URLSearchParams(window.location.search),B=j.data("exchange-rate");R.has("min_price")&&R.has("max_price")&&(A=0!==B?[R.get("min_price")*B,R.get("max_price")*B]:[R.get("min_price"),R.get("max_price")],_.text(b+A[0]+" - "+b+A[1])),m.asRange({range:!0,min:0,max:k[1],step:1,tip:!1,scale:!1,replaceFirst:0,value:A||k}).on("asRange::change",(function(e,t,n){_.text(b+n[0]+" - "+b+n[1])})).on("asRange::moveEnd",(function(){var e=t(this).data("asRange").value;if(0!==B)var n=e[0]/B,i=e[1]/B;else n=e[0],i=e[1];w.val(n),y.val(i),j.trigger("submit")})),v.on("click",(function(){m.asRange("val",k),j.trigger("reset").trigger("submit")}))}if("yes"===o){s({name:"rating_filter",classPrefix:".shopengine-rating-name-",setArray:C,addClass:"checked"});var M=e.find(".shopengine-filter.shopengine-filter-rating");x.on("click",(function(t){t.preventDefault();var n=t.target.closest(".rating-label-triger");if(n){var i=n.dataset.rating,o=n.dataset.target,a=e.find(n),r=e.find("#".concat(o));C.has(i)?C.delete(i):C.add(i),a.hasClass("checked")?a.removeClass("checked"):a.addClass("checked"),r.attr("value",Array.from(C)),M.trigger("submit")}}))}if("yes"===a&&D({form:e.find("#shopengine_color_form"),filterInput:e.find(".shopengine-filter-colors"),formInput:e.find(".shopengine-filter-colors-value")}),"yes"===r){var L=e.find("#shopengine_category_form"),O=e.find(".shopengine-filter-categories"),V=e.find("#shopengine_filter_category"),E=e.find(".shopengine-filter-category-toggle");s({name:"shopengine_filter_category",classPrefix:".shopengine-category-name-",setArray:S}),E.on("click",(function(){var e=t(this).data("target"),n=t(this).attr("aria-expanded"),i=t(this).parent().parent();"true"===n?(i.removeClass("isActive"),t(e).slideUp(),t(this).attr("aria-expanded","false")):(i.addClass("isActive"),t(e).slideDown(),t(this).attr("aria-expanded","true"))})),O.on("click",(function(n){var i=n.target.value;S.has(i)?S.delete(i):S.add(i),V.attr("value",Array.from(S));var o=t(this).parent(),a=o.find(".shopengine-filter-category-toggle");o.parent().hasClass("isActive")||t(this).hasClass("shopengine-filter-subcategory")||e.find(".shopengine-filter-category-has-child.isActive").find(".shopengine-filter-category-toggle").trigger("click"),o.parent().hasClass("shopengine-filter-category-has-child")&&"true"!==a.attr("aria-expanded")&&a.trigger("click"),L.trigger("submit")}))}"yes"===c&&D({form:e.find("#shopengine_attribute_form"),filterInput:e.find(".shopengine-filter-attribute"),formInput:e.find(".shopengine-filter-attribute-value")}),"yes"===l&&D({form:e.find("#shopengine_label_form"),filterInput:e.find(".shopengine-filter-label"),formInput:e.find(".shopengine-filter-label-value")}),"yes"===d&&D({form:e.find("#shopengine_image_form"),filterInput:e.find(".shopengine-filter-image"),formInput:e.find(".shopengine-filter-image-value")}),"yes"===p&&D({form:e.find("#shopengine_shipping_form"),filterInput:e.find(".shopengine-filter-shipping"),formInput:e.find(".shopengine-filter-shipping-value")}),"yes"===u&&D({form:e.find("#shopengine_stock_form"),filterInput:e.find(".shopengine-filter-stock"),formInput:e.find(".shopengine-filter-stock-value")}),"yes"===f&&D({form:e.find("#shopengine_onsale_form"),filterInput:e.find(".shopengine-filter-onsale"),formInput:e.find(".shopengine-filter-onsale-value")})})),e(n,"gutenova/avatar",(function(e){var n=e.find(".shopengine-avatar__info--btn"),i=e.find("#shopengine_avatar_image_cancel_button"),o=e.find(".shopengine-avatar__thumbnail--btn"),a=e.find(".shopengine-avatar-container").data("editor"),r=e.find(".shopengine_avatar_image"),s=e.find("avatar, .avatar-100, .photo"),c=e.find(".shopengine-avatar__thumbnail--overlay-close"),l=s.attr("src");"yes"===a&&(n.fadeIn(300),i.fadeIn(300),o.fadeIn(300),c.fadeIn(300)),s.closest("form").attr("enctype","multipart/form-data"),"yes"===a?(c.on("click",(function(){c.fadeIn(300),s.attr("src",l),t(".shopengine-avatar__thumbnail--file").val(""),o.fadeIn(300)})),t(r).on("change",(function(){var e=t(this)[0].files[0],n=URL.createObjectURL(e);s.attr("src",n),c.fadeIn(300),e&&o.fadeIn(300)})),t(o).on("click",(function(){t(this).fadeIn(500),c.fadeIn(300)}))):(c.on("click",(function(){c.fadeOut(300),s.attr("src",l),t(".shopengine-avatar__thumbnail--file").val(""),o.fadeIn(300),n.fadeOut(300)})),t(r).on("change",(function(){var e=t(this)[0].files[0],i=URL.createObjectURL(e);s.attr("src",i),c.fadeIn(300),e&&(o.fadeOut(300),n.fadeIn(300))})),t(o).on("click",(function(){t(this).fadeIn(500),c.fadeOut(300)})))})),e(n,"gutenova/checkout-form-login",(function(e){var t=e.find(".woocommerce-form-login-toggle");if(0!==t.length){t.remove();var n=e.find(".shopengine-checkout-form-login"),i=t[0].outerHTML+'<div class="shopengine-checkout-login-form" style="display:none">'+n.html()+"</div>";n.html(i),e.on("click",".showlogin",(function(t){t.preventDefault();var n=e.find(".shopengine-checkout-login-form");"none"===n.css("display")?n.slideDown():n.slideUp()})),e.on("click",".woocommerce-form-login__submit",(function(t){t.preventDefault(),t.target.disabled=!0;var n=e[0].querySelector('input[name="username"]'),i=e[0].querySelector('input[name="password"]'),o=e[0].querySelector('input[name="rememberme"]'),a=e[0].querySelector(".form-row-first"),r=e[0].querySelector(".form-row-last"),s=!0;0===n.value.length?(a.querySelector(".shopengine-checkout-login-required-msg")||(a.innerHTML+='<span class="shopengine-checkout-login-required-msg" style="color:red">User name or email field is required</span>'),s=!1):a.querySelector(".shopengine-checkout-login-required-msg")&&a.querySelector(".shopengine-checkout-login-required-msg").remove(),0===i.value.length?(r.querySelector(".shopengine-checkout-login-required-msg")||(r.innerHTML+='<span class="shopengine-checkout-login-required-msg" style="color:red">Password field is required</span>'),s=!1):r.querySelector(".shopengine-checkout-login-required-msg")&&r.querySelector(".shopengine-checkout-login-required-msg").remove(),!1===s?t.target.disabled=!1:(e[0].querySelectorAll(".shopengine-checkout-login-required-msg").forEach((function(e){e.remove()})),jQuery.ajax({data:{user_login:n.value,user_password:i.value,rememberme:o.checked},type:"POST",dataType:"json",url:shopEngineApiSettings.resturl+"shopengine-builder/v1/widgets_partials/checkout_login/",success:function(){location.reload()},error:function(t){e.find(".woocommerce-NoticeGroup").remove();var n='<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout"><ul class="woocommerce-error" role="alert"><ul><li>'+t.responseJSON.message+"</li></ul></div>";jQuery(".shopengine-checkout-form-login").prepend(n)},complete:function(){e.find(".woocommerce-form-login__submit").prop("disabled",!1)}}))}))}})),e(n,"gutenova/archive-view-mode",(function(e){e.on("click",".shopengine-archive-view-mode-switch",(function(e){var n=t(this),i=n.data("view");if(e.preventDefault(),window.innerWidth<575)return!1;n.addClass("isactive"),n.siblings().removeClass("isactive"),t(document).find(".shopengine-archive-products").removeClass((function(e,n){var i=n.split(" "),o=[];return t.each(i,(function(e,t){/shopengine-archive-products--view-.*/.test(t)&&o.push(t)})),o.join(" ")})).addClass("shopengine-archive-products--view-"+i)}))})),d=n,t(window).on("gutenova/frontend/init",(function(e,t){(0,t.addCallbacks)(d)}))}();