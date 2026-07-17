/* ==========================================================
   PROJECT FANNY
   JARVINA EXPERIENCE 5.0
========================================================== */

const bootScreen=document.getElementById("boot-screen");

const scanner=document.getElementById("scanner");

const progressBar=document.getElementById("progressBar");
const progressText=document.getElementById("progressText");

const authorized=document.getElementById("authorized");
const authorizedName=document.getElementById("authorizedName");

const consoleBox=document.getElementById("consoleContent");
const status=document.getElementById("status");

const scene=document.getElementById("scene");
const sceneImage=document.getElementById("sceneImage");
const sceneTitle=document.getElementById("sceneTitle");
const sceneText=document.getElementById("sceneText");
const sceneBtn=document.getElementById("sceneBtn");

/* ==========================================================
   AUDIO
========================================================== */

const startupSound=document.getElementById("startupSound");
const transitionSound=document.getElementById("transitionSound");
const clickSound=document.getElementById("clickSound");

/* ==========================================================
   BOOT LINES
========================================================== */

const bootLines=[

"Inicializando núcleo Stark...",
"Cargando inteligencia Jarvina...",
"Activando protocolo emocional...",
"Sincronizando recuerdos...",
"Verificando destinataria...",
"Conectando corazón...",
"Acceso concedido."

];

/* ==========================================================
   SCENES
========================================================== */

const scenes=[

{

title:"Hola, Fanny ❤️",

image:null,

messages:[

"Hay miles de sitios web.",

"Pero este...",

"solo fue creado para una persona.",

"Y esa persona eres tú."

]

},

{

title:"",

image:null,

messages:[

"Hay regalos que se compran.",

"Y otros...",

"que se construyen con tiempo.",

"Con dedicación.",

"Y con mucho cariño."

]

},

{

title:"",

image:"assets/images/fanny.jpg",

messages:[

"Hay personas que llegan...",

"y cambian la historia.",

"Tú eres una de ellas."

]

},

{

title:"",

image:"assets/images/familia.jpg",

messages:[

"Lo más hermoso de ti...",

"es el inmenso amor",

"que entregas cada día.",

"Eres una madre maravillosa."

]

},

{

title:"Nosotros",

image:"assets/images/nosotros.jpg",

messages:[

"Y entonces...",

"aparecí yo.",

"Gracias por dejarme",

"caminar contigo."

]

}

];

let currentScene=0;

/* ==========================================================
   UTILIDADES
========================================================== */

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function typeText(element,text,speed=35){

    element.innerHTML="";

    for(const char of text){

        element.innerHTML+=char;

        await sleep(speed);

    }

}
/* ==========================================================
   BOOT SEQUENCE
========================================================== */

async function bootSequence(){

    try{

        try{

    startupSound.currentTime=0;

    startupSound.volume=0.7;

    await startupSound.play();

}catch(e){

    console.log("Audio bloqueado por el navegador.");

}

    }catch(e){}

    scanner.style.opacity=1;

    await sleep(700);

    for(let i=0;i<=100;i++){

        progressBar.style.width=i+"%";

        progressText.innerHTML=i+"%";

        await sleep(28);

    }

    await sleep(600);

    scanner.style.opacity=0;

    await sleep(500);

    authorized.style.opacity=1;

    authorized.style.animation="accessFlash .8s forwards";

    await sleep(700);

    authorizedName.style.opacity=1;

    authorizedName.style.animation="accessFlash .8s forwards";

    await sleep(1500);

    for(const line of bootLines){

        const div=document.createElement("div");

        div.className="console-line";

        consoleBox.appendChild(div);

        await typeText(div,line,18);

        div.classList.add("show");

        await sleep(350);

    }

    status.innerHTML="Sistema listo.";

    await sleep(1200);

    bootScreen.style.opacity=0;

    await sleep(900);

    bootScreen.style.display="none";

    playScene(currentScene);

}
/* ==========================================================
   SCENES
========================================================== */

async function playScene(index){

    scene.classList.add("show");

    sceneBtn.style.display="none";

    sceneTitle.innerHTML=scenes[index].title;

    sceneText.innerHTML="";

    if(scenes[index].image){

        sceneImage.src=scenes[index].image;

        sceneImage.style.display="block";

        try{

            transitionSound.currentTime=0;
            transitionSound.play();

        }catch(e){}

    }else{

        sceneImage.style.display="none";

    }

    await sleep(600);

    for(const message of scenes[index].messages){

        await typeText(sceneText,message,35);

        await sleep(1800);

    }

    sceneBtn.style.display="inline-block";

}

sceneBtn.addEventListener("click",async()=>{

    try{

        clickSound.currentTime=0;
        clickSound.play();

    }catch(e){}

    sceneBtn.style.display="none";

    currentScene++;

    if(currentScene>=scenes.length){

        await showEnding();

        return;

    }

    await playScene(currentScene);

});

/* ==========================================================
   ENDING
========================================================== */

async function showEnding(){

    sceneImage.style.display="none";

    sceneTitle.innerHTML="❤️";

    sceneText.innerHTML="";

    await typeText(

        sceneText,

        "Gracias por recorrer este pequeño universo.\n\nFue creado con cariño.\nCon admiración.\nY con un pedacito de mi corazón.\n\nTe quiero mucho, Fanny. Te Quiero 3 Millones",

        35

    );

    sceneBtn.style.display="none";

}

/* ==========================================================
   PARTICLES
========================================================== */

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

let particles=[];

function resizeCanvas(){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

}

function createParticles(){

    particles=[];

    const total=100;

    for(let i=0;i<total;i++){

        particles.push({

            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,

            vx:(Math.random()-.5)*0.45,
            vy:(Math.random()-.5)*0.45,

            r:1+Math.random()*2

        });

    }

}

function animateParticles(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const p of particles){

        p.x+=p.vx;
        p.y+=p.vy;

        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;

        ctx.beginPath();

        ctx.arc(

            p.x,
            p.y,
            p.r,
            0,
            Math.PI*2

        );

        ctx.fillStyle="rgba(94,220,255,.9)";
        ctx.fill();

    }

    for(let i=0;i<particles.length;i++){

        for(let j=i+1;j<particles.length;j++){

            const dx=particles[i].x-particles[j].x;
            const dy=particles[i].y-particles[j].y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<130){

                ctx.beginPath();

                ctx.moveTo(

                    particles[i].x,
                    particles[i].y

                );

                ctx.lineTo(

                    particles[j].x,
                    particles[j].y

                );

                ctx.strokeStyle=
                "rgba(94,220,255,"+
                (1-dist/130)*0.22+
                ")";

                ctx.stroke();

            }

        }

    }

    requestAnimationFrame(

        animateParticles

    );

}

/* ==========================================================
   START
========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        resizeCanvas();
        createParticles();

    }

);

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        resizeCanvas();

        createParticles();

        animateParticles();

        bootSequence();

    }

);
   
