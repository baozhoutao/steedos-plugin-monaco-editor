$("body").on('click', '.widearea-icon', function(e){
    $(".widearea-icon.close").click();
    console.log('click');
    const element = $("#"+e.currentTarget.parentElement.id.split('-')[1]);
    window.addEventListener('message', function(result){
        element.val(result.data)
    })

    var codeWindow = window.open('/code-builder');
    window.codeWindow= codeWindow;
    setTimeout(function(){
        console.log('element.val()-->', element.val());
        codeWindow.postMessage(element.val());
    }, 1000)
})