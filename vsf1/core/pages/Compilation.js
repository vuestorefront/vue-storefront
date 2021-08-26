module.exports = `<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Compiling</title>
  <meta http-equiv="refresh" content="10">
  <style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial;
    flex-direction: column;
  }
  </style>
</head>
<body>
<div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ball"><div></div></div><style type="text/css">@keyframes lds-ball {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.45, 0, 0.9, 0.55);
  }
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  50% {
    -webkit-transform: translate(0, 108px);
    transform: translate(0, 108px);
    animation-timing-function: cubic-bezier(0, 0.45, 0.55, 0.9);
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
@-webkit-keyframes lds-ball {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.45, 0, 0.9, 0.55);
  }
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  50% {
    -webkit-transform: translate(0, 108px);
    transform: translate(0, 108px);
    animation-timing-function: cubic-bezier(0, 0.45, 0.55, 0.9);
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
.lds-ball {
  position: relative;
}
.lds-ball div {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00db6e;
  left: 80px;
  top: 20px;
  -webkit-animation: lds-ball 1s linear infinite;
  animation: lds-ball 1s linear infinite;
}
.lds-ball {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
</style></div>
  <div>Waiting for compilation...</div>
</body>
</html>`
