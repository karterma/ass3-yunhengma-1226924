document.addEventListener('DOMContentLoaded', function () {
    const goodsData=JSON.parse(localStorage.getItem('goods'));
    // Gets all the add/subtract buttons and quantity input fields
    const minusBtns = document.querySelectorAll('.decrease');
    const plusBtns = document.querySelectorAll('.increase');
    const quantities = document.querySelectorAll('#quantity');
    const subtotal = document.querySelectorAll('.subtotal');//Total amount per item
    const totalMoney = document.querySelectorAll('#totalMoney');//   
    const removeBtns = document.querySelectorAll('.cart-remove');
    const cartItem=document.querySelectorAll('.cart-item');
    var totalSum = 98;
    for(let i=0;i<goodsData.length;i++){
        if(!goodsData[i].isShow){
            cartItem[i].style.display = 'none';
            totalSum=totalSum-(i==0?59:39);
        }else{
            totalSum=totalSum+(i==0?59:39)*(goodsData[i].num-1);
        }
        quantities[i].innerHTML=goodsData[i].num;
        subtotal[i].innerHTML = '$' + (goodsData[i].num * (i==0?59:39)).toFixed(2).toString();
    }
    totalMoney[0].innerText = '$' + totalSum.toFixed(2).toString();   
    // var totalnum=2;

    // Minus button click event
    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let input = quantities[index];
            let value = parseInt(input.innerHTML);
            if (value > 1) {
                input.innerHTML = parseInt(input.innerHTML) - 1;
                if (index == 0) {
                    totalSum -= 59;
                    subtotal[index].innerHTML = '$' + (parseInt(input.innerHTML) * 59).toFixed(2).toString();
                }
                else {
                    totalSum -= 39;
                    subtotal[index].innerHTML = '$' + (parseInt(input.innerHTML) * 39).toFixed(2).toString();
                }
                goodsData[index].num -= 1;
                localStorage.setItem('goods', JSON.stringify(goodsData));    
            }
            totalMoney[0].innerText = '$' + totalSum.toFixed(2).toString();
           
        });
    });

    // Plus button click event
    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let input = quantities[index];
            let value = parseInt(input.innerHTML);
            input.innerHTML = value + 1;
            if (index == 0) {
                totalSum += 59;
                subtotal[index].innerHTML = '$' + (parseInt(input.innerHTML) * 59).toFixed(2).toString();
            }
            else {
                totalSum += 39;
                subtotal[index].innerHTML = '$' + (parseInt(input.innerHTML) * 39).toFixed(2).toString();
            }
            goodsData[index].num += 1;
            localStorage.setItem('goods', JSON.stringify(goodsData));
            totalMoney[0].innerText = '$' + totalSum.toFixed(2).toString();
        });
    });
    // Remove button click events
    removeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            cartItem[index].style.display = 'none';
            let input = quantities[index];
            let num = parseInt(input.innerHTML);
            if (index == 0) totalSum -= 59 * num
            else totalSum -= 39 * num
            totalMoney[0].innerText = '$' + totalSum.toFixed(2).toString();
            goodsData[index].isShow=false;
            localStorage.setItem('goods', JSON.stringify(goodsData));
        });
    });
    
});
