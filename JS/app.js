function newAction () {
    if ( !$('#myInput').val() ) {
        $('#myInput').focus();
    } else {
        var item = $('#myInput').val();
        $('#todo-list').append("<li class=\"list-group-item\">" + item + "</li>");
        $('#myInput').val('').focus();
        makeClickable();
        $('#clearAll').prop('disabled', false)
    }
    updateStatusBar();
}

function makeClickable () {
    $('.list-group-item').last().click(
        function () {
            $( this ).toggleClass('list-group-item-success');
            updateStatusBar();
        }
    );
}

function updateForm (el) {
    var items
    var update
    var alert

    alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                Tasks have been deleted!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
    if (el == 'checked') {
        items = '.list-group-item-success';
        update =  $(items).remove();
    } else if (el == 'all') {
        items = '.list-group-item';
        update =  $(items).remove();
        $('#clearAll').prop('disabled', true)
        $(alert).prependTo('body')
    } else if (el == 'mark-all') {
        items = '.list-group-item';
        update = $(items).toggleClass('list-group-item-success');
    }

    update;
    updateStatusBar();
}

function updateStatusBar () {
    var pending = $('.list-group-item').not('.list-group-item-success').length;
    var done = $('.list-group-item-success').length;

    if (pending === 0 && done === 0) {
        $('.progress').hide();
        $('#banner').html('Awesome task app.')
        $('#clearAll').prop('disabled', true)
    } else {
        progress = (done / (pending + done)) * 100
        $('#banner').html("Progress...");
        $('.progress').show();
        $('.progress-bar').attr('aria-valuemax', pending + done);
        $('.progress-bar').attr('aria-valuenow', done);
        $('.progress-bar').css('width',  progress + '%');
        $('.progress-bar').html(Math.round(progress * 10) / 10 + '%')
    }
    if (done === 0) {
        $('#clearComplete').prop('disabled', true)
    } else {
        $('#clearComplete').prop('disabled', false)
    }
}

function getPublicIP () {
    $.getJSON('http://ipinfo.io/json', function (data) {
        $('#geo').append('<li>IP: ' + data.ip + '</li>')
        $('#geo').append('<li>City: ' + data.city + '</li>')
    })
}
