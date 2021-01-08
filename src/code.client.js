window.steedosMonacoEditorWindows = {};
window.addEventListener('message', function(result){
    try {
        const data = JSON.parse(result.data);
        if(data.steedosMonacoEditor){
            _.each(data.steedosMonacoEditor, function(v, k){
                const element = $(`#${k}`);
                if(_.has(v, 'code')){
                    element.val(v.code || '');
                }else if(_.has(v, 'init')){
                    const code = element.val() || '';
                    window.steedosMonacoEditorWindows[k].postMessage(JSON.stringify({steedosMonacoEditor: {code: code.replaceAll('\r','\\r').replaceAll('\n','\\n')}}));
                }
            })
        }
    } catch (error) {
        // console.error('error', error);
    }
});

$("body").on('click', '.widearea-icon', function(e){
    if(!FlowRouter.current().path.startsWith("/app/admin/")){
        return ;
    }
    $(".widearea-icon.close").click();
    const target = e.currentTarget.parentElement.id.split('-')[1];
    const title = $(`[for='${target}']`).text();
    window.steedosMonacoEditorWindows[target] = window.open(`/code-builder?target=${target}&title=${title}`,'newwindow-' + target, 'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
})