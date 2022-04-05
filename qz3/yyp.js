document.addEventListener('keydown',logkey,false);
        function logkey(e)
        {
            var temp='';
            console.log(e.key);
            if((e.keyCode>=65 && e.keyCode<=90)||(e.keyCode>=96 && e.keyCode<=105))
            {
                document.getElementById("Typing").innerHTML += e.key;
            }
        }