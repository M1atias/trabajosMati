document.getElementById('programar').addEventListener("click", desaparecer);

function desaparecer(){
    h = parseInt( document.getElementById("horas").value);
    m = parseInt( document.getElementById("minutos").value);
    s = parseInt( document.getElementById("segundos").value);
    document.getElementsByClassName("form")[0].style.animationName = "desaparecer";
    document.getElementsByClassName("form")[0].style.animationDuration = "0.4s";
    document.getElementsByClassName("form")[0].style.animationIterationCount = "1";
    document.getElementsByClassName("form")[0].style.animationFillMode = "fowards";
    setTimeout(function(){document.getElementsByClassName("form")[0].style.display="none";aparecer(h,m,s)},400);
    setInterval(function(){aparecer(h,m,s)},1000);
}

function aparecer(h,m,s){
    tiempo = calculatTiempo(h,m,s);
    horas = tiempo[0];
    minutos = tiempo[1];
    segundos = tiempo[2];
    document.getElementById("h").innerHTML = horas;
    document.getElementById("m").innerHTML = minutos;
    document.getElementById("s").innerHTML = segundos;
    document.getElementsByClassName("alarma")[0].style.display = "block";
    document.getElementsByClassName("alarma")[0].style.animationName = "aparecer";
    document.getElementsByClassName("alarma")[0].style.animationDuration = "0.4s";
    document.getElementsByClassName("alarma")[0].style.animationIterationCount = "1";
}


function calculatTiempo(h,m,s){
    tiempoActual = new Date();
    hs = tiempoActual.getHours();
    ms = tiempoActual.getMinutes();
    ss = tiempoActual.getSeconds();

    total = hs * 3600;
    total += ms * 60;
    total += ss;

    horaAlarma = h * 3600;
    horaAlarma += m * 60;
    horaAlarma += s;

    if (horaAlarma > total){
        diferencia = horaAlarma - total;
    } else if (horaAlarma == total){
        document.getElementById("audio").play();
        setTimeout(function(){alert("¡¡¡¡despertate!!!!")},1000);
    }
    else {
        diferencia = horaAlarma + 3600 * 24 - total;
    }
    horasDif = Math.floor( diferencia / 3600);
    minutosDif = Math.floor((diferencia - horasDif * 3600) / 60);
    segundosDif = Math.floor((diferencia - horasDif * 3600- minutosDif *60));
    
    resultado = horasDif + ":" + minutosDif + ":" + segundosDif;
    return resultado.split(":");
}
