// document.body.childNodes.forEach(node => {
//     document.body.removeChild(node);
// })
// document.body.remove();
setTimeout(() => {
    Array.from(document.body.childNodes).forEach(node => {
        node.remove()
    })
    var div = document.createElement("div")
    document.body.appendChild(div);
    div.innerText = "好好学习, 不看一些不相干的东西."
    div.style = "width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;color:red;font-size:100px;font-weight:bold"
}, 1000);