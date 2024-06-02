document.addEventListener('DOMContentLoaded', function () {
    const goodsData=JSON.parse(localStorage.getItem('goods'));
    // Gets all the add/subtract buttons and quantity input fields
    const quantities = document.querySelectorAll('#quantity');
    const subtotal = document.querySelectorAll('.subtotal');//Total amount per item
    const totalMoney = document.querySelectorAll('.total');//
    const cartItem=document.querySelectorAll('.cart-item');
    var totalSum = 108;
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

});
