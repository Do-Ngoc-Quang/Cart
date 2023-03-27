lst = [];
curItem = null;
$(function () {

    var data = [
        {
            "value": "iPhone 14 Pro",
            "label": "iPhone 14 Pro - $999",
            "codeProduct": "iphone01",
            "nameProduct": "iPhone 14 Pro",
            "price": 999,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "iPhone 14",
            "label": "iPhone 14 - $799",
            "codeProduct": "iphone02",
            "nameProduct": "iPhone 14",
            "price": 799,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "iPhone 13",
            "label": "iPhone 13 - $999",
            "codeProduct": "iphone03",
            "nameProduct": "iPhone 13",
            "price": 599,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "MacBook Pro 16”",
            "label": "MacBook Pro 16” - $2499",
            "codeProduct": "mac01",
            "nameProduct": "MacBook Pro 16”",
            "price": 2499,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "MacBook Pro 14”",
            "label": "MacBook Pro 13” - $1999",
            "codeProduct": "mac02",
            "nameProduct": "MacBook Pro 14”",
            "price": 1999,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "MacBook Pro 13”",
            "label": "MacBook Pro 13” - $1299",
            "codeProduct": "mac03",
            "nameProduct": "MacBook Pro 13”",
            "price": 1299,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "iPad Pro",
            "label": "iPad Pro - $799",
            "codeProduct": "ipad01",
            "nameProduct": "iPad Pro",
            "price": 799,
            "unit": "PCS",
            "type": "Ipad"
        },
        {
            "value": "iPad Air",
            "label": "iPad Air - $599",
            "codeProduct": "ipad02",
            "nameProduct": "iPad Pro",
            "price": 599,
            "unit": "PCS",
            "type": "Ipad"
        },
        {
            "value": "iPad",
            "label": "iPad - $449",
            "codeProduct": "ipad03",
            "nameProduct": "iPad Pro",
            "price": 449,
            "unit": "PCS",
            "type": "Ipad"
        }
    ];
    $("#txtProduct").autocomplete({
        source: data,
        select: function (e, ui) {
            curItem = ui.item;
            $("#lblSelect").html("You have chosen <b>[" + ui.item.nameProduct + "]</b> - price: <b>" + formatNumber(ui.item.price) + "</b>");
        }
    });
});

function addProduct() {
    const qty = parseInt($("#inp_quantity").val());
    curItem.Quantity = qty;
    curItem.intomoney = qty * curItem.price;
    console.log(qty);
//hihi test thu cai update on gitDesktop

    var i = 0;
    for (i; i < lst.length; i++) {
        if (lst[i].codeProduct == curItem.codeProduct) {
            break;
        }
    }
    if (i < lst.length) {
        curItem.nowQuantity = curItem.Quantity + lst[i].Quantity;
        console.log(qty);
        console.log(lst[i].Quantity);
        console.log(curItem.nowQuantity);
        curItem.intomoney = curItem.nowQuantity * curItem.price;
    } else {
        lst.push(curItem);
    }
    console.log(lst[i].Quantity);
    totalMoney();
}
function addPromo() {
    var proPercent = $("#promoPercent").val();
    curItem.ProPercent = proPercent;
    console.log(curItem.ProPercent);

    totalMoney();
}
function DeleteProduct(codeID) {
    var i = 0;
    for (i; i < lst.length; i++) {
        if (lst[i].codeProduct == codeID) {
            break;
        }
    }
    if (i < lst.length) {
        lst.splice(i, 1);
    }
    totalMoney();

}

function totalMoney() {
    total = 0;
    for (i = 0; i < lst.length; i++) {
        total += lst[i].intomoney;
    }
    total -= (total * curItem.ProPercent / 100);




    $("#totalMoney").html(formatNumber(total));
    $("#totalProduct").text(lst.length);
    $("#ulCart").html("");
    $("#cartTemplate").tmpl(lst).appendTo("#ulCart");
}

function formatNumber(n) {
    return "$" + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}