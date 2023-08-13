function transparentWindow() {
    const [file] = document.querySelector("input[type=file]").files;
    console.log(file)
    window.open(file.path,"_blank",'transparent=true,frame=false');
    }

function framewindow() {
    const [file] = document.querySelector("input[id=frame]").files;
    console.log(file)
    window.open(file.path,"_blank",'frame=false,titleBarStyle=customButtonsOnHover');
    }