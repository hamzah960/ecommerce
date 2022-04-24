import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import '@fortawesome/fontawesome-free/js/all.min';



$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').on('click', function() {
        alert('أضيف المنتج الى عربة الشراء');
    });

    $('#copyright span').html(new Date().getFullYear());

});