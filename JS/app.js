function newAction () {
    if ( !$('#myInput').val() ) {
        $('#myInput').focus();
    } else {
        // var closeBtn = '<span class="close" onclick="closeBtn(this)">x</span>';
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

function closeBtn (el) {
    var item = el.parentElement;
    item.remove();
    updateStatusBar();
}

function updateForm (el) {
    var items
    var update

    if (el == 'checked') {
        items = '.list-group-item-success';
        update =  $(items).remove();
    } else if (el == 'all') {
        items = '.list-group-item';
        update =  $(items).remove();
        $('#clearAll').prop('disabled', true)
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
    if ($('.list-group-item-success').length === 0) {
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
