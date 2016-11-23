var Data = {};
$(function() {
    Data.maxWidth = 400;
    Data.maxHeight = 500;
    Data.zIndex = 100;
    Data.picIndex = 5;
});

function resizeBox(id, percentage) {
    var naturalWidth = document.querySelector('#' + id).naturalWidth;
    var naturalHeight = document.querySelector('#' + id).naturalHeight;

    var targetWidth = naturalWidth * parseInt(percentage) / 100;
    if (targetWidth > Data.maxWidth) {
        targetWidth = Data.maxWidth;
    }
    var targetHeight = naturalHeight * parseInt(percentage) / 100;
    if (targetHeight > Data.maxHeight) {
        targetHeight = Data.maxHeight;
    }

    $('#' + id + '-box').css('width', targetWidth);
    $('#' + id + '-box').css('height', targetHeight);
};

$(function() {
    addOnePicture(true, "./img/miraimon.png");
    addOnePicture(true, "http://up.gc-img.net/post_img_web/2014/11/02773f6205e9ff5698329c26f2fe0b26_10725.png");
    addOnePicture(true, "http://up.gc-img.net/post_img_web/2014/11/b1735a2213f9282578ee029d10196d56_12350.jpeg");
    addOnePicture(true, "http://up.gc-img.net/post_img_web/2014/11/e0d27d44dba2db5aafd2a2f174ae4ec6_9204.jpeg");
    addOnePicture(true, "http://up.gc-img.net/post_img_web/2014/11/217feccf54d645ed88bffc80f44ddb92_3514.png");

    resetView();
});

function resetView() {
    $('#main-galary').masonry({
        itemSelector: '.picture-box',
        columnWidth: 10,
        isFitWidth: true,
        resize: false
    });
    fixView();
};

// function activePicture(id) {
//     console.log(id);
//     var $picBox = $('#' + id);
//     Data.zIndex ++;
//     $picBox.css( "z-index", Data.zIndex );
// };

function fixView() {
    $(".picture-box").draggable({
        containment: "#main-galary"
        // start : function(event , ui) {
        //     activePicture(ui.helper[0].attributes[1].nodeValue);
        // }
    });

    $('#main-galary').css('width', '100%');
    $('#main-galary').css('height', '100%');

};

function addOnePicture(isInit, url) {
    Data.picIndex ++;
    Data.zIndex ++;

    var picBox = document.createElement('div');
    picBox.classList.add('box');
    picBox.classList.add('box-primary');
    picBox.classList.add('picture-box');
    picBox.setAttribute('id', 'picture' + Data.picIndex + '-box');
    picBox.style.zIndex = Data.zIndex;

    var boxHeader = document.createElement('div');
    boxHeader.classList.add('box-header');
    boxHeader.classList.add('picture-box-fixer');

    var picture = document.createElement('img');
    picture.classList.add('img-thumbnail');
    picture.classList.add('resize-picture');
    picture.setAttribute('id', 'picture' + Data.picIndex);
    picture.setAttribute('src', url);
    boxHeader.appendChild(picture);

    var boxTool = document.createElement('div');
    boxTool.classList.add('pull-right');
    boxTool.classList.add('box-tools');

    var close = document.createElement('button');
    close.setAttribute('type', 'button');
    close.classList.add('btn');
    close.classList.add('btn-primary');
    close.classList.add('btn-xs');
    close.setAttribute('data-widget', 'remove');
    close.setAttribute('title', 'Remove');
    boxTool.appendChild(close);

    var closeIcon = document.createElement('i');
    closeIcon.classList.add('fa');
    closeIcon.classList.add('fa-times');
    close.appendChild(closeIcon);

    boxHeader.appendChild(boxTool);

    var Resizer = document.createElement('input');
    Resizer.setAttribute('type', 'button');
    Resizer.classList.add('resizer');
    Resizer.setAttribute('value', 'Resize');
    Resizer.setAttribute('onclick', 'resizeBox("picture' + Data.picIndex + '", 70)');
    boxHeader.appendChild(Resizer);

    picBox.appendChild(boxHeader);

    var galary = document.getElementById('main-galary');
    galary.appendChild(picBox);

    $('#' + 'picture' + Data.picIndex + '-box').hover(function() {
        resetIndex(this);
    });
    if (!isInit) {
        // $('#main-galary').masonry({
        //     itemSelector: '.picture-box',
        //     columnWidth: 200
        // });
        // $('#main-galary').prepend($('#' + 'picture' + Data.picIndex + '-box'));
        // $('#main-galary').masonry('reloadItems');
        // $('#main-galary').masonry('layout');
        $('#main-galary').masonry('appended', $('#' + 'picture' + Data.picIndex + '-box'));
    }
    fixView();

    animateDiv($('#' + 'picture' + Data.picIndex + '-box'));
};

function resetIndex(hoverPic) {
    var elements = document.getElementsByClassName("picture-box");
    Data.zIndex = 100;
    
    // get the list except hovered pic.
    var list = [];
    for (var idx = 0; idx < elements.length; idx ++) {
        if (elements[idx].id != hoverPic.id) {
            list[list.length] = elements[idx];
        }
    }

    // sort the list asc.
    var sorted = [];
    for (var i = list.length - 1; i >= 0; i --) {
        var min = list[i];
        for (var j = list.length - 2; j >= 0; j --) {
            if (min.style.zIndex > list[j].style.zIndex) {
                min = list[j];
            }
        }
        sorted[sorted.length] = min;
        removeElementFromList(list, min);
    }

    // add hovered pic to the last
    sorted[sorted.length] = hoverPic;

    // set zIndex
    for (var idx = 0; idx < sorted.length; idx ++) {
        Data.zIndex ++;
        sorted[idx].style.zIndex = Data.zIndex;
    }
};

function removeElementFromList(list, element) {
    for (var i = 0; i < list.length; i ++) {
        if (list[i].id == element.id) {
            list.splice(i, 1);
            break;
        }
    }
};

function makeNewPosition($container, $target) {
    var h = $container.height() - $target.height();
    var w = $container.width() - $target.width();

    var top = Math.floor(Math.random() * h);
    var left = Math.floor(Math.random() * w);

    return [top, left];

};

// function animateDiv($target) {
//     $target.fadeOut(2000, function() {
//         var maxLeft = $target.parent().width() - $target.width();
//         var maxTop = $target.parent().height() - $target.height();
//         var leftPos = Math.floor(Math.random() * (maxLeft + 1));
//         var topPos = Math.floor(Math.random() * (maxTop + 1));
//         $target.css({ left: leftPos, top: topPos }).fadeIn(1000);

//         animateDiv($target);
//     });
// };

function animateDiv($target) {
    var newp = makeNewPosition($target.parent(), $target);
    var oldp = $target.offset();
    var time = calcTime([oldp.top, oldp.left], newp, $target);

    $target.animate({
        top: newp[0],
        left: newp[1]
    }, time, function() {
        animateDiv($target);
    });
};

function calcTime(oldp, newp, $target) {
        console.log("max:"+($target.parent().width() - $target.width()));
        console.log("oldp:"+oldp[1]);
    if (($target.parent().width() - $target.width()) < oldp[1]) {
        console.log("fast!!!");
        return 100;
    }
    var a = Math.abs(oldp[1] - newp[1]);
    var b = Math.abs(oldp[0] - newp[0]);
    var d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    var speed = 0.1;

    var time = d / speed;

    return time;
};
