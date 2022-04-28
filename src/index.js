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

    $('.product-option input[type="radio"]').change(function() {

        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');

    });

    // عندما تتغير كمية المنتج
    $('[data-product-quantity]').change(function () {

        // اجلب الكمية الجديدة
        var newQuantity = $(this).val();
        

        // ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var parent = $(this).parents('[data-product-info]');

        // اجلب سعر القطعة الواحدة من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');

        // السعر الاجمالي للمنتج هو سعر القطعه مضروبا بالكمية
        var totalPriceForProduct = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        //حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        // انشئ متغيرا جديدا لحفظ السعر الاجمالي
        var totalPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات المنتج في الصفحة
        $('[data-product-info]').each(function() {
            
            //اجلب سعر القطعه الواحدة من الخاصية الموافقة
            var pricePerUnit = $(this).attr('data-product-price');

            //اجلب كمية النتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            // اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات واحفظ القيمة في المتغير نفسة
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        // حدث السعر الاجمالي لكل المنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');

    };

    $('[data-remove-from-cart]').on('click', function() {

        $(this).parents('[data-product-info]').remove();

        // اعد حساب السعر الاجمالي بعد حذف احدى المنتجات
        calculateTotalPrice();

    });

    var citiesByCountry = {
        sa: ['جدة', 'الرياض'],
        eg: ['الاسكندرية', 'القاهرة'],
        jo: ['الزرقاء', 'عمان'],
        sy: ['حماه', 'حلب', 'دمشق']
    };

    // عندما يتغير البلد
    $('#form-checkout select[name="country"]').change(function() {
        
        // اجلب رمز البلد
        var country = $(this).val();

        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();

        // اعادة اضافة خيار اختر مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        // اعد المدن الى قائمة المدن
        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').change(function() {
        
        // اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivary') {
            
            $('#credit-card-info').hide();

        } else {

            $('#credit-card-info').show();
            
        }

    });
});