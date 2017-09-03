/**
 * Created by 夜雪霜蓝 on 2017/9/2.
 */
$(document).ready(function () {
    $('#type').change(function () {
        //给用户类型禁用和启用注册信息
        var option=$('#type option:selected');
        if(option.val()=='学生'||option.val()=='老师')
        {
            $('#adminNum').attr("disabled",'disabled');
        }
        else {
            $('#adminNum').attr("disabled",false);
        }
    });
});