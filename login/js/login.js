/**
 * Created by 夜雪霜蓝 on 2017/9/6.
 */
$(document).ready(function () {

$('#button').click(function (e) {
    e.preventDefault();

    var formData=$('form').serialize();

    $.post('http://localhost:8088/login',formData,function (data,status) {
        $('.ajax').css('color','red').html(data);

    })
})
})


