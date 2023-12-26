var socket = io();

function scroll2bottom(){
    $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight")}, 1000);
}
$(document).ready(()=>{
    scroll2bottom();
    $('#textAreaExample').keydown((event)=>{
        if(event.which == 13){
            event.preventDefault();
            socket.emit('msg', $('#textAreaExample').val());
            $("#chatbox").append(`
            <div class="d-flex flex-row justify-content-end mb-4">
              <div class="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
                <p class="small mb-0">`+ $('#textAreaExample').val() + `</p>
              </div>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                alt="avatar 1" style="width: 45px; height: 100%;">
            </div>`);
            $('#textAreaExample').val("");
            scroll2bottom();
        }
    });
    socket.on('reply', (data)=>{
        $("#chatbox").append(`<div class="d-flex flex-row justify-content-start mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1" style="width: 45px; height: 100%;">
        <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
          <p class="small mb-0">` + data + `</p>
        </div>
      </div>`);
      scroll2bottom();
    });
    socket.on('replyImg', url=>{
        $('#chatbox').append(`<div class="d-flex flex-row justify-content-start mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1" style="width: 45px; height: 100%;">
        <div class="ms-3" style="border-radius: 15px;">
          <div class="bg-image">
            <img src="`+ url +`"
              style="border-radius: 15px;" alt="video">
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
        </div>
      </div>`);
      scroll2bottom();
    })
});