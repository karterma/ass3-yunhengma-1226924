document.addEventListener('DOMContentLoaded', function () {
    // Store product information in the cache
    var goodsData = JSON.parse(localStorage.getItem('goods'));
    if (goodsData == undefined || goodsData == null) {
        var gData = [{ 'goodsname': 'Cyberpunk 2077', 'isShow': true, 'goodsid': 1, 'num': 1 }, { 'goodsname': 'The Last of US II', 'isShow': true, 'goodsid': 0, 'num': 1 }];
        localStorage.setItem('goods', JSON.stringify(gData));
        goodsData = JSON.parse(localStorage.getItem('goods'));
    }


    // Click on the image to toggle the detail image
    var thumbnails = document.querySelectorAll('.thumbnail');
    var fullImage = document.getElementById('full-image');

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener('click', function () {
            fullImage.src = this.getAttribute('data-full');
        });
    });

    //Open and close the shopping cart
    const cartPopup = document.getElementById('cartPopup');
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');

    openCartBtn.addEventListener('click', function () {
        cartPopup.style.display = 'block';
    });

    closeCartBtn.addEventListener('click', function () {
        cartPopup.style.display = 'none';
    });

    //Shopping cart modify quantity, remove
    // Gets all the add/subtract buttons and quantity input fields
    const minusBtns = document.querySelectorAll('.decrease');
    const plusBtns = document.querySelectorAll('.increase');
    const quantities = document.querySelectorAll('#quantity');
    const totalMoeny = document.querySelectorAll('.subtotal');//
    const totalNums = document.querySelectorAll('.items-num');//   
    const removeBtns = document.querySelectorAll('.remove');
    const cartItem = document.querySelectorAll('.cart-item');
    var totalSum = 98;
    var totalnum = 2;
    console.log(goodsData);
    for (let i = 0; i < goodsData.length; i++) {
        if (!goodsData[i].isShow) {
            cartItem[i].style.display = 'none';
            totalSum = totalSum - (i == 0 ? 59 : 39);
            totalNums[0].innerHTML = (totalnum - 1).toString() + ' Item';
        } else {
            totalSum = totalSum + (i == 0 ? 59 : 39) * (goodsData[i].num - 1);
        }
        quantities[i].value = goodsData[i].num;
    }
    totalMoeny[0].innerHTML = '$' + totalSum.toFixed(2).toString();

    // Minus button click event
    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let input = quantities[index];
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
                if (index == 0) totalSum -= 59
                else totalSum -= 39
                totalMoeny[0].innerHTML = '$' + totalSum.toFixed(2).toString();
                totalMoeny[0].innerText = '$' + totalSum.toFixed(2).toString();
                goodsData[index].num -= 1;
                localStorage.setItem('goods', JSON.stringify(goodsData));
            }

        });
    });

    // Plus button click event
    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let input = quantities[index];
            input.value = parseInt(input.value) + 1;
            if (index == 0) totalSum += 59
            else totalSum += 39
            totalMoeny[0].innerHTML = '$' + totalSum.toFixed(2).toString();
            totalMoeny[0].innerText = '$' + totalSum.toFixed(2).toString();
            goodsData[index].num += 1;
            localStorage.setItem('goods', JSON.stringify(goodsData));
        });
    });
    // Remove button click events
    removeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            cartItem[index].style.display = 'none';
            let input = quantities[index];
            let num = input.value;
            totalnum -= 1;
            if (index == 0) totalSum -= 59 * num
            else totalSum -= 39 * num
            totalMoeny[0].innerHTML = '$' + totalSum.toFixed(2).toString();
            totalMoeny[0].innerText = '$' + totalSum.toFixed(2).toString();
            totalNums[0].innerHTML = totalnum.toString() + ' Item';
            goodsData[index].isShow = false;
            localStorage.setItem('goods', JSON.stringify(goodsData));
        });
    });
});

function GotoDetail(value) {
    sessionStorage.setItem('goodsid', value);
    if (value == 0)
        window.location.href = 'GoodsDetail.html'
    else
        window.location.href = 'GoodsDetail2.html'
}
function checkRelease(all,sub) {
    var allcheck = document.getElementById(all);  //Gets the id of the all-selected check
    var othercheck = document.querySelectorAll(sub); //Gets the checkbox whose array name is fkcheck
    for (var i = 0; i < othercheck.length; i++) {
        if (allcheck.checked) {
            othercheck[i].checked = true;
        } else {
            othercheck[i].checked = false;
        }
    }
}