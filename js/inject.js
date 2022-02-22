var div = document.createElement("div")
document.body.appendChild(div);
div.innerText = "好好学习, 不看一些不相干的东西."
div.style = "position:fixed;top:0;left:0;bottom:0;right:0;background-color:#ffffff;z-index:9999999;display:flex;align-items:center;justify-content:center;color:red;font-size:100px;font-weight:bold;"


// setTimeout(() => {
//     Array.from(document.body.childNodes).forEach(node => {
//         node.remove()
//     })
//     var div = document.createElement("div")
//     document.body.appendChild(div);
//     div.innerText = "好好学习, 不看一些不相干的东西.1"
//     div.style = "width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;color:red;font-size:100px;font-weight:bold"
// }, 1000);