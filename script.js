$(() => {

    const boxes = [];
    
    var visible = true;

    $('#exibir').click(() => {
        visible = true;
    });

    $('#esconder').click(() => {
        visible = false;
    });

    $('#adicionar').click(() => {
        const value = $('#adicionar-quantidade').val();
        addBox(!!value ? (value > 100 ? 100 : (value < 1 ? 1 : value)) : 1);
    });

    $('#adicionar-quantidade').on('focus', () => {
        $('#adicionar-quantidade').width(100);
        $('#adicionar-quantidade').css('transition', '.5s');
    });

    $('#adicionar-quantidade').on('focusout', () => {
        const element = $('#adicionar-quantidade');
        const value = element.val(); 
        if((!(!!value)) || (value < 1)) {
            element.val(1);
        } else if(value > 100) {
            element.val(100);
        }
        element.width(45);
        element.css('transition', '.5s');
    });

    $('#remover').click(() => {
        removeBox(boxes.length - 1);
    });

    $('#limpar').click(() => {
        clearBoxes();
    });
    
    $('main .buttons-container button').click(() => {
        playAudioClick('mixkit-select-click-1109');
        renderBoxes();
    });

    function addBox(total) {
        for(let i = 0; i < total; ++i) {
            boxes.push(`Box ${boxes.length + 1}`);
        }
    }
    
    function removeBox(index) {
        boxes.splice(index, 1);
    }
    
    function clearBoxes() {
        boxes.splice(0, boxes.length);
    }
    
    function renderBoxes() {
        $('main .boxes-container').empty();
        if(visible) {
            for(const box of boxes) {
                $('main .boxes-container').append(`<div class="box"><p>${box}</p></div>`);
            }
            $('main .boxes-container .box').click(() => {
                playAudioClick('mixkit-click-error-1110');
            });
        }
        $('#total').text(`Total: ${boxes.length}`);
        $('#status').text(`Status: ${visible ? 'exibindo' : 'escondendo'}`);
    }
    
    function playAudioClick(audioName) {
        const audio = new Audio(`/${audioName}.wav`);
        audio.volume = 0.1;
        audio.play();
    }

});